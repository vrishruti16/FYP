//chefRoute.js
const express = require('express');
const chefRouter = express.Router();
const chefController = require('../controllers/chefController');
//const recipeRouter = express.Router();
//const recipesController = require('../controllers/recipesController');

// Route to get dashboard data for a chef
//chefRouter.get('/:id/dashboard', chefController.getDashboardData);
chefRouter.get('/view/:userId', chefController.getAllRecipes);


module.exports = chefRouter;
