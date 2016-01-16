var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var methodOverride = require('method-override');
var expressJwt = require('express-jwt');


module.exports = function ( app, express, client ) {
    var userRouter = express.Router();

    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(express.static('public'));
    app.use(expressJwt({ secret : 'secret' }).unless({ path : ['/api/users/signin', '/api/users/signup'] }));

    app.use('/api/users', userRouter);

    require('../users/userRoutes.js')( userRouter );

};