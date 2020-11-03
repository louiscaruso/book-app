'use strict';

// Bring in dependencies
const express = require('express');
const superagent = require('superagent');
const cors = require('cors');
// console.log('error');
// const pg = require('pg');


// Environment Variables 

require('dotenv').config();



// Setting up application
const app = express();
app.use(cors());
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

// Declare port for server
const PORT = process.env.PORT || 3000;
// Use CORS (cross origin resource sharing)

app.use(express.static('./public'));
// Creating postgres client




// Route
app.get('/', (req, res) => {
  res.send('Hello !');
})

app.post('/searches', (req, res) => {
  console.log(req.body);

  let URL = `https://www.googleapis.com/books/v1/volumes?q=in${req.body.searchType}:${req.body.searchQuery}&maxResults=10`;
  superagent.get(URL);
  console.log('URL', URL)
    .then(data => {


    });
});

app.get('/searches/new', (req, res) => {

  res.render('pages/searches/new');
});


//Book Construtor

function Book(book) {
  this.title = book.title ? book.title : 'no title found';
  this.description = book.description ? book.description : 'no description found';
  this.authors = book.authors ? book.authors[0] : 'no author found';
  this.isbn = book.industryIdentifiers;
  //splice method
  book.splice(1,5,'s');
  console.log('url', URL);

}






// Handlers 
//const book = results.body.items.map();






app.listen(PORT, () => {
  console.log(`App Listening on port: ${PORT}`);
});
// update