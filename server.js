'use strict';

// Bring in dependencies
const express = require('express');
const superagent = require('superagent');
// console.log('error');
// const pg = require('pg');


// Environment Variables 
require('dotenv').config();



// Setting up application
const app = express();
app.set('view engine', 'ejs');

// Declare port for server
const PORT = process.env.PORT || 3000;
// Use CORS (cross origin resource sharing)
const cors = require('cors');

// Creating postgres client 


// Route 
app.get('/', (req, res) => {
  res.send('Hello !');
})

app.get('/searches/new',(req, res) => {
  
  res.render('pages/searches/new');
})

app.listen(PORT, () => {
  console.log(`App Listening on port: ${PORT}`);
})
// update