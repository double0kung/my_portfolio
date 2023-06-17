require('dotenv').config(); //retrieve user and password
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const app = express();
const port = 3000;

async function run() {
  try {
    // Connect the client to the server
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");

    const db = client.db('myFirstDatabase');

    // Example route
    app.get('/', (req, res) => {
      res.send('Hello World!')
    });

    // Example route to insert a document into a MongoDB collection
    app.post('/users', async (req, res) => {
      const newUser = { /* User data here */ };
      const collection = db.collection('users');
      try {
        const result = await collection.insertOne(newUser);
        console.log(result);
        res.send('User inserted');
      } catch (error) {
        console.error(error);
        res.status(500).send('Error inserting user');
      }
    });

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`)
    });

  } catch (error) {
    console.error(error);
  }
}

run().catch(console.dir);
