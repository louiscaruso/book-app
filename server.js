'use strict';

// Environment Variables 
// Dot
require('dotenv').config();

// Bring in dependencies
const express = require('express');
const app = express();
require('ejs');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const { response } = require('express');
// console.log('error');
// const pg = require('pg');


// Setting up application
const app = express();
app.use(cors());
app.set('view engine', 'ejs');
app.post('/searches');
app.use(express.urlencoded({ extended: true }));

// Declare port for server
const PORT = process.env.PORT || 3000;
// Use CORS (cross origin resource sharing)

app.use(express.static('./public'));
// Creating postgres client
const client = new pg.Client(process.env.DATABASE_URL);



// Route
app.get('/', (req, res) => {
  res.send('Hello !');
});

app.post('/searches', (req, res) => {
  console.log(req.body);

  let URL = `https://www.googleapis.com/books/v1/volumes?q=in${req.body.searchType}:${req.body.searchQuery}&maxResults=10`;
  console.log('URL', URL)
  superagent.get(URL)
    .then(data => {
      console.log(data.body.items[2]);
      const book = data.body.items;
      const finalBookArray = finalBookArray.map(books => new Book(book.volumeInfo));
      response.render('pages/searches/show', { renderContent: finalBookArray });
      return new Book(books);
    })
}

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
  book.splice(1, 5, 's');
  console.log('url', URL);

}






// Handlers 








app.listen(PORT, () => {
  console.log(`App Listening on port: ${PORT}`);
});
// update