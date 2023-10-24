const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.MONGO_URI;
const uri = "mongodb+srv://ntfseo:ntfseopass@nftseo.e1zbadu.mongodb.net/?retryWrites=true&w=majority";



const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
/* Seo site collection */
const websiteCollections = client.db("seoWebsite").collection("websiteList");
const packageCollections = client.db("seoWebsite").collection("packages");
const orderCollections = client.db("seoWebsite").collection("orders");


/* Seo site post */


app.post("/add-website", async (req, res) => {
  const websiteCheck = req.body;
  const result = await websiteCollections.insertOne(websiteCheck);
  res.send(result);
});

app.get("/website", async (req, res) => {
  const query = {};
  const cursor = websiteCollections.find(query);
  const websiteCheck = await cursor.toArray();
  res.send(websiteCheck);
});

app.get('/website/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const website = await websiteCollections.findOne(query);
  res.send(website)
});

app.put("/edit-website/:id", async (req, res) => {
  const id = req.params.id;
  const edit = req.body;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      email: edit.email,
      website: edit.website,
      metaDescription: edit.metaDescription,
      mobileFriendly: edit.mobileFriendly,
      pageLoadSpeed: edit.pageLoadSpeed,
      ssl: edit.ssl,
      sitemap: edit.sitemap,
      brokenLinks: edit.brokenLinks,
      ux: edit.ux,
      backlinks: edit.backlinks,
      img: edit.img,
    },
  };

  const result = await websiteCollections.updateOne(
    filter,
    updatedDoc,
    options
  );
  res.send(result);
});

  /* Packages */
  app.post("/add-package", async (req, res) => {
    const package = req.body;
    const result = await packageCollections.insertOne(package);
    res.send(result);
  });
  

  app.get("/packages", async (req, res) => {
    const query = {};
    const cursor = packageCollections.find(query);
    const packages = await cursor.toArray();
    res.send(packages);
  });

  app.get('/package/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const package = await packageCollections.findOne(query);
    res.send(package)
  });

/*  */

  /* Order */
  app.post("/new-order", async (req, res) => {
    const order = req.body;
    const result = await orderCollections.insertOne(order);
    res.send(result);
  });
  

  app.get("/orders", async (req, res) => {
    const query = {};
    const cursor = orderCollections.find(query);
    const orders = await cursor.toArray();
    res.send(orders);
  });

  app.get('/order/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const order = await orderCollections.findOne(query);
    res.send(order)
  });

  app.put("/order/:id", async (req, res) => {
    const id = req.params.id;
    const updateOrder = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        paymentStatus: updateOrder.paymentStatus,
        orderStatus: updateOrder.orderStatus,
      
      },
    };
  
    const result = await orderCollections.updateOne(
      filter,
      updatedDoc,
      options
    );
    res.send(result);
  });



/*  */

    
    
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("eCommerce Website is Live Now");
});
app.listen(port, () => {
  console.log(`eCommerce Website is Live Now${port}`);
});
