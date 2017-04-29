/**
 * Module dependencies
 */

import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import env from 'node-env-file';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import routes from './routes/index'

const app = express();

env(__dirname + '/.env');

/**
 * Connect to MongoDB
 */

const connectToDatabase = function () {
    const options = {
        // user: process.env.MONGODB_USERNAME,
        // pass: process.env.MONGODB_PASSWORD,
        server: {socketOptions: {keepAlive: 1}}
    };
    mongoose.connect(process.env.MONGODB_URI, options);
};
connectToDatabase();

// When successfully connected
mongoose.connection.on('connected', () =>
    console.log('Mongoose default connection open to ' + process.env.MONGODB_URI)
);

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected');
});

/**
 * Auth0 Security Configuration
 */

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://wolf-beacon.auth0.com/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: '{process.env.AUTH0_AUDIENCE}',
    issuer: `https://wolf-beacon.auth0.com/`,
    algorithms: ['RS256']
});

// app.use(checkJwt);


/**
 * Add Other Configuration
 */
app.use(favicon('favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * Add Routes
 */

app.use('/', routes);

/**
 * Error Handlers
 */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}

// production error no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

export default app;
