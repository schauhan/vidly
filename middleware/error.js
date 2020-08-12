const winston = require('winston');

function error(err, req, res, next) {
    winston.error(err);
    res.status(500).send('A server error occured!');
}


module.exports = error;