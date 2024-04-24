const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//const uploadImage = require('../middleware/uploadImage');


// Function to get all recipes
// const getAllRecipes = async (req, res, next) => {
//   try {
//     const recipe = await prisma.recipe.findUnique({
//       where: {
//         id: parseInt(req.params.id) // Assuming the ID is an integer
//       }
//     });
    
//     if (!recipe) {
//       return res.status(404).json({ message: 'Recipe not found' });
//     }
    
//     // Check if the recipe is premium
//     if (recipe.isPremium) {
//       // Redirect to premiumController if it's a premium recipe
//       return res.redirect('/recipe/premium' + req.params.id);
//     }
    
//     // Send recipe details if it's not premium
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching recipe', error });
//   }
// };

const getAllRecipes = async(req, res, next) => {
  try {
    const recipe = await prisma.recipe.findMany();
    res.status(200).json({ recipe });
  } catch (e) {
    next(e);
  }
};

// Function to get a specific recipe by ID
// const getRecipeById = async (req, res, next) => {
//   // Logic to get a specific recipe by ID
//   const { recipeId } = req.params;
//   try {
//     const recipe = await prisma.recipe.findUnique({
//       where: { recipeId: parseInt(recipeId) },
//     });
//     if (!recipe) {
//       return res.status(404).json({ message: "Recipe not found" });
//     }
//     res.status(200).json({ recipe });
//   } catch (e) {
//     next(e);
//   }
// };


// Function to add a new recipe
const addRecipe  = async (req, res, next) => {
  try {
    // const { recipeId, userId, categoryId, title, description, steps, image, ingredientsId, ingredients } = req.body;
    const { userId, categoryId, title, description, steps, image, isPremium, ingredients } = req.body;
    console.log(req.body)

    const recipe = await prisma.recipe.create({
      data: {
        // recipeId,
        userId,
        categoryId,
        title,
        description,
        steps,
        image,
        isPremium
      },
    });

    // Add ingredients to RecipeIngredients table
    const recipeIngredients = ingredients.map(ingredients => ({
      recipeId: recipe.recipeId,
      ingredientsId: ingredients.ingredientsId,
      quantity: ingredients.quantity,
      measurement_unit: ingredients.measurement_unit,
    }));
    console.log(recipeIngredients)
    await prisma.recipeIngredients.createMany({
      data: recipeIngredients,
    });

    res.status(201).json({ message: 'Recipe added successfully', recipe });
  } catch (e) {
    next(e);
  }
};

// const addRecipe = async (req, res) => {
//   try {
//       const { userId, categoryId, ingredients, title, description,  steps, image, isPremium } = req.body;
//       console.log(req.body)

//       // Add the recipe to the database
//       const recipe = await prisma.recipe.create({
//           data: {
//             userId,
//             categoryId,
//             ingredients,
//             title,
//             description,
//             steps,
//             image,
//             isPremium, // Convert isPremium to a boolean
//           },
//       });

//       res.status(201).json({ message: "Recipe added successfully", recipe });
//   } catch (error) {
//       console.error("Error adding recipe:", error);
//       res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// Configure multer storage

// Modify your addRecipe function to use multer middleware
// const addRecipe = async (req, res) => {
//   try {
//     const { userId, categoryId, ingredientsId, title, description,  steps, isPremium } = req.body;

//     // Handle file upload using multer middleware
//     uploadImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         console.error("Multer Error:", err);
//         return res.status(500).json({ message: "Error uploading file" });
//       } else if (err) {
//         console.error("Unknown Error:", err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       // File upload successful, add the recipe to the database
//       const image = req.file ? req.file.path : null; // Get the path of the uploaded image
//       const recipe = await prisma.recipe.create({
//         data: {
//           userId,
//           categoryId,
//           ingredientsId,
//           title,
//           description,
//           steps,
//           image, // Save the path of the uploaded image in the database
//           isPremium, // Convert isPremium to a boolean
//         },
//       });

//       res.status(201).json({ message: "Recipe added successfully", recipe });
//     });
//   } catch (error) {
//     console.error("Error adding recipe:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };




// Function to update a recipe by ID
const updateRecipeById = async(req, res, next) => {
  // Logic to update a recipe by ID
  console.log(req.body)
  const { recipeId } = req.params;
  const { userId, categoryId, ingredientsId, title, description, steps, image } = req.body;
  
  try {
    const updatedRecipe = await prisma.recipe.update({
      where: { recipeId: parseInt(recipeId) },
      data: {
        userId,
        categoryId,
        ingredientsId,
        title,
        description,
        steps,
        image
      },
    });
    res.status(200).json({ updatedRecipe, message: "Recipe updated successfully" });
  } catch (e) {
    next(e);
  }
};

// Function to delete a recipe by ID
const deleteRecipeById = async (req, res, next) => {
  console.log(req.params)
  const { recipeId } = req.params;
  try {
    // Check if the recipe exists
    const existingRecipe = await prisma.recipe.findUnique({
      where: {
        recipeId: parseInt(recipeId),
      },
    });

    if (!existingRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    // Delete the recipe
    await prisma.recipe.delete({
      where: {
        recipeId: parseInt(recipeId),
      },
    });

    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const totalRecipes = async (req, res, next) => {
  try {
    const countRecipes = await prisma.recipe.count();
    res.status(200).json({ countRecipes, message: "Total Recipes" });
  } catch (e) {
    next(e);
  }
};

const getRecipeWithRatingsAndReviews = async (recipeId) => {
  try {
      // Fetch the recipe
      const recipe = await prisma.recipe.findUnique({
          where: { recipeId },
          include: {
              ratings: {
                  include: {
                      user: true // Include user details if needed
                  }
              }
          },
      });

      return recipe;
  } catch (error) {
      console.error("Error fetching recipe with ratings and reviews:", error);
      throw error; // Throw error to be caught by the caller
  }
};


module.exports = {
  getAllRecipes,
  //getRecipeById,
  addRecipe,
  updateRecipeById,
  deleteRecipeById,
  totalRecipes,
  getRecipeWithRatingsAndReviews
};