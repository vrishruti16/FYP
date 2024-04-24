// roleAuthorization.js
const roleAuthorization = (requiredRole) => {
    return (req, res, next) => {
      // Assuming user role is stored in req.user.role
      const userRole = req.user.role;
  
      // Check if the user has the required role
      if (userRole !== requiredRole) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      // User has the required role, proceed to the next middleware
      next();
    };
  };
  
  module.exports = {
    roleAuthorization
  }