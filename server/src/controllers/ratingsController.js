// controllers/ratingsController.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Function to add ratings and reviews
const addRatingsAndReviews = async (req, res) => {
    try {
        // Implementation for adding ratings and reviews
    } catch (error) {
        console.error("Error adding rating and review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to update ratings and reviews
const updateRatingsAndReviews = async (req, res) => {
    try {
        const ratingId = parseInt(req.params.ratingId);
        const { rating, review } = req.body;

        // Check if the rating exists
        const existingRating = await prisma.ratings.findUnique({
            where: { ratingId },
        });
        if (!existingRating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        // Update the rating and review
        const updatedRating = await prisma.ratings.update({
            where: { ratingId },
            data: {
                rating,
                review,
            },
        });

        res.status(200).json({ message: "Rating and review updated successfully", updatedRating });
    } catch (error) {
        console.error("Error updating rating and review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Function to delete ratings and reviews
const deleteRatingsAndReviews = async (req, res) => {
    try {
        const ratingId = parseInt(req.params.ratingId);

        // Check if the rating exists
        const existingRating = await prisma.ratings.findUnique({
            where: { ratingId },
        });
        if (!existingRating) {
            return res.status(404).json({ message: "Rating not found" });
        }

        // Delete the rating and review
        await prisma.ratings.delete({
            where: { ratingId },
        });

        res.status(200).json({ message: "Rating and review deleted successfully" });
    } catch (error) {
        console.error("Error deleting rating and review:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = {
    addRatingsAndReviews,
    updateRatingsAndReviews,
    deleteRatingsAndReviews,
};