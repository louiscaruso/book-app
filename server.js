'use strict';

// Bring in dependencies
const express = require('express');
const superagent = require('superagent');
// const pg = require('pg');



// Environment Variables 
require('dotenv').config();


// Setting up application
const app = express();

// Declare port for server
const PORT = process.env.PORT || 3000;
// Use CORS (cross origin resource sharing)


// Creating postgres client 


// Route 
app.get('/', (req, res) => {
  res.send('Hello !');

})

app.listen(PORT, () => {
  console.log(`App Listening on port: ${PORT}`);
})