const jwt = require('jsonwebtoken');



// Generate JWT token and set in cookie
const sendToken = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  // Cookie options
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  // Development vs production cookie settings
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Send response with token in cookie and body
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
};

module.exports = sendToken; 