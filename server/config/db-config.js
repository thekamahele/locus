var Promise = require('bluebird');
var redis = Promise.promisifyAll(require('redis'));
var db = redis.createClient();


module.exports = db;