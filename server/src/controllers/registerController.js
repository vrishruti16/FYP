// registerController.js
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { request } = require('express');
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  try {
    const {fullname, email, password, roleId } = req.body;
    console.log(req.body)

    // Hash the password before storing it in the database
     const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const user = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        roleId,
      },
    });


    // Return a success message or the created user data
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUserById = async(req, res, next) => {
  // Logic to update a user by ID

  const { id } = req.params;
  const { fullname} = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        fullname
        // email,
        // password
        //bio: bio
        // image:image
      },
    });
    res.status(200).json({ updatedUser, message: "Profile updated successfully" });
  }
  catch (e) {
    next(e);
  }
};

const viewUsers = async(req, res, next) => {
  try {
    const register = await prisma.user.findMany();
    res.status(200).json({ register });
  } catch (e) {
    next(e);
  }
}

const deleteUserById = async(req, res, next) => {
  // Logic to delete a recipe by ID
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

const totalUsers = async(req, res, next) => {
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


module.exports = {
  registerUser,
  viewUsers,
  updateUserById,
  deleteUserById,
  totalUsers,
  //totalChefs
};