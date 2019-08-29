'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('../tools/bcrypt');

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
                let passwordMatch = await bcrypt.compareHash(req.query.password, user.password);
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
        let passwordMatch = await bcrypt.compareHash(req.query.password, dbhash);
        if (req.query.username == dbusername && passwordMatch) {
            res.sendStatus(200);
        } else {
            res.sendStatus(401);
        }
    }
});

module.exports = router;