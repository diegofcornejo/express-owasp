'use strict';

const express = require('express');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const validator = require('express-validator');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const lusca = require('lusca');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json({
    limit: '1mb'
}));
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());

// Express session config
// https://www.npmjs.com/package/express-session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'secret', //generate a secure passphrase
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true,
        maxAge: 3600000,
        httpOnly: true
    },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    }),
}))

// Helmet config
// https://www.npmjs.com/package/helmet
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"]
    }
}));


// Lusca config
// https://www.npmjs.com/package/lusca
app.use(lusca({
    csrf: true,
    xframe: 'SAMEORIGIN',
    hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true
    },
    xssProtection: true,
    nosniff: true
}));

//Sanitize all post request (user input)
app.use(validator());
app.use(function (req, res, next) {
    for (var item in req.body) {
        req.sanitize(item).escape();
    }
    next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', authRouter);

module.exports = app;