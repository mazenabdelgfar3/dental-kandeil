const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, notificationsController.getMyNotifications);
router.put('/read-all', authenticate, notificationsController.markAllAsRead);
router.put('/:id/read', authenticate, notificationsController.markAsRead);
router.delete('/:id', authenticate, notificationsController.deleteNotification);

router.post('/admin', authenticate, authorize('admin'), notificationsController.createNotification);
router.get('/admin/all', authenticate, authorize('admin'), notificationsController.getAllNotifications);

module.exports = router;