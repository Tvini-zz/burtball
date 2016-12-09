const log4js = require('log4js');
const fs = require("fs");

let appenders = [];


appenders.push({
    type: "console"
});
log4js.configure({appenders: appenders});

const logger = log4js.getLogger();

module.exports = logger;
module.exports.expressLogger = log4js.connectLogger(logger, {
    level: 'auto',
    format: ':method :url -> :status in :response-timems'
});