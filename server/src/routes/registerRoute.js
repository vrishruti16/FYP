// registerRoute.js
const express = require('express');
const router = express.Router();
const { registerUser, viewUsers, updateUserById, deleteUserById, totalUsers} = require('../controllers/registerController');
//const uploadFile = require('../middleware/uploadImage');

// Define the route for user registration
router.post('/register', registerUser);
router.get('/view', viewUsers);
router.put('/update/:id',updateUserById );

// DELETE a recipe by ID
router.delete('/delete/:id', deleteUserById);
router.get('/count/:roleId', totalUsers);
//router.get('/count/:roleId', totalChefs);
module.exports = router;


