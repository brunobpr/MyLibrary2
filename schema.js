var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    Title: String,
    Subtitle: String,
    Autor: String,
    Publisher: String,
    Year: String,
    ReadYear: String
});

module.exports = mongoose.model('Book', bookSchema);