var express = require('express');
var router = express.Router();


/* GET pictures page. */
router.get('/pictures', function (req, res, next) {
    res.render('pictures.ejs', {
       
    });
});

module.exports = router;
