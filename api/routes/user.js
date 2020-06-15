const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')
const { response } = require('../../app');

router.post('/signup', userController.user_sign_up);

router.post('/login', userController.user_login);

router.delete('/:userId', checkAuth, userController.user_delete);


module.exports = router; // export routes to all files