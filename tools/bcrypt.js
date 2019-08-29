'use strict';
// const saltRounds = 10;

const bcrypt = require('bcrypt');
var tools = {
    createHash: async (password, saltRounds) => {
        try {
            let hash = await bcrypt.hash(password, saltRounds);
            return hash;
        } catch (e) {
            Error(`Error: ${e}`);
        }
    },
    compareHash: async (password, hash) => {
        try {
            let match = await bcrypt.compare(password, hash);
            return match;
        } catch (e) {
            Error(`Error: ${e}`);
        }
    }
}

module.exports = tools;