const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// User registration route
router.post('/register', async (req, res) => {
  const db = req.app.locals.db;
  const { email, accessCode } = req.body;
  const collection = db.collection('users');
  
  try {
    const hashedAccessCode = await bcrypt.hash(accessCode, 10);
    await collection.insertOne({ email, accessCode: hashedAccessCode });
    // ... send email with access code ...
    res.send('Registration successful');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during registration');
  }
});

module.exports = router;
