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
    db = client.db('pitchSafeDB'); // Database name
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
    res.send('Welcome to the PitchSafe Backend!');
});

// Get All Fatigue/Injury Reports
app.get('/api/reports', async (req, res) => {
    try {
        const reports = await db.collection('reports').find().toArray();
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
});

// Mark a Report as Reviewed
app.patch('/api/reports/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.collection('reports').updateOne(
            { _id: new ObjectId(id) },
            { $set: { reviewed: true } }
        );

        if (result.modifiedCount === 1) {
            console.log(`Report ${id} marked as reviewed`);
            res.json({ message: 'Report marked as reviewed' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error marking report as reviewed', error });
    }
});

// Delete All Reviewed Reports
app.delete('/api/reports/reviewed', async (req, res) => {
    try {
        const result = await db.collection('reports').deleteMany({ reviewed: true });
        console.log(`${result.deletedCount} reviewed reports deleted.`);
        res.json({ message: 'Reviewed reports deleted', deletedCount: result.deletedCount });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting reviewed reports', error });
    }
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    connectToMongoDB(); // Connect to MongoDB when the server starts
});
