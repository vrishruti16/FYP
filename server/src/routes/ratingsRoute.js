// routes/ratingsRoute.js
const express = require('express');
const router = express.Router();
const { addRatingsAndReviews, updateRatingsAndReviews, deleteRatingsAndReviews } = require('../controllers/ratingsController');
const recipesController = require('../controllers/recipesController');

// Route to handle submitting ratings and reviews for a recipe
router.post('/recipes/:recipeId/ratings', addRatingsAndReviews);

// Route to handle updating ratings and reviews for a recipe
router.put('/recipes/:recipeId/ratings/:ratingId', updateRatingsAndReviews);

// Route to handle deleting ratings and reviews for a recipe
router.delete('/recipes/:recipeId/ratings/:ratingId', deleteRatingsAndReviews);

// Route to fetch a single recipe along with its ratings and reviews
router.get('/recipes/:recipeId', async (req, res) => {
    const { recipeId } = req.params;

    try {
        const recipeWithRatingsAndReviews = await recipesController.getRecipeWithRatingsAndReviews(recipeId);
        res.status(200).json(recipeWithRatingsAndReviews);
    } catch (error) {
        console.error("Error fetching recipe with ratings and reviews:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    });

module.exports = router;
