'use strict';

import http from 'http';
import mongoose from 'mongoose';

import api from './src/api.js';
import { mongoURI, port } from './src/config.js';

// Set the port to the API.
api.set('port', port);

// Create a http server based on Express
const server = http.createServer(api);

//Connect to the MongoDB database; then start the server
mongoose
  .connect(mongoURI)
  .then(() => server.listen(port))
  .catch((err) => {
    console.log('Error connecting to the database', err.message);
    process.exit(err.statusCode);
  });

server.on('listening', () => {
  console.log(`API is running on port ${port}`);
});

server.on('error', (err) => {
  console.log('Error in the server', err.message);
  process.exit(err.statusCode);
});
