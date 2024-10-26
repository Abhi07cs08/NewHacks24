// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb'); // MongoDB client
const redis = require('redis'); // Redis client
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB setup
const uri = process.env.MONGODB_URI || 
    "mongodb+srv://KMdotcom:NewHacks2024@newhacks-2024.lunjr.mongodb.net/?retryWrites=true&w=majority&appName=NewHacks-2024";
const client = new MongoClient(uri);
let db;

// Redis setup
const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1', // Redis host
    port: 6380 // Default Redics port
  }
});

// Middleware setup
app.use(cors());
app.use(bodyParser.json()); // Parse incoming JSON requests

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db('disasterAidDB'); // Use 'disasterAidDB' database
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Connect to Redis
redisClient.connect()
    .then(() => console.log('Connected to Redis'))
    .catch((err) => console.error('Redis connection error:', err));

// Error handling for Redis
redisClient.on('error', (err) => {
    console.error('Redis client error:', err);
});

// Redis subscriber for real-time updates
const subscriber = redisClient.duplicate();
subscriber.subscribe('requestUpdates');
subscriber.on('message', (channel, message) => {
    console.log(`Channel: ${channel}, Message: ${message}`);
});

// API routes

// Get all requests from MongoDB
app.get('/api/requests', async (req, res) => {
    try {
        const requests = await db.collection('requests').find().toArray();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
});

// Create a new request
app.post('/api/requests', async (req, res) => {
    const newRequest = { id: Date.now(), ...req.body, status: 'Pending' };
    try {
        await db.collection('requests').insertOne(newRequest);
        redisClient.publish('requestUpdates', JSON.stringify(newRequest));
        res.status(201).json(newRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error creating request', error });
    }
});

// Update request status
app.put('/api/requests/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedRequest = await db.collection('requests').findOneAndUpdate(
            { id: parseInt(id) },
            { $set: { status: status } },
            { returnOriginal: false }
        );
        redisClient.publish('requestUpdates', JSON.stringify(updatedRequest.value));
        res.json(updatedRequest.value);
    } catch (error) {
        res.status(500).json({ message: 'Error updating request', error });
    }
});

// Delete a request
app.delete('/api/requests/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.collection('requests').deleteOne({ id: parseInt(id) });
        redisClient.publish('requestUpdates', JSON.stringify({ id, status: 'Deleted' }));
        res.json({ message: `Request ${id} deleted` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting request', error });
    }
});

// Basic route for testing
app.get('/', (req, res) => {
    res.send('DisasterAidNow.io backend is set up and running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Connect to MongoDB on startup
connectToMongoDB();

// Close MongoDB connection on server shutdown
process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});
