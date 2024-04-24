// adminController.js
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const adminController = {};

    adminController.getDashboardInfo = async (req, res, next) => {
      try {
        // Fetch total users & chefs by roleId
        adminController.totalUsers = async(req, res, next) => {
          const { roleId } = req.params;
          try{
            const CountUsers = await prisma.user.count({
              where: {roleId: parseInt(roleId) },
            });
            res.status(200).json({CountUsers, message: "Total Users"});
          } catch(e){
            next(e);
          }
          
        };
    
        // Fetch total chefs (assuming chefs have a specific role ID)
        // adminController.totalChefs = async(req, res, next) => {
        //   const { roleId } = req.params;
        //   try{
        //     const CountChefs = await prisma.user.count({
        //       where: {roleId: parseInt(roleId) },
        //     });
        //     res.status(200).json({CountChefs, message: "Total Chefs"});
        //   } catch(e){
        //     next(e);
        //   }
          
        // };
    
        // Fetch total recipes
        adminController.totalRecipes = async (req, res, next) => {
          try {
            const countRecipes = await prisma.recipe.count();
            res.status(200).json({ countRecipes, message: "Total Recipes" });
          } catch (e) {
            next(e);
          }
        };
      } catch (error) {
        next(error);
      }
    };

    adminController.getAllChefs = async (req, res, next) => {
      // Logic to fetch all chefs
      const { id } = req.body;
      if (parseInt(id) !== 2) {
          return res.status(403).json({ message: "Unauthorized" }); // Return 403 Forbidden if the ID is not 2
      }
      try {
          const chefs = await prisma.user.findMany(); // Fetch all chefs
          res.status(200).json({ chefs });
      } catch (e) {
          next(e);
      }
    };  



    adminController.updateUserById = async (req, res, next) => {
        // Logic to fetch chef by ID
        const { id, fullname, email, password, bio, image } = req.body;
        try {
        const updatedChef = await prisma.user.update({
            where: { id: parseInt(id) },
            data: {
            fullname: fullname,
            email: email,
            password: password,
            bio: bio,
            image:image
            },
        });
        res.status(200).json({ updatedChef, message: "Profile updated successfully" });
        } catch (e) {
        next(e);
        }
    };

  adminController.deleteUserById = async (req, res, next) => {
    // Logic to fetch chef by ID
    const { id } = req.params;
    try {
      await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json({ message: "Chef deleted successfully" });
    } catch (e) {
      next(e);
    }
  };

  
  // Method to get all recipes
  adminController.getAllRecipes = async (req, res, next) => {
    try {
        const recipe = await prisma.recipe.findUnique({
          where: {
            id: parseInt(req.params.id) // Assuming the ID is an integer
          }
        });
        
        if (!recipe) {
          return res.status(404).json({ message: 'Recipe not found' });
        }
        
        // Check if the recipe is premium
        if (recipe.isPremium) {
          // Redirect to premiumController if it's a premium recipe
          return res.redirect('/recipe/premium' + req.params.id);
        }
        
        // Send recipe details if it's not premium
        res.json(recipe);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching recipe', error });
      }
  };
  
  // Method to update a recipe by ID
  adminController.updateRecipeById = async (req, res, next) => {
    // Logic to update a recipe by ID
    const { recipeId } = req.params;
    const { userId, categoryId, title, description, steps, image } = req.body;
    try {
        const updatedRecipe = await prisma.recipe.update({
        where: { recipeId: parseInt(recipeId) },
        data: {
            userId: userId,
            categoryId: categoryId,
            title: title,
            description: description,
            steps: steps,
            image:image
        },
        });
        res.status(200).json({ updatedRecipe, message: "Recipe updated successfully" });
    } catch (e) {
        next(e);
    }
  };
  
  // Method to delete a recipe by ID
  adminController.deleteRecipeById = async (req, res, next) => {
    console.log(req.params)
    const { recipeid } = req.params;
    try {
        // Check if the recipe exists
        const existingRecipe = await prisma.recipe.findUnique({
        where: {
            recipeId: parseInt(recipeid),
        },
        });

        if (!existingRecipe) {
        return res.status(404).json({ message: 'Recipe not found' });
        }

    // Delete the recipe
    await prisma.recipe.delete({
      where: {
        recipeId: parseInt(recipeid),
      },
    });

    res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        next(error);
    }
};

adminController.updateUserById = async (req, res, next) => {
  // Logic to edit a user
  const { id, fullname, email, password, bio, image } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        fullname: fullname,
        email: email,
        password: password,
        bio: bio,
        image:image
      },
    });
    res.status(200).json({ updatedUser, message: "Profile updated successfully" });
  } catch (e) {
    next(e);
  }
};

adminController.deleteUser = async (req, res, next) => {
  // Logic to delete a user
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (e) {
    next(e);
  }
};

adminController.addCategory = async (req, res, next) => {
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
  
  // Method to get all categories
  adminController.getAllCategories = async (req, res, next) => {
    try {
        const category = await prisma.category.findMany();
        res.status(200).json({ category });
    } catch (e) {
        next(e);
    }
  };
  
  // Method to update a category by ID
  adminController.updateCategoryById = async (req, res, next) => {
    // Logic to update a category by ID
  const { categoryId } = req.params;
  const { name} = req.body;
  try {
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
  
  // Method to delete a category by ID
  adminController.deleteCategoryById = async (req, res, next) => {
    // Logic to delete a category by ID
  const { categoryId } = req.params;
  try {
    await prisma.category.delete({
      where: { categoryId: parseInt(categoryId) },
    });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (e) {
    next(e);
  }
  };

adminController.getPremiumSubscribers = async (req, res, next) => {
  // Logic to fetch premium subscribers
};

adminController.getPayments = async (req, res, next) => {
  // Logic to fetch payment details
};

module.exports =  adminController;