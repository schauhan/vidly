const winston = require('winston');
const config = require('config');
require('express-async-errors');

module.exports = winston.createLogger({
    transports: [
        new(winston.transports.Console)({
            level: 'info', 
            format: winston.format.combine(
                winston.format.simple(),
                //winston.format.colorize(),
                //winston.format.prettyPrint()
            ), 
            handleExceptions:true, 
            handleRejections:true
        })
    ]
});
