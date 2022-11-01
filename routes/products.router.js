const express = require('express')
const ProductService = require('../services/product.service')
const validatorHandler = require('../middlewares/validator.handler')
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  deleteProductSchema
} = require('../schemas/product.schema')

const router  = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {

  const products = await service.find();
  res.status(200).json(products);

});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {

    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);

    } catch (error) {
      next(error)
    }
  }
);

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {

    const body = req.body;
    const product = await service.create(body);
    res.status(201).json(product);

  }
);

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {

    try {
      const { id } = req.params
      const body = req.body;
      const product = await service.update(id, body);
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }

  }
);

router.delete('/:id', async (req, res, next) => {

  try {
    const { id } = req.params
    const response = await service.delete(id)
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
