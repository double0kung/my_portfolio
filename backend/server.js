// Import the required modules
require('dotenv').config(); 
const express = require('express');
const userRoutes = require('./routes/users');
const loginRoutes = require('./routes/login'); // Make sure to have this file
const mongoose = require('mongoose'); 

const app = express(); 
const port = process.env.PORT || 3000; 

// Middleware for parsing JSON bodies from HTTP requests
app.use(express.json());

// Use the routes
app.use('/users', userRoutes);
app.use('/login', loginRoutes); // Make sure to have this route

// Connect to MongoDB and start the server
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@beginner.hqgdqg8.mongodb.net/?retryWrites=true&w=majority`, 
{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
  });
})
.catch(err => console.log(err));
