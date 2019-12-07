var express = require('express');
var router = express.Router();
var mydata = require("../books.json");


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {});
});

/* GET favourites page. */
router.get('/fav', function (req, res, next) {
    res.render('fav.ejs', {
        data: mydata,
    });
});

/* GET library page. */
router.get('/library', function (req, res, next) {
    res.render('library', {
        data: mydata,
    });
});

/* GET pictures page. */
router.get('/pictures', function (req, res, next) {
    res.render('pictures', {});
});

/* GET new book registration page. */
router.get('/new_book', function (req, res, next) {
    res.render('new_book', {});
});

/* GET update library page. */
router.get('/update', function (req, res, next) {
    res.render('update.ejs', {
        data: mydata,
    });
});


module.exports = router;
