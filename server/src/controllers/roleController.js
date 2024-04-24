// registerController.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addRole = async (req, res) => {
  try {
    const {name } = req.body;


    // Create a new user in the database
    const role = await prisma.role.create({
      data: {
        name
      },
    });

    // Return a success message or the created user data
    res.status(201).json({ message: 'Role add successfully', role });
  } catch (error) {
    console.error('Error during role registration:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const viewRoles = async(req, res, next) => {
    try {
      const role = await prisma.role.findMany();
      res.status(200).json({ role });
    } catch (e) {
      next(e);
    }
  }
  
module.exports = {
  addRole,
  viewRoles
};
