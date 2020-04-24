var express = require('express'),
router = express.Router(),
bookCtrl = require('./book-controller');

router.get('/', bookCtrl.getBooks);
router.post('/update', bookCtrl.updateBook);
router.post('/delete', bookCtrl.deleteBook);
router.post('/', bookCtrl.createBook);

module.exports.UPLOAD_PATH = 'uploads';

var multer = require('multer');
var upload = multer({ dest: module.exports.UPLOAD_PATH });

module.exports = router;