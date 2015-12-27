var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var app = express();


var jwtSecret = 'abcdef1234';

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(expressJwt({ secret : jwtSecret }).unless( { path : '/api/signin' } ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.route('/api/create')
   .post(function(req, res, next) {

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