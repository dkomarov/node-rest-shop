const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(
  'mongodb+srv://denis:' + 
  process.env.MONGO_ATLAS_PW + 
  '@cluster0-cxz4x.mongodb.net/test?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true,     
    useNewUrlParser: true
  });

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')) // allow public access to uploads folder

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// response to add CORS headers to prevent CORS errors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') // allow access from any origin
  res.header(
    'Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);

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