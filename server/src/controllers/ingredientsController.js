// controllers/ingredientsController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Function to get all ingredients
const getAllIngredients = async(req, res, next) => {
  // Logic to get all ingredients
  try {
    const ingredients = await prisma.ingredients.findMany();
    res.status(200).json({ ingredients });
  } catch (e) {
    next(e);
  }
};

// Function to get a specific ingredient by ID
const getIngredientById = async(req, res, next) => {
  // Logic to get a specific ingredient by ID
  const { ingredientsId } = req.params;
  try {
    const ingredients = await prisma.ingredients.findMany({
      
      where: { ingredientsId: parseInt(ingredientsId) },
    });
    if (!ingredients) {
      return res.status(404).json({ message: "Ingredient not found" });
    }
    res.status(200).json({ ingredients });
  } catch (e) {
    next(e);
  }
};

// Function to add a new ingredient
const addIngredient = async(req, res, next) => {
  // Logic to add a new ingredient
  const { name} = req.body; 

try {
  const ingredients = await prisma.ingredients.create({
    data: {
      name,
    },
  });

  // Handle success (e.g., send a response)
  res.status(201).json({ success: true, message: 'Ingredient created successfully', ingredients });
} catch (e) {
  next(e);
}

};


// Function to update an ingredient by ID
const updateIngredientById = async(req, res, next) => {
  // Logic to update an ingredient by ID
  const { ingredientsId } = req.params;
  const { name} = req.body;
  try {
    const updatedIngredient = await prisma.ingredients.update({
      where: { ingredientsId: parseInt(ingredientsId) },
      data: {
        name,
      },
    });
    res.status(200).json({ updatedIngredient, message: "Ingredient updated successfully" });
  } catch (e) {
    next(e);
  }
};

// Function to delete an ingredient by ID
const deleteIngredientById = async(req, res, next) => {
  // Logic to delete an ingredient by ID
  const { ingredientsId } = req.params;
  try {
    await prisma.ingredients.delete({
      where: { ingredientsId: parseInt(ingredientsId) },
    });
    res.status(200).json({ message: "Ingredient deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllIngredients,
  getIngredientById,
  addIngredient,
  updateIngredientById,
  deleteIngredientById,
};
