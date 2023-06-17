require('dotenv').config(); //retrieve user and password

const express = require('express');
const userRoutes = require('./routes/users');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express(); //create express app
const port = 3000; //set port to listen to 3000

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
