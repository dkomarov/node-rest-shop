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
  product = {
    name: req.body.name,
    price: req.body.price
  };
  product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body. price
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Product was created',
        createdProduct: product
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc)
      } else {
        res.status(404).json({ message: 'No valid entry found' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
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