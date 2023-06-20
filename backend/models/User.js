// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  accessCode: { type: String, required: true },
  expiresAt: { type: Date, required: true },
});

// The method isValidAccessCode is an asynchronous function that takes an access code
// as an argument. It uses bcrypt's compare function to check if the provided access code
// matches the hashed access code stored in the database for the user.
// bcrypt.compare returns a promise that resolves to a boolean indicating whether the 
// provided access code matches the stored hashed access code.
UserSchema.methods.isValidAccessCode = async function(accessCode) {
  return await bcrypt.compare(accessCode, this.accessCode);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
