// Code written by Bruno Ribeiro based on Mikhail Timofeev lecturers at CCT Dublin 


//Create a new MongoDB schema object
var Book = require('../models/book');

// The CRUD function starts here

//Add a new book to MongoDB ------------------------------CREATE---------------------
exports.createBook = function (req, res) {
    //Create a newBook object using info from request body
    var newbook = new Book(req.body);
    //Savint the new book to MongoDB
    newbook.save(function (err, book) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        //Go to the homepage
        res.redirect('back');
    });
};

//Get all books from MongoDB  ------------------------------READ---------------------
exports.getBooks = function (req, res) {
    // Find function return all books from MongoDB
    Book.find({}, function (err, books) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        //Render the books.ejs (front-end) and pass the list of books
        res.render('books', {
            //The front-end will be able to display the data    
            data: books,
        });
    });
};


//Update the book of the given ID ----------------------------UPDATE----------------------
exports.updateBook = function (req, res) {
    // Getting the ID from the request body and storing it in variable
    const id = req.body.id;
    // The funcion findOneAndUpdate requires an unique identifier, in this case is the ID from the book.
    // "FindOne" book with the given ID
    // "AndUpdate" it using info from the request body
    Book.findOneAndUpdate({ _id: id }, req.body, { new: true }, function (err, book) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        //Go to the homepage
        res.redirect('back');
    });
};

//Delete the book of the given ID ----------------------------DELETE----------------------
exports.deleteBook = function (req, res) {
    // Getting the ID from the request body and storing it in variable
    const id = req.body.id;
    // findByIdAndRemove doest exactly as it says.
    // Find a book with the ID given and remove it.
    Book.findByIdAndRemove(id, function (err, Book) {
        if (err) {
            //If a error occurs display the message
            res.status(400).json(err);
        }
        //Go to the homepage
        res.redirect('back');
    });
};