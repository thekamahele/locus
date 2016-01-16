var User = require('./userModel');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var jwt = require('jsonwebtoken');
var client = require('../config/db-config');

module.exports.signin = function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    checkPassword(username, password)
        .then(function ( match ){
            if ( match ){
                var token = jwt.sign({
                    username : username
                }, 'secret');
                res.send({ token : token, user : req.body });
            } else {
                res.status(401).end('Password is incorrect, please try again');
            }
        });
};

module.exports.signup = function( req, res, next ) {
    console.log('user is', req.body);

    console.log('client is ',client);

    client.getAsync(req.body.username)
          .then(function (user) {
             if ( !user ) {
                 next();
             } else {
                 res.status(409)
             }
          });


    //User.findOne({ username : req.body.username })
    //    .then(function(user) {
    //        if (user !== null) {
    //            res.status(409).end('Username already taken, please try again!');
    //        } else {
    //            next()
    //        }
    //    });
};

module.exports.createUser = function (req, res, next) {
    var password = req.body.password;
    var username = req.body.username;

    hashPassword(username, password)
        .then(function(hash){
            var user = {
                username  : username,
                password  : hash,
                email     : req.body.email,
                firstName : req.body.firstName,
                lastName  : req.body.lastName
            };
            return User.create(user);
        })
        .then(function(){
            res.sendStatus(200);
        })

};

function generateToken (req, res, next) {
    console.log('creating token');
    var token = jwt.sign({
        username: req.body.username
    }, 'andrew');
    res.send({
        token : token,
        user : req.body
    });
}

function hashPassword ( username, password ) {
    return bcrypt.genSaltAsync(8)
        .then(function(salt) {
            return bcrypt.hashAsync(password, salt);
        })
        .catch(function(err){
            throw new Error('Error in hashing password...', err);
        });
}

function checkPassword ( username, password ) {
    return User.findOne({ username : username })
        .then(function( user ){
          return bcrypt.compareAsync(password, user.password);
        })
}