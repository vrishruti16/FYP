// adminRoutes.js
const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controllers/adminController');
//const recipeRouter = express.Router();
const recipesController = require('../controllers/recipesController');
//const categoryRouter = express.Router();
const categoriesController = require('../controllers/categoriesController');
const registerController = require('../controllers/registerController');

// Routes for managing chefs, users, recipes, categories
adminRouter.get('/user/count/:roleId', registerController.totalUsers);
// adminRouter.get('/user/count/:roleId', registerController.totalChefs);
adminRouter.get('/recipes/count', recipesController.totalRecipes);
adminRouter.get('/user/view', registerController.viewUsers);
adminRouter.put('/user/update/:id', registerController.updateUserById);
adminRouter.delete('/user/delete/:id', adminController.deleteUserById);
adminRouter.put('/user/update/:id', registerController.updateUserById)
adminRouter.delete('/user/delete/:id', registerController.deleteUserById);
adminRouter.get('/recipes/viewall', recipesController.getAllRecipes);
adminRouter.put('recipes/update/:recipeId', recipesController.updateRecipeById);
adminRouter.delete('/recipes/delete/:recipeId', recipesController.deleteRecipeById);
adminRouter.get('/category/viewall', categoriesController.getAllCategories);
adminRouter.post('/category/add', categoriesController.addCategory);
adminRouter.put('/category/update/:categoryId', categoriesController.updateCategoryById);
adminRouter.delete('/delete/:categoryId', categoriesController.deleteCategoryById);

module.exports = adminRouter;
