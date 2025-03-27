const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Check if user is authenticated
exports.isAuthenticatedUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login to access this resource'
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Read user file
    const usersFile = path.join(__dirname, '../data/users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    
    // Find user
    const user = usersData.find(user => user.id === decoded.id);
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }
};

// Authorization roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user.role}) is not allowed to access this resource`
      });
    }
    next();
  };
}; 