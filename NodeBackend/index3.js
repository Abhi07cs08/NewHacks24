const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
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

// Middleware setup
app.use(cors());
app.use(express.json()); // To parse incoming JSON requests

// Route to get all requests from MongoDB
app.get('/api/requests', async (req, res) => {
    try {
        const requests = await db.collection('requests').find().toArray();
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching requests', error });
    }
});

// Route to mark a request as completed
app.patch('/api/requests/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.collection('requests').updateOne(
            { _id: new ObjectId(id) },
            { $set: { completed: true } }
        );
        res.json({ message: 'Request marked as completed', result });
    } catch (error) {
        res.status(500).json({ message: 'Error updating request status', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectToMongoDB(); // Connect to MongoDB when the server starts
});
