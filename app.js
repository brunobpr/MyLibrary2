/**
 * @author Bruno Pereira Ribeiro - 2017138
 */

const loger = require("morgan");
const cors = require("cors");
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();

var app = express();
var port = process.env.PORT || 3000;

app.use(require('./routes'));

app.listen(port, function(err){
    console.log("Listening on Port: " + port)
});

mongoose.connect(process.env.MONGODB_URL);
mongoose.connection.on('error', (err) => { 
    console.log('Mongodb Error: ', err); 
    process.exit();
});

mongoose.connection.on('connected', () => { 
    console.log('MongoDB is successfully connected');
});