// SETTING UP THE EXPRESS SERVER
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Setting up middleware here
app.use(cors());
app.use(bodyParser.json());

//router setup
app.get('/', (req, res) => {
    res.send('PitchSafe backend is setup and running');
});

//start the server
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
}); //http://localhost:3000/

// INTEGRATION WITH REDIS to publish and subscribe to real-time updates

const redis = require('redis');

// Create a Redis client
const redisClient = redis.createClient({
  socket: {
    host: '127.0.0.1', // Redis is running on localhost
    port: 6380,         // Default Redis port
  }
});

// Connect to Redis
redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch((err) => console.error('Redis connection error:', err));

// Error Handling
redisClient.on('error', (err) => {
  console.error('Redis client error:', err);
});
const subscriber = redisClient.duplicate();
subscriber.subscribe('requestUpdates');

subscriber.on('message',(channel, message) => {
    console.log(`Channel: ${channel}, Message: ${message}`); // with these 2 we set up a redis subscriber for real-time updates
}); //This event listener is triggered every time a message is published on the requestUpdates channel. It logs the channel name and the message content to the console.

// API ROUTES for pitcher fatigue/injury reports
let reports = [];

// Get all reports
app.get('/api/reports', (req, res) => {
    res.json(reports);
});

// Create a new report
app.post('/api/reports/:id', (req, res) => {
    const newReport = { id: Date.now(), ...req.body, status: 'Pending'};
    reports.push(newReport);
    redisClient.publish('reportUpdates', JSON.stringify(newReport));
    res.status(201).json(newReport);
});

// Update report status
app.put('/api/reports/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const report = reports.find((r) => r.id === parseInt(id));
    if (report) {
        report.status = status;
        redisClient.publish('reportUpdates', JSON.stringify(report));
        res.json(report);
    } else {
        res.status(404).json({ message: 'Report not found'});
    }
});

// Delete a report
app.delete('/api/reports/:id', (req, res) => {
    const { id } = req.params;
    reports = reports.filter((r) => r.id !== parseInt(id));
    redisClient.publish('reportUpdates', JSON.stringify({ id, status: 'Deleted'}));
    res.json({ message: `Report ${id} deleted` });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
  
