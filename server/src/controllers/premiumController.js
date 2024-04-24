// premiumController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const premiumController = {
  // Get a list of premium recipes
  getPremiumRecipes: async (req, res) => {
    try {
      const premiumRecipes = await prisma.recipe.findMany({
        where: { isPremium: true }
      });
      res.json(premiumRecipes);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching premium recipes', error });
    }
  },

  // Get a single premium recipe by ID
  getPremiumRecipeById: async (req, res) => {
    try {
        // Check if the user has paid for accessing premium content
        const hasPaid = req.user && req.user.hasPaid; // Assuming you have a user object with payment information
        
        if (!hasPaid) {
          // If the user hasn't paid, return a response indicating that payment is required
          return res.status(402).json({ message: 'Payment required for accessing premium content' });
        }
    
        // If the user has paid, proceed to fetch the premium recipe
        const recipe = await prisma.recipe.findFirst({
          where: { id: parseInt(req.params.id), isPremium: true }
        });
        
        if (recipe) {
          // If the recipe exists, send it as a JSON response
          res.json(recipe);
        } else {
          // If the recipe is not found, return a 404 Not Found response
          res.status(404).json({ message: 'Premium recipe not found' });
        }
      } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ message: 'Error fetching the premium recipe', error });
      }
  }
};

module.exports = premiumController;
