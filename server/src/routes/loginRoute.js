// routes/loginRoute.js
const express = require('express');
const router = express.Router();
const {login, getUserProfile} = require('../controllers/loginController');

// POST login credentials
router.post('/login', login);
router.get('/profile', getUserProfile);

module.exports = router;
