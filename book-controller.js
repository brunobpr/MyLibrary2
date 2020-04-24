var Book = require('./schema');

exports.createBook = function(req, res) { 
    var newbook = new Book(req.body);
    newbook.save(function (err, book) { 
        if (err) { 
            res.status(400).json(err);
        }

        res.json(book); 
});
};

exports.getBooks = function(req, res) {
  Book.find({}, function (err, books) {
    if (err) {
      res.status(400).json(err); 
    } 
    res.render('books', {     
        data: books,
    });
  }); 

};

exports.updateBook = function(req, res) {
    const id = req.body.id;
    console.log(req.body);
  Book.findOneAndUpdate({_id: id}, req.body , {new: true},function (err, book) {
    if (err) {
      res.status(400).json(err);
    }
    res.redirect('back');
  }); 
};

exports.deleteBook = function(req, res) {
  Book.findByIdAndRemove(req.params.Title, function (err, Book) {
    if (err) {
      res.status(400).json(err);
    } 
    res.json(book);
  }); 
};