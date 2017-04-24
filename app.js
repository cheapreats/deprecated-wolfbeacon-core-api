/**
 * Module dependencies
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var env = require('node-env-file');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var app = express();

env(__dirname + '/.env');

/**
 * Connect to MongoDB
 */

var connectToDatabase = function () {
    var options = {
        // user: process.env.MONGODB_USERNAME,
        // pass: process.env.MONGODB_PASSWORD,
        server: {socketOptions: {keepAlive: 1}}
    };
    mongoose.connect(process.env.MONGODB_URI, options);
};
connectToDatabase();

// When successfully connected
mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + process.env.MONGODB_URI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

/**
 * Auth0 Security Configuration
 */

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://wolf-beacon.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://api.wolfbeacon.com',
    issuer: "https://wolf-beacon.auth0.com/",
    algorithms: ['RS256']
});

// app.use(jwtCheck);


/**
 * Add Other Configuration
 */
app.use(favicon('favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Add Routes
 */

var animalRoutes = require('./routes/animal-routes');
app.use('/animals', animalRoutes);

var hackathonRoutes = require('./routes/hackathon-routes');
app.use('/hackathons', hackathonRoutes);

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
