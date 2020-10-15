// Code written by Bruno Ribeiro based on Mikhail Timofeev lecturers at CCT Dublin 
var mongoose = require('mongoose');

// This the model of a Book on MongoDB
// All atributtes are Strings and only the Subtitle and ReadYear are not required
var bookSchema = new mongoose.Schema({
    // This is the TITLE of the book
    Title: {
        type: String,
        required: true
    },
    // This is the SUBTITLE of the book - Not required because in real world some books dont have subtitles
    Subtitle: String,

    // This is the name of the AUTHOR ... there was a spelling mistake since CA1. Sorry.
    Autor: {
        type: String,
        required: true
    },
    // This is the name of the company that published the book.
    Publisher: {
        type: String,
        required: true
    },
    // This is the YEAR that the book was published.
    Year: {
        type: String,
        required: true
    },

    // This is the Year that the book was read - Not required because it is possible that the book was never read
    ReadYear: String
});

// Exporting the Book Model
module.exports = mongoose.model('Book', bookSchema);