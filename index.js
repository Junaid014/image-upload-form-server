const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.erlqeyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    // collection
    const productCollection = client.db("image_uplod_form").collection("products");

    app.get('/products', async (req, res) => {
  try {
    const result = await productCollection.find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send({ message: 'Failed to fetch products' });
  }
});

    app.post('/products', async (req, res) => {
  try {
    const product = req.body;
    const result = await productCollection.insertOne(product);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to save product' });
  }
});




    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('image upload  server is running')
})


app.listen(port, () => {
  console.log(`image upload  server is running ${port}`);
})