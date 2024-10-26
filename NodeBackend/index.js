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
    res.send('DisasterAidNow.io backend is setup and is running');
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

//creating API ROUTES so that frontend can create update delete and view requests 
let requests = [];

//get all requestios
app.get('/api/requests', (req, res) => {
    res.json(requests);
});

//create a new requests
app.post('/api/requests/:id', (req, res) => {
    const newRequest = { id: Date.now(), ...req.body, status: 'Pending'};
    requests.push(newRequest);
    redisClient.publish('requestUpdates', JSON.stringify(newRequest));
    res.status(201).json(newRequest);
});

//update request status
app.put('/api/requests/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const request = requests.find((r) => r.id === parseInt(id));
    if (request) {
        request.status = status;
        redisClient.publish('requestUpdates', JSON.stringify(request));
        res.json(request);
    } else {
        res.status(404).json({ message: 'Request not found'});
    }
});

//function call to delete a request
app.delete('/api/requests/:id', (req, res) => {
    const { id } = req.params;
    requests = requests.filter((r) => r.id !== parseInt(id));
    redisClient.publish('requestUpdates', JSON.stringify({ id, status: 'Deleted'}));
    res.json({ message: `Request ${id} deleted` });
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
  
