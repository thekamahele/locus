var mongoose = require('mongoose');

var HabitSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true
  },
  count: {
        type : Number,
    required : true
  }

});

module.exports = mongoose.model('habit', HabitSchema);
