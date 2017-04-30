'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _nodeEnvFile = require('node-env-file');

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('express-jwt'); /**
                                   * Module dependencies
                                   */

var jwksRsa = require('jwks-rsa');

var app = (0, _express2.default)();

(0, _nodeEnvFile2.default)(__dirname + '/.env');

/**
 * Connect to MongoDB
 */

var connectToDatabase = function connectToDatabase() {
    var options = {
        // user: process.env.MONGODB_USERNAME,
        // pass: process.env.MONGODB_PASSWORD,
        server: { socketOptions: { keepAlive: 1 } }
    };
    _mongoose2.default.connect(process.env.MONGODB_URI, options);
};
connectToDatabase();

// When successfully connected
_mongoose2.default.connection.on('connected', function () {
    return console.log('Mongoose default connection open to ' + process.env.MONGODB_URI);
});

// If the connection throws an error
_mongoose2.default.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
_mongoose2.default.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

/**
 * Auth0 Security Configuration
 */

var checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://wolf-beacon.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    audience: '{process.env.AUTH0_AUDIENCE}',
    issuer: 'https://wolf-beacon.auth0.com/',
    algorithms: ['RS256']
});

// app.use(checkJwt);


/**
 * Add Other Configuration
 */
app.use((0, _serveFavicon2.default)('favicon.ico'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

/**
 * Add Routes
 */

app.use('/', _index2.default);

/**
 * Error Handlers
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
//# sourceMappingURL=app.js.map