// //chefController.js
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// // Controller function to get dashboard data for a chef

// // Fetch chef's data
// const chef = await prisma.user.findFirst({
//     where: { id: chefId, roleId: 1 }
// });

// if (!chef) {
//     return res.status(404).json({ message: 'Chef not found' });
// }

// const getAllRecipes = async (req, res, next) =>{
//     const {id} = req.body;
//     try{
//         const countRecipes = await prisma.recipe.count({
//             where: {id: parseInt(id)},
//         });

//         res.status(200).json({countRecipes, message: "Total Recipes"});
//     } catch(e){
//         next(e);
//     }
// };

// const getAllSaves = async (req, res, next) =>{
//     const {recipeId} = req.body;
//     console.log(req.body)
//     try {
//         const userSavedRecipesCount = await prisma.recipe.count({
//           where: {
//             users: {
//               some: {
//                 id: userId, // Assuming you have the ID of the user whose saved recipes you want to count
//               },
//             },
//           },
//         });
//         res.status(200).json({userSavedRecipesCount, message: "Total Saves"});
//         // userSavedRecipesCount now contains the number of recipes saved by the specified user
//       } catch (error) {
//         // Handle errors
//       }
      
      
// }

// module.exports = {
//     getAllRecipes,
//     getAllSaves
// }