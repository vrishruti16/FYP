// routes/recipesRoute.js
const express = require('express');
const recipeRouter = express.Router();
const recipesController = require('../controllers/recipesController');

// GET all recipes
recipeRouter.get('/viewall', recipesController.getAllRecipes);

// GET a specific recipe by ID
//recipeRouter.get('/:id', recipesController.getRecipeById);

// POST a new recipe
recipeRouter.post('/add', recipesController.addRecipe);

// PUT (update) a recipe by ID
recipeRouter.put('update/:recipeId', recipesController.updateRecipeById);

// DELETE a recipe by ID
recipeRouter.delete('/delete/:recipeId', recipesController.deleteRecipeById);
recipeRouter.get('/count', recipesController.totalRecipes);

module.exports = recipeRouter;
