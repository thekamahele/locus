var mongoose = require('mongoose');
var uri = 'mongodb://localhost/locus';
mongoose.connect('mongodb://localhost/locus');

var db = mongoose.connection;

db.on('error', function(err) {
   console.error(err);
});

db.on('open', function(){
    console.log('Database connected...');
});

