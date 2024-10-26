const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require("mongodb"); // Import MongoClient

const app = express();
const PORT = process.env.PORT || 3000;

// Replace the uri string with your connection string.
const uri = "mongodb+srv://KMdotcom:NewHacks2024@newhacks-2024.lunjr.mongodb.net/?retryWrites=true&w=majority&appName=NewHacks-2024";

// Create a new MongoClient without deprecated options
const client = new MongoClient(uri);

// Setting up middleware
app.use(cors());
app.use(bodyParser.json()); // Make sure to call the method to parse JSON

// Connect to MongoDB
async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

// Call the connection function
connectToDatabase();

// Router setup
app.get('/', (req, res) => {
    res.send('DisasterAidNow.io backend is set up and running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Optional: Close the MongoDB connection on server close
process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit(0);
});
