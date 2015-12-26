var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var _ = require('lodash');
var app = express();

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.route('/api/create')
   .post(function(req, res, next) {

   });

app.route('/api/signin')
   .post(function(req, res, next){

   });





var server = app.listen(3000, function(){
  console.log("Server is running on http://localhost:" + server.address().port)
})