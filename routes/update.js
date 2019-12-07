var express = require('express');
var router = express.Router();

/* GET update library page. */
router.get('/update', function (req, res, next) {
    var mydata = require("../books.json");
    res.render('update.ejs', {
       data: mydata,
       
    });
});


module.exports = router;