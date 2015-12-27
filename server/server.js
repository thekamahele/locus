var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var db = require('./db-config.js');
var User = require('./models/User.js').User;
var app = express();

var jwtSecret = 'andrew'

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(expressJwt({ secret : 'andrew' }).unless({ path : ['/api/signin', '/api/signup'] }));

app.post('/api/signup', function(req, res, next) {
        var newUser = {
            name     : req.body.username,
            email    : req.body.email,
            password : req.body.password
        };


       var user = new User(newUser);
       user.save()
           .then(function(user){
               console.log('Created...', user);
               res.statusCode(200);
           })
           .catch(function(err) {
               res.status(500).end('Error creating user, please try again');
           })
   });

app.post('/api/signin', authenticate, function (req, res) {
    var token = jwt.sign({
        username: req.body.username
    }, jwtSecret);
    res.send({
        token : token,
        user : req.body
    });
});


var server = app.listen(3000, function(){
  console.log("Server is running on http://localhost:" + server.address().port)
});

//////////////////// Utilities /////////////////
function authenticate ( res, req, next ) {
  console.log('in authenticate')
    var body = res.body;

    if ( !body.username || !body.password ) {
        res.status(400).end('Must provide username and password');
    }

    next();
}