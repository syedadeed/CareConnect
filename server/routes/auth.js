const express = require('express');
const { 
  registerUser, 
  loginUser, 
  logout,
  getUserProfile
} = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middleware/auth');

const router = express.Router();

// Authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logout);
router.get('/profile', isAuthenticatedUser, getUserProfile);

module.exports = router; 