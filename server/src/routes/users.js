const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { authenticate, authorize } = require('../middleware/auth');

// Admin only routes
router.get('/', authenticate, authorize('admin'), usersController.getAllUsers);
router.get('/doctors', authenticate, usersController.getDoctors);
router.get('/stats', authenticate, authorize('admin'), usersController.getDashboardStats);
router.get('/:id', authenticate, authorize('admin'), usersController.getUserById);
router.put('/:id', authenticate, authorize('admin'), usersController.updateUser);
router.delete('/:id', authenticate, authorize('admin'), usersController.deleteUser);

module.exports = router;