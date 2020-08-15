const express = require('express');
const genresRouter = require('../routes/genres');
const customersRouter = require('../routes/customers');
const moviesRouter = require('../routes/movies');
const rentalsRouter = require('../routes/rentals');
const usersRouter = require('../routes/users');
const authRouter = require('../routes/auth');

const error = require('../middleware/error');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('../middleware/swagger')();

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = function (app){
  app.use(express.json());
  app.use('/api/genres', genresRouter);
  app.use('/api/customers', customersRouter);
  app.use('/api/movies', moviesRouter);
  app.use('/api/rentals', rentalsRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(error);
}