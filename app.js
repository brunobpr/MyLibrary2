/**
 * @author Bruno Pereira Ribeiro - 2017138
 * // Code written based on Mikhail Timofeev lecturers at CCT Dublin 
 * API built using the Express framework
 */

// Cors package enables Cross-origin resource sharing 
const cors = require("cors");
// Express is the web framework used to create the API
const express = require('express');
// Moongose is the package that allows access to MongoDB
const mongoose = require('mongoose');
// Path helps to shorten the file name 
const path = require('path');
// Dotenv allows us to hide secret info inside the sytem
require('dotenv').config();

// Create an app using Express framework
var app = express();
// Defining a port, but using process.env.PORT to don't make it hardcoded
var port = (process.env.PORT || 3000);
// Create a new shorter path to access the views folder 
app.set('views', path.join(__dirname, 'views'));
// Setting the view engine to EJS
app.set('view engine', 'ejs');
// URLenconded allow us to extract info from the body of the request (req.body)
app.use(express.urlencoded({ extended: true }));
// Storing the book-controller em uma variavel
var booksCtrl = require('./controllers/book-controller');
// Given access to the routes
app.use(require('./routes/routes'));

//Defining the routes to create, read, update and delete
//Each of them will have a different function (functions are stored on book-controller)
app.post('/', booksCtrl.createBook);
app.get('/', booksCtrl.getBooks);
app.get('/delete', booksCtrl.deleteBook);
app.get('/update', booksCtrl.updateBook);

// Listening to port
app.listen(port, function (err) {
    console.log("Listening on Port: " + port)
});

//Mongoose connector, process.env.MONGDB_URL is holding the access info
//Additional paramenters were add to avoid warning messages. Some of the method being used throughtout the app is deprecated
mongoose.connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

//IF MongoDB does not connect, display the error and exit the app
mongoose.connection.on('error', (err) => {
    console.log('Mongodb Error: ', err);
    process.exit();
});

//It MongoDB connects, display a message
mongoose.connection.on('connected', () => {
    console.log('Bruno Pereira Ribeiro - 2017138');
    console.log('MongoDB is successfully connected');
});
