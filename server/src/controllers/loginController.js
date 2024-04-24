// controllers/loginController.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const { PrismaClient } = require('@prisma/client');

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));

// let Login = new PrismaClient();

// Login =  async (req, res) => {
//     const { username, password } = req.body;

//     if (username && password) {
//         try {
//             const user = await prisma.user.findUnique({
//                 where: { username },
//             });

//             if (user) {
//                 const match = await bcrypt.compare(password, user.password);

//                 if (match) {
//                     req.session.userId = user.id;
//                     res.send('Login successful');
//                 } else {
//                     res.send('Incorrect password');
//                 }
//             } else {
//                 res.send('User not found');
//             }
//         } catch (error) {
//             console.error('Error querying the database:', error);
//             res.status(500).send('Internal Server Error');
//         }
//     } else {
//         res.send('Please enter both username and password');
//     }
// };

// module.exports = {
//     Login,
//   };

// loginController.js
// const bcrypt = require('bcrypt');
// const session = require('express-session');
// const express = require('express');
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

// const login = async(req,res) =>{
//     if (email && password) {
//         try {
//             const user = await prisma.user.findUnique({
//                 where: { email },
//             });

//             if (user) {
//                 const match = await bcrypt.compare(password, user.password);

//                 if (match) {
//                     req.session.email = email;
//                     res.send('Login successful');
//                 } else {
//                     res.send('Incorrect password');
//                 }
//             } else {
//                 res.send('User not found');
//             }
//         } catch (error) {
//             console.error('Error querying the database:', error);
//             res.status(500).send('Internal Server Error');
//         }
//     } else {
//         res.send('Please enter both username and password');
//     }
// }

// module.exports = {
//     login,
// };

//LoginController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const login = async (req, res) => {

  
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if user exists
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    // Passwords match, user is authenticated
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '5mins' } // Token expires in 1 hour, adjust as needed
    );

    // Send token along with user data
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { email: user.email, fullname: user.fullname, role: user.roleId }
    });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const authorizationHeader = req.headers.authorization;
    
    // Check if Authorization header is present
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized - Missing Authorization header' });
    }

    // Split the Authorization header to extract the token
    const token = authorizationHeader.split(' ')[1]; // Assuming you're using Bearer token authentication
    
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Assuming you're using JWT for authentication
    
    // Fetch user details based on decoded token
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send user details in response
    res.json(user);
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};


module.exports = {
  login,
  getUserProfile
};