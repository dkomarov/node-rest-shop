const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product_model')

router.get('/', (req, res, next) => {
  Product.find()
    .select('name price _id')
    .exec()
    .then(docs => {
    if (docs.length >= 0) {
      const response = {
        count: docs.length, 
        products: docs.map( doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/products/' + doc._id
            }
          }
        })
      }
      // console.log(docs)

      res.status(200).json(response)
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
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + result._id
          }
        }
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
    .select('name price _id')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + id
          }
        });
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
  const props = req.body;
  Product.updateOne({ _id: id}, props) // dynamic updates
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Product Updated',
        request: {
          type: 'PATCH',
          url: 'http://localhost:3000/products/' + id
        }
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    }); 
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Product deleted. To create a new one, send the following:',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products',
          body: { name: 'Name', price: '#'}
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router; // export routes to all files