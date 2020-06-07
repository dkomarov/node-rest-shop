const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product_model')

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
    if (docs.length >= 0) {
      console.log(docs)
      res.status(200).json(docs)
    } else {
      res.status(404).json({
        message: "No products found."
      })
    }
  })
  .catch(err => {
    console.log(docs);
    res.status(200).json(docs);
  })
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