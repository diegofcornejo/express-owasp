'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

var createHash = async function (password) {
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (e) {
        Error(`Error: ${e}`);
    }
};

var compareHash = async function (password, hash) {
    try {
        let match = await bcrypt.compare(password, hash);
        return match;
    } catch (e) {
        Error(`Error: ${e}`);
    }
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