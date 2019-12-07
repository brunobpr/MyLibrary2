var express = require('express');
var router = express.Router();



/* GET library page. */
router.get('/library', function (req, res, next) {
    var mydata = require("../books.json");
    res.render('library', {
        data: mydata,
    });
});



module.exports = router;
