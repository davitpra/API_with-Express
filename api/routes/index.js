const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const customersRouter = require('./customers.router');
const OrdersRouter = require('./order.router');
const authRouter = require('./auth.router');
const profileRouter= require('./profile.router')

function routerApi(app) {
  const router = express.Router();

  app.use('/api/v1', router);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter);
    router.use('/users', usersRouter);
    router.use('/curtomers', customersRouter);
    router.use('/orders', OrdersRouter);
    router.use('/auth', authRouter);
    router.use('/profile', profileRouter);
}

module.exports = routerApi;
