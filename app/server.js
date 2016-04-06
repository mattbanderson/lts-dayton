var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 3000));

var options = {};
// Uncomment to change default start page
var options = { index: "app.html" };

app.use('/', express.static(path.join(__dirname, ''), options));
// Uncomment to serve json data
app.use(express.static(path.join(__dirname, '/data'), options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
