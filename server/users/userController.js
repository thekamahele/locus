var User = require('./userModel');
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//app.use(expressJwt({ secret : 'andrew' }).unless({ path : ['/api/signin', '/api/signup'] }));

module.exports.signin = function(req, res, next) {
    console.log('request object is', req.body);
    res.status(200).end('In signin all is well');
};

module.exports.signup = function( req, res, next ) {

    User.findOne({ username : req.body.username })
        .then(function(user) {
            if (user === null) {

            }
        })
    //Check if a username is already in database
      // If yes, hash password and create user out of request body
      // If not, send back error saying username has already been taken.
};