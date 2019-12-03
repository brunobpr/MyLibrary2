var express = require('express');
var router = express.Router();
var mydata = require("../books.json");

/* GET new book registration page. */
router.get('/new_book', function (req, res, next) {
    res.render('new_book.ejs', {
       data: mydata,
    });
});


module.exports = router;
