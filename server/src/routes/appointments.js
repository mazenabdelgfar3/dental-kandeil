const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');
const { validate } = require('../middleware/validate');
const { authenticate, authorize, optionalAuth } = require('../middleware/auth');

// Patient routes (must be authenticated)
router.get('/my', authenticate, appointmentsController.getMyAppointments);
router.post('/', authenticate, validate('appointment'), appointmentsController.createAppointment);
router.get('/:id', authenticate, appointmentsController.getAppointmentById);
router.put('/:id/cancel', authenticate, appointmentsController.cancelAppointment);

// Doctor/Admin routes
router.get('/doctor/:doctorId', authenticate, authorize('doctor', 'admin'), appointmentsController.getDoctorAppointments);
router.get('/doctor/:doctorId/slots', appointmentsController.getAvailableSlots);

// Admin routes
router.get('/admin/all', authenticate, authorize('admin'), appointmentsController.getAllAppointments);
router.put('/:id/status', authenticate, authorize('admin', 'doctor'), appointmentsController.updateAppointmentStatus);

module.exports = router;