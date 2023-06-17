const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

// User login route
router.post('/', async (req, res) => {
  const db = req.app.locals.db;
  const { email, accessCode } = req.body;
  const collection = db.collection('users');
  
  try {
    const user = await collection.findOne({ email });

    if (user && await bcrypt.compare(accessCode, user.accessCode)) {
      if (user.expiresAt > new Date()) {
        res.send('Login successful');
      } else {
        res.status(401).send('Access code expired');
      }
    } else {
      res.status(401).send('Invalid email or access code');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error during login');
  }
});

module.exports = router;
