const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

mongoose.connect(
  'mongodb+srv://denis:' + 
  process.env.MONGO_ATLAS_PW + 
  '@cluster0-cxz4x.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,     
    useNewUrlParser: true
  });
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// throw error for any other route
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// throw errors for any other operations
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;