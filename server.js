const express = require('express');

const HubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json()); // Converts data to json... This is middleware...
server.use('/api/hub', HubsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = server;