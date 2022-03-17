const express = require('express');
const ProductService = require('../services/productService')
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/product.schema')

const router = express.Router();
const service = new ProductService();

// Limitar cantidad de productos con un parámetro query
router.get('/', async (req, res) => {
  const products =  await service.find();

  res.json(products);
});

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product =  await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
});

// Crear elemento
router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct =  await service.create(body);
    res.status(201).json(newProduct);
});

// Actualizar elemento
router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const updateProduct =  await service.update(id, body);
      res.json(updateProduct);
    } catch (error) {
      next(error);
    }
});

// Eliminar elemento
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct =  await service.delete(id);
  res.json(deleteProduct);
});


module.exports = router;
