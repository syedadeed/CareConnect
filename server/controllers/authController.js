const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const sendToken = require('../utils/jwtToken');

// File paths
const usersFilePath = path.join(__dirname, '../data/users.json');

// Helper to read users data
const getUsersData = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, '[]', 'utf8');
      return [];
    }
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

// Helper to write users data
const writeUsersData = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing users file:', error);
    return false;
  }
};

// Register a user
exports.registerUser = async (req, res, next) => {
  try {
    console.log('Registration request received. Headers:', req.headers);
    console.log('Request body:', req.body);
    
    // Check if we have a proper request body
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log('Empty or missing request body');
      return res.status(400).json({
        success: false,
        message: 'Empty or missing request body'
      });
    }
    
    const { name, email, password, role = 'patient' } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log('Validation failed: Missing required fields', { name, email, password: password ? '[REDACTED]' : undefined });
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password'
      });
    }

    console.log('Registration data validated for email:', email);
    
    // Get existing users
    const users = getUsersData();

    // Check if user already exists
    if (users.find(user => user.email === email)) {
      console.log('User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date().toISOString()
    };

    // Add to users array
    users.push(newUser);

    // Save to file
    if (!writeUsersData(users)) {
      console.log('Error saving user data');
      return res.status(500).json({
        success: false,
        message: 'Error saving user data'
      });
    }

    console.log('User registered successfully:', newUser.id);
    
    // Send JWT token
    sendToken(newUser, 201, res);
  } catch (error) {
    console.error('Registration error:', error);
    next(error);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Get users
    const users = getUsersData();

    // Find user
    const user = users.find(user => user.email === email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Send JWT token
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

// Logout user
exports.logout = (req, res, next) => {
  try {
    res.cookie('token', null, { 
      expires: new Date(Date.now()),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Get currently logged in user details
exports.getUserProfile = (req, res, next) => {
  try {
    // User is already available from auth middleware
    const user = req.user;

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
}; 