const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dhruvarayasam:<db_password>@media-tracker-cluster.wegsn.mongodb.net/?retryWrites=true&w=majority&appName=media-tracker-cluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Mongo connection successful.");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

// Middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: 'Here is some data!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
