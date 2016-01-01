var express = require('express');
var mongoose = require('mongoose');
var app = express();


mongoose.connect('mongodb://localhost/locus');

require('./config/middleware.js')( app , express);

//TODO: Change how secret is stored

var server = app.listen(3000, function(){
  console.log("Server is running on http://localhost:" + server.address().port)
});

