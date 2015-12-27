var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

///////////////////// User | Password Utilities ///////////////////////
var hashPassword = function (username, password) {
    return bcrypt.genSaltAsync(8)
        .then(function(salt) {
            return bcrypt.hashAsync(password, salt);
        })
        .then(function(hash) {
            return hash;
        })
        .catch(function(err){
            throw new Error('Error in hashing password...', err);
        });
};

module.exports.checkPassword = function (req, res, next) {
    User.findOne({ username : req.body.username })
        .then(function(user) {
            if (!user) {
                res.status(404).end('Username not found, please try again!');
            }
            console.log('Comparing passwords');
            return bcrypt.compareAsync(req.body.password, user.get('password'))
                         .catch(function(err) {
                             console.log('Error comparing password is ', err);
                             res.status(500).end('Error comparing passwords, please try again');
                         })
        })
        .then(function(comp){
            if (!comp) {
                res.status(409).end('Passwords do not match, please try again!');
            }
            next();
        });
};

module.exports.generateToken = function (req, res, next) {
        console.log('creating token');
        var token = jwt.sign({
            username: req.body.username
        }, 'andrew');
        res.send({
            token : token,
            user : req.body
        });
};


module.exports.checkUsername = function (req, res, next) {
    User.findOne({ username : req.body.username })
        .then(function(user) {
            if( !user ) {
                next();
            } else {
                res.status(409).end('Username already taken, please choose a new one!');
            }
        })

};

module.exports.createUser = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : username,
        password : password,
        email : req.body.email
    };

    hashPassword(username, password)
        .then(function(hash){
            newUser.password = hash;
            User.create(newUser)
                .then(function(user){
                    res.status(200).send(user);
                }, function(err){
                    res.status(500).end('Error saving user to database');
                });
        });
};

