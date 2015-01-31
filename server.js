var express = require('express');
var app = express();

// CONTRIBUTED MIDDLEWARE
var serveStatic = require('serve-static');
app.use(serveStatic('public', {'index': ['index.html']}));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// DATABASE CONNECTION
var mongoose = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
mongoose.connect('mongodb://localhost/park');

// ROUTES
app.use('/search', require('./server/routes/routes'));

app.listen(3000);
