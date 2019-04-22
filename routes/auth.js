'use strict';

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
const saltRounds = 10;

var createHash = function (password) {
    console.log(password);
    return new Promise(resolve => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (hash) {
                resolve(hash);
            } else {
                resolve(err);
            }
        });
    });
};

var compareHash = function (password, hash) {
    return new Promise(resolve => {
        bcrypt.compare(password, hash, function (err, res) {
            if (res) {
                resolve(res);
            } else {
                resolve(err);
            }
        });
    });
};

/* login */
router.get('/', async function (req, res, next) {
    // let hash = await createHash('diego'); //generate a hash from plain text
    //Simulate DB response
    let dbusername = 'diego';
    let dbhash = '$2b$10$4Sh.ut83.kUlSJIJGW94POymbn/ZJDPfo3Bz4V3G/o4dEr8lw.JBq';

    let passwordMatch = await compareHash(req.query.password, dbhash);
    if (req.query.username == dbusername && passwordMatch) {
        res.sendStatus(200);
    } else {
        res.sendStatus(401);
    }
});

module.exports = router;