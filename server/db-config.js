var mongoose = require('mongoose');
var uri = 'mongodb://localhost/locus';
var User = require('./models/User.js');
// Connect to MongoDB
mongoose.connect(uri);

var db = mongoose.connection;

db.on('error', function(err) {
   console.error(err);
});

db.on('open', function(){
    console.log('Database connected...');
});