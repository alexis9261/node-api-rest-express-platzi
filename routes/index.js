const productsRouter   = require('./products.router')
const usersRouter      = require('./users.router')
const categoriesRouter = require('./categories.router')

const express = require('express')

function routersApi(app) {

  const router = express.Router();
  app.use('/api/v1', router)

  router.use('/categories', categoriesRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
}

module.exports = routersApi;
