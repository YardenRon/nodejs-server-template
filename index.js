const express = require('express');
const app = express();
const birdsRouter = require('./birds');
const port = 3000;

app.get('/', (req, res) => res.send('Hello World'));

// Works for any type of method: GET, POST, PUT, DELETE...
app.all('/secret', (req, res, next) => {
    console.log('Accessing the secret section');
    next();
});

// Using params in url
app.get('/users/:userId/books/:bookId', (req, res) => res.send(req.params));

// Using middleware callbacks
const cb0 = (req, res, next) => {
    console.log('inside first callback');
    next();
};

const cb1 = (req, res, next) => {
    console.log('inside second callback');
    next();
};

const cb2 = (req, res, next) => res.send('inside third and last callback');

app.get('/middleware', [cb0, cb1, cb2]);

// Chainable route handlers
app.route('/book')
  .get((req, res) => res.send('Get a random book'))
  .post((req, res) => res.send('Add a book'))
  .put((req, res) => res.send('Update the book'));

// Using express router
app.use('/birds', birdsRouter);

app.listen(port, () => console.log(`Server template app listening at http://localhost:${port}`));

/*
Response methods:
res.download()	    Prompt a file to be downloaded.
res.end()	        End the response process.
res.json()	        Send a JSON response.
res.jsonp()	        Send a JSON response with JSONP support.
res.redirect()	    Redirect a request.
res.render()	    Render a view template.
res.send()	        Send a response of various types.
res.sendFile()	    Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string representation as the response body.
*/