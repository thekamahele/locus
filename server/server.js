require('./dbConfig.js');
var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locus');


//TODO: Change how secret is stored

// Middleware



// Routes
app.post('/api/signup', util.checkUsername, util.createUser);

app.post('/api/signin', util.checkPassword, util.generateToken);


var server = app.listen(3000, function(){
  console.log("Server is running on http://localhost:" + server.address().port)
});

