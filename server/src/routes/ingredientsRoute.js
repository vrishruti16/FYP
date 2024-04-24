// routes/ingredients.js
const express = require('express');
const ingredientsRouter = express.Router();
const ingredientsController = require('../controllers/ingredientsController');

// GET all ingredients
ingredientsRouter.get('/viewall', ingredientsController.getAllIngredients);

// GET a specific ingredient by ID
ingredientsRouter.get('/:id', ingredientsController.getIngredientById);

// POST a new ingredient
ingredientsRouter.post('/add', ingredientsController.addIngredient);

// PUT (update) an ingredient by ID
ingredientsRouter.put('update/:id', ingredientsController.updateIngredientById);

// DELETE an ingredient by ID
ingredientsRouter.delete('/delete/:ingredientsId', ingredientsController.deleteIngredientById);

module.exports = ingredientsRouter;
