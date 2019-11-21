var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var ejs = require('ejs')
app.set('view engine', 'ejs');

app.locals.booksdata = require('./books');
app.loca
// 404 response
function errorConnecting(response){
    response.writeHead(404, {"Context-Type":"text/plain"})
    response.write("Error 404: Page not found!")
    response.end();
}

function onRequest(request, response){
   if( request.method == 'GET' && request.url == '/'){
    response.writeHead(200, {"Context-Type":"text/html"});
    
    fs.createReadStream("./index.html").pipe(response);
   } else{
       errorConnecting(response);
   }
}

http.createServer(onRequest).listen(3000);
console.log("Server is now running.....");


var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



