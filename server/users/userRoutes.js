var userController = require('./userController');

module.exports = function ( app ) {

    app.post('/signin', userController.signin);
    app.post('/signup', userController.signup, userController.createUser);
    //app.post('/signout', userController.signout);

};