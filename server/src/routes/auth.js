const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validate');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register', validate('register'), authController.register);
router.post('/login', validate('login'), authController.login);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, validate('updateProfile'), authController.updateProfile);
router.get('/role', authenticate, authController.getUserRole);
router.post('/logout', authenticate, authController.logout);

module.exports = router;