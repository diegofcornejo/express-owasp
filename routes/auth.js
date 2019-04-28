'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

var createHash = async (password) => {
    try {
        let hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (e) {
        Error(`Error: ${e}`);
    }
};

var compareHash = async (password, hash) => {
    try {
        let match = await bcrypt.compare(password, hash);
        return match;
    } catch (e) {
        Error(`Error: ${e}`);
    }
};


/* login */
router.get('/', async function (req, res, next) {
    var model = require('../app').model;
    if (model) {
        model.User.findOne({
            where: {
                username: req.query.username
            }
        }).then(async user => {
            if (user) {
                let passwordMatch = await compareHash(req.query.password, user.password);
                if (passwordMatch) {
                    res.status(200).json(user);
                } else {
                    res.status(401).json({
                        "message": "Invalid username or password"
                    });
                }
            } else {
                res.status(401).json({
                    "message": "Invalid username or password"
                });
            }
        });
    } else {
        /*************Simulate Get DB response*******/
        let dbusername = 'diego';
        let dbhash = '$2b$10$4Sh.ut83.kUlSJIJGW94POymbn/ZJDPfo3Bz4V3G/o4dEr8lw.JBq';
        let passwordMatch = await compareHash(req.query.password, dbhash);
        if (req.query.username == dbusername && passwordMatch) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }
    /********Create user in DB*********/
    // let hash = await createHash('diego'); //generate a hash from plain text
    // var input = {
    //     "username":"diego",
    //     "password": hash
    // }
    // model.User.create(input).then(function (data) {
    //     res.send(data);
    // });
    /************************************/
});

module.exports = router;