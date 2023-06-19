//retrieve user and password
require('dotenv').config();
console.log(process.env.DB_USER); // Should print MongoDB username
console.log(process.env.DB_PASS); // Should print MongoDB password

const express = require('express');

//Connect to MongoDB server
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@beginner.hqgdqg8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



const app = express(); //create express app
const port = 3000; //set port to listen to 3000
const userRoutes = require('./routes/users');

// Body parsing for JSON
app.use(express.json());

//routes
app.use('/users', userRoutes);

//server connection
async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);
