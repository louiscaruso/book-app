'use strict';

// Environment Variables
// Dotenav
require('dotenv').config();

// Bring in dependencies
const express = require('express');
const app = express();
require('ejs');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const cors = require('cors');
const { response } = require('express');

// console.log('error');
//const pg = require('pg');


// Setting up application
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



// Declare port for server
const PORT = process.env.PORT || 3000;


// Creating postgres client
const client = new pg.Client(process.env.DATABASE_URL);

// Route

app.get('/', renderHome);
app.get('/searchform', renderSearchForm);
app.post('/ searches', collectFormInformation);
app.post('/books', addBookToDatabase);
app.get('/books/:book_id', getOneBook);
app.delete('/update/:book_id', deleteBook);
app.get('*', handleError);


function renderHome(req, res) {
  console.log('render home')
  const sql = 'SELECT * FROM booktable;';
  return client.query(sql)
    .then(results => {
      console.log(results.rows);
      res.status(200).render('pages/index', { renderedContent: allbook });
    })
    .catch((error) => {
      console.log(error);
      res.render('pages/error');
    });
}


// function updateOneBook(req, res) {
//   const id = req.params.book_id;
//   const { authors, title, isbn, image, description } = req.body;
//   let sql = 'UPDATE booktable SET author=$1, title=$2, isbn=$3, image_url=$4,
// description=$5 WHERE id=$6;';
//   let safeValues = [authors, title, isbn, image, description, id];
//   client.query(sql, safeValues);
//   response.status(200).redirect(`/books/${id}`);

// }

function deleteBook(request, response) {
  const id = request.params.book - id;
  let sql = 'DELETE FROM booktable WHERE id=$1;';
  let safeValues = [id];
  client.query(sql, safeValues);
  response.status(200).redirect('/');
}

function getOneBook(req, res) {
  const id = req.params.book_id;
  console.log('in the one book function', id);
  const sql = 'SELECT * FROM booktable WHERE id=$1;';
  const safeValues = [id];
  client.query(sql, safeValues)
    .then((results) => {
      console.log(results);
      const myFavBook = results.rows[0];
      response.render('pages/books/detail', { value: myFavBook });
    })
    .catch((error) => {
      console.log(error);
      res.render('pages/error');
    });
}


function renderSearchForm(req, res) {
  res.render('pages/searches/new.ejs');
}

function addBookToDatabase(req, res) {
  const { authors, title, isbn, image, description } = req.body;
  const sql = 'INSERT INTO booktable (author, title, isbn, image_url, description) VALUES ($1,$2,$3,$4,$5) RETURNING id;';
  const safeValues = [authors, title, isbn, image, description];
  client.query(sql, safeValues)
    .then((idFromSQL) => {
      console.log(idFromSQL);
      res.redirect(`books/${idFromSQL.rows[0].id}`);
    }).catch((error) => {
      console.log(error);
      res.render('pages/error');
    });
}

function collectFormInformation(req, res) {
  console.log(req.body);
  const searchQuery = req.body.searchQuery;
  const searchType = req.body.searchType;
  console.log(req.body);
  let URL = `https://www.googleapis.com/books/v1/volumes?q=in${req.body.searchType}:${req.body.searchQuery}`;
  if (searchType === 'title') { URL += `+intitle:${searchQuery}`; }
  if (searchType === 'author') { URL += `+inauthor:${searchQuery}`; }
  console.log('URL', URL);

  superagent.get(URL)
    .then(data => {
      console.log(data.body.items[1]);
      const book = data.body.items;
      const finalBookArray = finalBookArray.map(books => new Book(book.volumeInfo));
      response.render('pages/searches/show', { renderContent: finalBookArray });
      return new Book(books);
    });

}


//client.query)sql, safeValues);
//response.status(200).redirect('/books/${id}');

//Book Construtor

function Book(book) {
  this.title = book.title ? book.title : 'no title found';
  this.description = book.description ? book.description : 'no description found';
  this.authors = book.authors ? book.authors[0] : 'no author found';
  this.isbn = book.industryIdentifiers;
  //splice method
  //
  console.log('url', URL);
}




  function handleError(req, res) {
    res.status(404).render('view/pages/pages/error');
  }


client.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App Listening on port: ${PORT}`);
    });
  })
  .catch(error => {
    console.log(error);
  });



// Handlers








//handleError();