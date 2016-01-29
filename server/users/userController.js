var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var jwt = require('jsonwebtoken');
var client = require('../config/db-config');

module.exports.signin = function(req, res, next) {
  var username = req.body.username;
  checkPassword(username, req.body.password)
    .then(function ( match ){
      if ( match ){
        var token = jwt.sign({
            username : username
        }, 'secret');
        res.send({ token : token, user : username });
      } else {
          res.status(401).end('Password is incorrect, please try again');
      }
    });
};

module.exports.signup = function( req, res, next ) {
  client.hmgetAsync('user:'+req.body.username, 'username')
    .then(function (user) {
      if ( !user[0] ) {
         next();
      } else {
         res.sendStatus(409);
        }
    });
};

module.exports.createUser = function (req, res, next) {
  var password = req.body.password;
  var username = req.body.username;
  hashPassword(username, password)
    .then(function(hash){
      var user = [
          "username", username,
          "password", hash,
          "email", req.body.email,
          "firstName", req.body.firstName,
          "lastName", req.body.lastName
      ];

      return client.hmsetAsync("user:" + username, user);
    })
    .then(function(){
        res.sendStatus(200);
    });
};

//function generateToken (req, res, next) {
//    console.log('creating token');
//    var token = jwt.sign({
//        username: req.body.username
//    }, 'secret');
//    res.send({
//        token : token,
//        user : req.body.username
//    });
//}

function hashPassword ( username, password ) {
  return bcrypt.genSaltAsync(10)
    .then(function(salt) {
      console.log('salt', salt)
        return bcrypt.hashAsync(password, salt);
    })
    .catch(function(err){
        throw new Error('Error in hashing password...', err);
    });
}

function checkPassword ( username, password ) {
  return client.hmgetAsync('user:'+username, 'password')
    .then(function( pwd ){
      return bcrypt.compareAsync(password, pwd[0]);
    })
    .catch(function(err) {
      console.error('Error in checking password:', err)
    });
}