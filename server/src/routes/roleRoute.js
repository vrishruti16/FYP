// routes/roleRoute.js
const express = require('express');
const roleRouter = express.Router();
const roleController = require('../controllers/roleController');

// POST role credentials
roleRouter.post('/add', roleController.addRole);
roleRouter.get('/view', roleController.viewRoles);


module.exports = roleRouter;
