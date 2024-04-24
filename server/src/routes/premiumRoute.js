// premiumRoutes.js

const express = require('express');
const premiumRouter = express.Router();
const premiumController = require('../controllers/premiumController');
const premiumMiddleware = require('../middleware/premiumMiddleware');

// Route to access premium page
premiumRouter.get('/checkPremium', premiumMiddleware.checkPremiumAccess);
premiumRouter.get('/viewPremium',  premiumController.getPremiumRecipes);

module.exports = premiumRouter;
