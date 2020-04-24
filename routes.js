var express = require('express'),
router = express.Router(),
userCtrl = require('./book-controller');

router.get('/', (req, res) => res.send('Hello World!'));

module.exports.UPLOAD_PATH = 'uploads';

var multer = require('multer');
var upload = multer({ dest: module.exports.UPLOAD_PATH });

module.exports = router;