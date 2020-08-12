/* Demo app created in July-Aug 2020
  Usage: node app.js OR nodemon app.js

  Update(Aug 5,2020):
  Uninstalled the morgan and debug modules 
  and started using winston instead
*/

const express = require('express');
const config = require('config');

const app = express();
const logger = require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/validation')();

// TODO: Conditionally load this module if env is production
require('./startup/prod')(app);

// Check current env
currentEnv = app.get('env');
logger.info('ENV: ' + currentEnv);
logger.info('APP NAME: ' + config.get('name'));
// throw ('something'); // testing. Replacce it later with proper unit tests

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => logger.info(`Listening on port ${PORT}...`));
