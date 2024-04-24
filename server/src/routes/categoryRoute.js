// routes/categories.js
const express = require('express');
const categoryRouter = express.Router();
const categoriesController = require('../controllers/categoriesController');

// GET all categories
categoryRouter.get('/viewall', categoriesController.getAllCategories);

// GET a specific category by ID
categoryRouter.get('/:id', categoriesController.getCategoryById);

// POST a new category
categoryRouter.post('/add', categoriesController.addCategory);

// PUT (update) a category by ID
categoryRouter.put('/update/:categoryId', categoriesController.updateCategoryById);

// DELETE a category by ID
categoryRouter.delete('/delete/:categoryId', categoriesController.deleteCategoryById);

module.exports = categoryRouter;
