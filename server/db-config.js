var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/habittrackr');
mongoose.connection.once('open', function() {
    console.log('Listening on port 3000...');
    app.listen(3000);
});