const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const { validate } = require('../middleware/validate');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');

// Public routes (all authenticated users)
router.get('/', optionalAuth, servicesController.getAllServices);
router.get('/:id', optionalAuth, servicesController.getServiceById);

// Admin only routes
router.post('/', authenticate, authorize('admin'), validate('service'), servicesController.createService);
router.put('/:id', authenticate, authorize('admin'), servicesController.updateService);
router.delete('/:id', authenticate, authorize('admin'), servicesController.deleteService);
router.get('/admin/all', authenticate, authorize('admin'), servicesController.getAllServicesAdmin);

module.exports = router;