var express = require('express');
var router = express.Router();
var mydata = require("../books.json");

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render('index', {
         data: mydata,
      });
});

module.exports = router;
