const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');

// creamos una funcion que se conecte con la app
function routerApi(app) {
  const router = express.Router();
  // utilizamos el endpoint prodcutsRouter y lo nombramos products:
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
}

module.exports = routerApi;
