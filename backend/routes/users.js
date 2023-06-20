const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User'); // Import the User model

// User registration route
router.post('/register', async (req, res) => {

  const { email, accessCode } = req.body;

  // Log the values of email and accessCode
  console.log('email:', email);
  console.log('accessCode:', accessCode);

  // Hash the access code
  try {
    const hashedAccessCode = await bcrypt.hash(accessCode, 12);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 15);

    // Create a new user
    const user = new User({
      email: email,
      accessCode: hashedAccessCode,
      expiresAt: expiresAt
    });

    // Save the user to the database
    await user.save();

    // ... send email with access code ...
    res.send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during registration');
  }
});

module.exports = router;
