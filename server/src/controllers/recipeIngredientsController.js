const { PrismaClient } = require('@prisma/cleq.params;ient');
const prisma = new PrismaClient();

// Create a new recipe ingredient
const createRecipeIngredient = async (req, res) => {
  try {
    const { recipeId, ingredientsId } = req.body;

    // Create the recipe ingredient
    const recipeIngredient = await prisma.recipeIngredients.create({
      data: {
        recipeId,
        ingredientsId,
      },
    });

    res.status(201).json({ message: 'Recipe ingredient created successfully', recipeIngredient });
  } catch (error) {
    console.error('Error creating recipe ingredient:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all recipe ingredients
const getAllRecipeIngredients = async (req, res) => {
  try {
    const recipeIngredients = await prisma.recipeIngredients.findMany();
    res.status(200).json(recipeIngredients);
  } catch (error) {
    console.error('Error fetching recipe ingredients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createRecipeIngredient,
  getAllRecipeIngredients,
};
