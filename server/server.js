require('./db-config.js');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var User = require('./models/User.js');
var util = require('./utilities/helpers.js');
var app = express();

//TODO: Change how secret is stored

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(expressJwt({ secret : 'andrew' }).unless({ path : ['/api/signin', '/api/signup'] }));


// Routes
app.post('/api/signup', util.checkUsername, util.createUser);

app.post('/api/signin', util.checkPassword, util.generateToken);


var server = app.listen(3000, function(){
  console.log("Server is running on http://localhost:" + server.address().port)
});

