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

app.use(express.urlencoded({ extended: true }));

// Declare port for server
const PORT = process.env.PORT || 3000;
// Use CORS (cross origin resource sharing)

app.use(express.static('./public'));

// Creating postgres client
const client = new pg.Client(process.env.DATABASE_URL);


// Route

// app.get('/', (req, res) => {
//   res.send('Hello !');
// });
// app.post('/searches', (req, res) => {
//   console.log(req.body);

//   app.get('/searches/new', (req, res) => {

//     res.render('views/pages/pages/searches/new');
//   });
//   app.get('/', renderHome);
app.get('/', (req, res) => {
  res.send('Hello !');
});

app.post('/searches', collectFormInformation);

app.get('/searches/new', (req, res) => {
   console.log('/searches/new');
  res.render('pages/searches/new');
 });

app.get('/', renderHome);
  //app.get('/searchform', renderSearchForm);
  //app.post('/ searches', collectFormInformation);


function collectFormInformation(req, resp) {
   console.log(req.body);
   const searchQuery = req.body.searchQuery;
  const searchType = req.body.searchType;
  console.log(req.body);
  

  let URL = `https://www.googleapis.com/books/v1/volumes?q=in${req.body.searchType}:${req.body.searchQuery}`;
  

  if (searchType === 'title') { URL += `+intitle:${searchQuery};`}
  if (searchType === 'author') { URL += `+inauthor:${searchQuery};`}

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



// app.get('/searches/new', (req, res => {

//   res.render('pages/searches/new');


function renderHome(req, res) {
  console.log('now you are in Render Home');
  const sql = 'SELECT * FROM booktable;';
  return client.query(sql)
    .then(results => {
      console.log(results.rows);
      res.status(200).render('views/pages/pages/index', { renderContent: allbooks });
    })
    .catch(error => {
      console.log(error);
      res.render('views/pages/pages/error');
    });
}

//client.query)sql, safeValues);
//response.status(200).redirect('/books/${id}');

//Book Construtor

// function Book(book) {
//   this.title = book.title ? book.title : 'no title found';
//   this.description = book.description ? book.description : 'no description found';
//   this.authors = book.authors ? book.authors[0] : 'no author found';
//   this.isbn = book.industryIdentifiers;
//   //splice method
//   //
//   console.log('url', URL);

// }




function handleError(req, res) {
  res.status(404).render('view/pages/pages/error');
}

// client.connect()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`App Listening on port: ${PORT}`);
//     });
//   });





// Handlers








//handleError();
// update