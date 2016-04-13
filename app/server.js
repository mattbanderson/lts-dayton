var fs = require('fs');
var path = require('path');
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var app = express();

var options = {};
// Uncomment to change default start page
var options = { index: "app.html" };

app.use(compression());
app.use('/', express.static(path.join(__dirname, ''), options));
// Uncomment to serve json data
app.use(express.static(path.join(__dirname, '/data'), options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server started on port ' + port));
