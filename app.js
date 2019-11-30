var createError = require('http-errors');
var express = require('express');
var path = require('path');
var http = require('http');
var app = express();
var fs = require('fs');
var port = (process.env.PORT || '3000');
var server = http.createServer(app);

/**
 * Routes to each pages 
 */

var indexRouter = require('./routes/index');
var fav = require('./routes/fav');
var library = require('./routes/library');
var pictures = require('./routes/pictures');
var new_book = require('./routes/new_book');
app.use('/', indexRouter);
app.use('/fav', fav);
app.use('/library', library);
app.use('/pictures', pictures);
app.use('/new_book', new_book);
/**
 * All the code below was auto generated by Eclipse IDE when setting up a EJS template
 * Create HTTP server.
 */


server.listen(port);
server.on('listening', onListening);
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));


app.post('/post/book', (req, res) => {
    // Creating variables regarding the user input
    const title = req.body.title;
    const subtitle = req.body.subtitle;
    const author = req.body.author;
    const publisher = req.body.publisher;
    const year_edition = req.body.year_edition;
    //Reading the books.json file and getting its data in
    fs.readFile('books.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            s
            console.log(err);
        } else {
            // Transforming the JSON file into a JavaScript string
            new_book = JSON.parse(data);
            // Adding the new book to the current JavaScript Object
            new_book.books.push({
                'Title': title,
                'Subtitle': subtitle,
                "Autor": author,
                "Publisher": publisher,
                "Year/Edition": year_edition,
                "ReadYear": ""
            });
            //Converting the JS string into a JSON.
            //Writing the content back (old + new) back to the file
            fs.writeFile('books.json', JSON.stringify(new_book), function (err) {
                if (err) throw err;
            })
        }
    });
})

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
}

module.exports = app;
