// routes/favouritesRoute.js
const express = require('express');
const router = express.Router();
const favouritesController = require('../controllers/favouritesController');

// GET all favourites
router.get('/', favouritesController.getAllFavourites);

// GET favourites for a specific user
router.get('/user/:userId', favouritesController.getFavouritesByUser);

// POST a new favourite for a user
router.post('/', favouritesController.addFavourite);

// PUT (update) favourites for a user
router.put('/user/:userId', favouritesController.updateFavourites);

// REMOVE a recipe from favourites for a user
router.remove('/user/:userId/recipe/:recipeId', favouritesController.removeRecipeFromFavourite);

module.exports = router;
