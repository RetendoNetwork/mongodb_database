const colors = require('colors');
const moment = require('moment');

const logger = {
    success: function log(msg) {
        console.log(`[SUCCESS] (${moment().format("HH:mm:ss")}) ${msg}`.green);
    },

    warn: function warn(msg) {
        console.log(`[WARN] (${moment().format("HH:mm:ss")}) ${msg}`.yellow);
    },

    error: function error(msg) {
        console.log(`[ERROR] (${moment().format("HH:mm:ss")}) ${msg}`.red);
    }
}

module.exports = logger;
