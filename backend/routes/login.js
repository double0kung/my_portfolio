const express = require('express');
const User = require('../models/User'); // path to User model
const router = express.Router();

// User login route
router.post('/', async (req, res) => {
  const { email, accessCode } = req.body;
  
  try {
    // Try to find a user with the provided email in the database
    const user = await User.findOne({ email });

    // If a user is found and the provided access code matches the hashed access code
    // stored in the user's document
    if (user && await user.isValidAccessCode(accessCode)) {
      // If the access code hasn't expired
      if (user.expiresAt > new Date()) {
        // Respond with a success message
        res.send('Login successful');
      } else {
        // If the access code has expired, respond with an error message
        res.status(401).send('Access code expired');
      }
    } else {
      // If the email or access code is invalid, respond with an error message
      res.status(401).send('Invalid email or access code');
    }
  } catch (error) {
    // If an error occurs during the login process, log the error and respond with 
    // a server error message
    console.error(error);
    res.status(500).send('Error during login');
  }
});

module.exports = router;

