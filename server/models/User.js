var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
      type     : String,
      required : true
    },
    email: {
      type     : String,
      required : true
    },
    password: {
      type     : Number,
      required : true
    }

});

module.exports.User = mongoose.model('Users', userSchema);

