/**
 * Module dependencies
 */

import express from 'express';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import env from 'node-env-file';
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

import routes from './routes/index'

const app = express();

env(__dirname + '/.env');


/**
 * Add Other Configuration
 */


app.use(favicon('favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


/**
 * Connect to MongoDB
 */

mongoose.Promise = require('bluebird');

const connectToDatabase = () => {
    const options = {
        // user: process.env.MONGODB_USERNAME,
        // pass: process.env.MONGODB_PASSWORD,
        server: {socketOptions: {keepAlive: 1}}
    };
    mongoose.connect(process.env.MONGODB_URI, options);
};
connectToDatabase();

mongoose.connection.on('connected', () =>
    console.log('Mongoose default connection open to ' + process.env.MONGODB_URI)
);

mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
});

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

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        status: "ERROR",
        message: err.message
    });
});

module.exports = app;
