var express = require('express');
var router = express.Router();
var mydata = require("../books.json");

/* GET update library page. */
router.get('/update', function (req, res, next) {
    res.render('update.ejs', {
       data: mydata,
    });
});


module.exports = router;