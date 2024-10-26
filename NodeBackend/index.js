const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

//Setting up middleware here
app.use(cors());
app.use(bodyParser);

//router setup
app.get('/', (req, res) => {
    res.send('DisasterAidNow.io backend is setup and is running');
});

//start the server
app.listen(PORT, () => {
    console.log('server is running on http://localhost:${PORT}');
});
