// controllers/notificationController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all notifications
const getAllNotifications = async(req, res, next) => {
  // Logic to get all notifications
  try {
    const notifications = await prisma.notifications.findMany();
    res.status(200).json({ notifications });
  } catch (e) {
    next(e);
  }
};

// Function to get a specific notification by ID
const getNotificationById = async(req, res, next) => {
const { notificationsId } = req.params;
  try {
    const notifications = await prisma.notifications.findUnique({
      where: { notificationsId: parseInt(notificationsId) },
    });
    if (!notifications) {
      return res.status(404).json({ message: "Notifications not found" });
    }
    res.status(200).json({ notifications });
  } catch (e) {
    next(e);
  }
};

// Function to add a new notification
const addNotification = async(req, res, next) => {
  const {message, userId} = req.body;
  console.log(req.body)
  try{
    const notifications = await prisma.notifications.create ({
      data: {
        message: message,
        userId: userId,
      }
    }
    );
    //Handle success (e.g., send a response)
    res.status(201).json({ success: true, message: 'Notifications added successfully', notifications });
  }
  catch(error){
    next(error);
  }
};

// Function to update a notification by ID
const updateNotificationById = (req, res) => {
  const notificationsId = parseInt(req.params.id);
  const { message } = req.body;
  const notifications = notifications.find(n => n.id === notificationsId);

  if (notifications) {
    notifications.message = message;
    res.json(notifications);
  } else {
    res.status(404).json({ error: 'Notification not found' });
  }
};

// Function to delete a notification by ID
const deleteNotificationById = async(req, res, next) => {
  const { notificationsId } = req.params;
  try {
    await prisma.notifications.delete({
      where: { notificationsId: parseInt(notificationsId) },
    });
    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  addNotification,
  updateNotificationById,
  deleteNotificationById,
};
