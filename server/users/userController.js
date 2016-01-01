var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

//app.use(expressJwt({ secret : 'andrew' }).unless({ path : ['/api/signin', '/api/signup'] }));

module.exports.signin = function(req, res, next) {
    res.status(200).end('In signin all is well');
};

module.exports.signup = function( req, res, next ) {
    res.status(200).end('In signup all is well');
};