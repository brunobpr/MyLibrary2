var express = require('express');
var router = express.Router();
var mydata = require("../books.json");


/* GET library page. */
router.get('/library', function (req, res, next) {
    res.render('library', {
        data: mydata,
    });
});



module.exports = router;
