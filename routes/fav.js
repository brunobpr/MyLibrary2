var express = require('express');
var router = express.Router();
var mydata = require("../books.json");

/* GET favourite page. */
router.get('/fav', function (req, res, next) {
    res.render('fav.ejs', {
       
    });
});

module.exports = router;
