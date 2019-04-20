'use strict';

var express = require('express');
var router = express.Router();

/* login */
router.get('/', function (req, res, next) {
    let username = 'diego';
    if(username == req.query.username){
        res.sendStatus(200);
    }else{
        res.sendStatus(401);
    }
});

module.exports = router;