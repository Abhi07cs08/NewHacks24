const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb'); // MongoDB client
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Setup
const uri = process.env.MONGODB_URI || 
    "mongodb+srv://KMdotcom:NewHacks2024@newhacks-2024.lunjr.mongodb.net/?retryWrites=true&w=majority&appName=NewHacks-2024";

const client = new MongoClient(uri);
let db; // Variable to store the database connection

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        db = client.db('disasterAidDB'); // Database name
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the Disaster Aid Backend!');
});

// Get All Requests
app.get('/api/requests', async (req, res) => {
    try {
        const requests = await db.collection('requests').find().toArray();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
});

// Mark a Request as Completed
app.patch('/api/requests/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.collection('requests').updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: true } }
        );

        if (result.modifiedCount === 1) {
            console.log(`Request ${id} marked as completed`);
            res.json({ message: 'Request marked as completed' });
        } else {
            res.status(404).json({ message: 'Request not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error marking request as completed', error });
    }
});

// Delete All Completed Requests
app.delete('/api/requests/completed', async (req, res) => {
    try {
        const result = await db.collection('requests').deleteMany({ completed: true });
        console.log(`${result.deletedCount} completed requests deleted.`);
        res.json({ message: 'Completed requests deleted', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting completed requests', error });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectToMongoDB(); // Connect to MongoDB when the server starts
});
