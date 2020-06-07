const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product_model')

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Handling GET requests to /products'
  });
});

router.post('/', (req, res, next) => {
  res.status(201).json({
    message: 'Product was created'
  });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === 'special') {
    res.status(200).json({
      message: 'You discovered the special ID',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'You passed an id',
      id: id
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
    res.status(200).json({
      message: 'Updated product.',
      id: id
    });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
    res.status(200).json({
      message: 'Deleted product.',
      id: id
    });
});


module.exports = router; // export routes to all files