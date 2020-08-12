const mongoose = require('mongoose');
const config = require('config');
const logger = require('../startup/logging');

module.exports = function(){
    var connectionString = config.get('connectionString');
    mongoose.connect(connectionString, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useFindAndModify: false 
        })
        .then(() => logger.info('Connected to mongodb...'))
}
