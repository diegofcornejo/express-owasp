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
        let user = {
            username : 'admin',
            password : '$2b$10$UgBV6UiCICjNmSPriOke0elW11h75AGiwlxnLn9Ph87P79fGxEHQq'
        }
        let passwordMatch = await bcrypt.compareHash(req.query.password, user.password);
        if (req.query.username == user.username && passwordMatch) {
            res.status(200).json(user);
        } else {
            res.status(401).json({
                "message": "Invalid username or password"
            });
        }
    }
});

module.exports = router;