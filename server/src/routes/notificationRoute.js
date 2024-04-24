// routes/notificationRoute.js
const express = require('express');
const notificationRouter = express.Router();
const notificationsController = require('../controllers/notificationsController');

// GET all notifications
notificationRouter.get('/viewall', notificationsController.getAllNotifications);

// GET a specific notification by ID
notificationRouter.get('/:id', notificationsController.getNotificationById);

// POST a new notification
notificationRouter.post('/add', notificationsController.addNotification);

// PUT (update) a notification by ID
notificationRouter.put('/:id', notificationsController.updateNotificationById);

// DELETE a notification by ID
notificationRouter.delete('/delete/:notificationsId', notificationsController.deleteNotificationById);

module.exports = notificationRouter;
