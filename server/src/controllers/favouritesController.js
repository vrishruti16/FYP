 // controllers/favouritesController.js
 const { PrismaClient } = require('@prisma/client');
 const prisma = new PrismaClient();

// Function to get all favourites
const getAllFavourites = async(req, res) => {
  // Logic to get all favourites
  const { favouritesId } = req.params;
  try {
    const favourites = await prisma.favourites.findMany({
      where: { favouritesId: parseInt(favouritesId) },
    });
    res.status(200).json({ favourites });
  } catch (e) {
    next(e);
  }
};

// Function to get favourites for a specific user
const getFavouritesByUser = async(req, res, next) => {
  const { favouritesId } = req.params;
  try {
    const favourites = await prisma.favourites.findUnique({
      where: { favouritesId: parseInt(favouritesId) },
    });
    if (!favourites) {
      return res.status(404).json({ message: "Favourites not found" });
    }
    res.status(200).json({ favourites });
  } catch (e) {
    next(e);
  }
};

// Function to add a new favourite for a user
const addFavourite = async(req, res, next) => {
  const { favouritesList } = req.body; 

try {
  const favourites = await prisma.favourites.create({
    data: {
      favouritesList
    },
  });

  // Handle success (e.g., send a response)
  res.status(201).json({ success: true, message: 'Favourites created successfully', favourites });
} catch (e) {
  next(e);
}
};

// Function to update favourites for a user
const updateFavourites = async(req, res) => {
  const { favouritesId } = req.body;
  const { favouritesList} = req.body;
  try {
    const updatedFavourites = await prisma.favourites.update({
      where: { favouritesId: parseInt(favouritesId) },
      data: {
        favouritesList
      },
    });
    res.status(200).json({ updatedFavourites, message: "Favourites updated successfully" });
  } catch (e) {
    next(e);
  }
};

// Function to remove a recipe from favourites for a user
const removeRecipeFromFavourite = async(req, res) => {
  const { favouritesId } = req.params;
  try {
    await prisma.favourites.delete({
      where: { favouritesId: parseInt(favouritesId) },
    });
    res.status(200).json({ message: "Favourites deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAllFavourites,
  getFavouritesByUser,
  addFavourite,
  updateFavourites,
  removeRecipeFromFavourite,
};
