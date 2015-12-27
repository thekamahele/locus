var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var _ = require('lodash');
var app = express();

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

app.route('/api/create')
   .post(function(req, res, next) {

   });

app.post('/api/signin', authenticate, function (req, res) {
    res.send(req.body);
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