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
app.set('view engine', 'ejs');

app.use(express.strict('/public'));
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
app.post('/books', addBooksToDatabase);
app.get('/books/:book_id', getOneBook);
app.delete('/update/:book_id', deleteBook);
app.get('*', handleError);

function renderHome(req, res) {
  console.log('render home')
  const sql = 'SELECT * FROM booktable;';
  return client.query(sql)
    .then(results => {
      console.log(reults.rows);
      res.status(200).render('pages/index', { renderedContent: allbook });
    })
}

function updateOneBook(req, res){
  const id = req.params.book_id;
  const {authors, title, isbn, image, description} = req.body;
  let sql = 'UPDATE booktable SET author=$1, title=$2, isbn=$3, image_url=$4, description=$5 WHERE id=$6;';
  let safeValues = [authors, title, isbn, image, description, id];
  client.query(sql,safeValues);
  response.status(200).redirect(`/books/${id}`);

}



function collectFormInformation(req, resp) {
  console.log(req.body);
  const searchQuery = req.body.searchQuery;
  const searchType = req.body.searchType;
  console.log(req.body);
  let URL = `https://www.googleapis.com/books/v1/volumes?q=in${req.body.searchType}:${req.body.searchQuery}`;
  if (searchType === 'title') { URL += `+intitle:${searchQuery};` }
  if (searchType === 'author') { URL += `+inauthor:${searchQuery};` }
  console.log('URL', URL);
  
  superagent.get(URL)
    .then(data => {
      console.log(data.body.items[1]);
      const book = data.body.items;
      const finalBookArray = book.map(books => new Book(books.volumeInfo));
      res.render('pages/searches/show', { renderContent: finalBookArray });
    })
    .catch(error => {
      console.log(error);
      res.send('views/pages/pages/error');
    });



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
    });





// Handlers








//handleError();
// update