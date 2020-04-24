/**
 * @author Bruno Pereira Ribeiro - 2017138
 */

const logger = require("morgan");
const cors = require("cors");
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const path = require('path');
require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;
var booksCtrl = require('./book-controller');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(require('./routes'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.post('/books', booksCtrl.createBook);
app.get('/books', booksCtrl.getBooks);
app.delete('/books/:id', booksCtrl.deleteBook);
app.put('/books/:id', booksCtrl.updateBook);
app.listen(port, function(err){
    console.log("Listening on Port: " + port)
});

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});

mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});