// controllers/categoriesController.js
const { PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

// Function to get all categories
const getAllCategories = async(req, res, next) => {
  try {
    const category = await prisma.category.findMany();
    res.status(200).json({ category });
  } catch (e) {
    next(e);
  }
};

// Function to get a specific category by ID
const getCategoryById = async (req, res, next) => {
  // Logic to get a specific recipe by ID
  const { categoryId } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { categoryId: parseInt(categoryId) },
    });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ category });
  } catch (e) {
    next(e);
  }
};

// Function to add a new category
const addCategory = async(req, res) => {
  // Logic to add a new category
  try {
    const {name } = req.body;

    // Create a new user in the database
    const category = await prisma.category.create({
      data: {
        name
      },
    });

    // Return a success message or the created user data
    res.status(201).json({ message: 'Category add successfully', category });
  } catch (error) {
    console.error('Error during category added:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to update a category by ID
const updateCategoryById = async(req, res, next) => {
  // Logic to update a category by ID
  
  try {

    const { categoryId } = req.params;
    const { name} = req.body;

    const updatedCategory = await prisma.category.update({
      where: { categoryId: parseInt(categoryId) },
      data: {
        name
      },
    });
    res.status(200).json({ updatedCategory, message: "Category updated successfully" });
  } catch (e) {
    next(e);
  }
};

// Function to delete a category by ID
const deleteCategoryById = async(req, res, next) => {
  // Logic to delete a category by ID
  const { categoryId } = req.params;
  try {
    await prisma.category.delete({
      where: 
      { categoryId: parseInt(categoryId) },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategoryById,
  deleteCategoryById,
};
