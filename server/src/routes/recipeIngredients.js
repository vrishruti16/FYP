const express = require('express');
const recipeIngredientsRouter = express.Router();
const recipeIngredientsController = require('../controllers/recipeIngredientsController');

// Create a new recipe ingredient
recipeIngredientsRouter.post('/recipeIngredients', recipeIngredientsController.createRecipeIngredient);

// Get all recipe ingredients
recipeIngredientsRouter.get('/recipeIngredients', recipeIngredientsController.getAllRecipeIngredients);

module.exports = recipeIngredientsRouter;
