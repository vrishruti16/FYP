// roleAuth.js
const express = require('express');
const rolesRouter = express.Router();
const roleAuthorization = require('../middleware/roleAuthorization');

// Import your route handlers/controllers
const { chefController, adminController, userController } = require('./controllers');

// Routes accessible only to chefs
rolesRouter.get('/chef/dashboard', roleAuthorization('chef'), chefController.getResource);

// Routes accessible only to admins
rolesRouter.get('/admin/dashboard', roleAuthorization('admin'), adminController.getResource);

// Routes accessible to all users
rolesRouter.get('/user', roleAuthorization('user'), userController.getResource);

module.exports = rolesRouter;
