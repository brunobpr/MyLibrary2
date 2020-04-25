// Creating a express api
var express = require('express'),
    // Define router as express routes
    router = express.Router(),
    // Storing book-controller inside of a varible
    bookCtrl = require('../controllers/book-controller');

////Defining the routes to create, read, update and delete
//Each of them will have a different function (functions are stored on book-controller)
router.get('/', bookCtrl.getBooks);
router.post('/update', bookCtrl.updateBook);
router.post('/delete', bookCtrl.deleteBook);
router.post('/', bookCtrl.createBook);

// Exporting the routes
module.exports = router;