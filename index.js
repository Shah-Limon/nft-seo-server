const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.MONGO_URI;
const uri =
  "mongodb+srv://ntfseo:ntfseopass@nftseo.e1zbadu.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    /* Seo site collection */
    const websiteCollections = client
      .db("seoWebsite")
      .collection("websiteList");
    const packageCollections = client.db("seoWebsite").collection("packages");
    const orderCollections = client.db("seoWebsite").collection("orders");
    const paypalEmailCollections = client.db("seoWebsite").collection("email");
    const GeneralCollections = client.db("seoWebsite").collection("general");

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

    app.get("/website/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const website = await websiteCollections.findOne(query);
      res.send(website);
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

    app.get("/package/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const package = await packageCollections.findOne(query);
      res.send(package);
    });

    app.put("/edit-package/:id", async (req, res) => {
      const id = req.params.id;
      const package = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          packageName: package.packageName,
          price: package.price,
          img: package.img,
          featureOne: package.featureOne,
          featureTwo: package.featureTwo,
          featureThree: package.featureThree,
          featureFour: package.featureFour,
          featureFive: package.featureFive,
          featureSix: package.featureSix,
          featureSeven: package.featureSeven,
          featureEight: package.featureEight,
          featureNine: package.featureNine,
          featureTen: package.featureTen,
        },
      };

      const result = await packageCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
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

    app.get("/order/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const order = await orderCollections.findOne(query);
      res.send(order);
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

    /* payment */

    app.post("/payment", async (req, res) => {
      const email = req.body;
      const result = await paypalEmailCollections.insertOne(email);
      res.send(result);
    });

    app.get("/payments", async (req, res) => {
      const query = {};
      const cursor = paypalEmailCollections.find(query);
      const email = await cursor.toArray();
      res.send(email);
    });
    app.get("/payment/:id", async (req, res) => {
      const query = {};
      const cursor = paypalEmailCollections.find(query);
      const email = await cursor.toArray();
      res.send(email);
    });

    app.put("/payment/:id", async (req, res) => {
      const id = req.params.id;
      const updateEmail = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedDoc = {
        $set: {
          email: updateEmail.email,
        },
      };

      const result = await paypalEmailCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    /* payment */


        /* general Setting */

        app.post("/add-logo", async (req, res) => {
          const logo = req.body;
          const result = await GeneralCollections.insertOne(logo);
          res.send(result);
        });
    
        app.get("/logo", async (req, res) => {
          const query = {};
          const cursor = GeneralCollections.find(query);
          const logo = await cursor.toArray();
          res.send(logo);
        });
        app.get("/logo/:id", async (req, res) => {
          const query = {};
          const cursor = GeneralCollections.find(query);
          const logo = await cursor.toArray();
          res.send(logo);
        });
    
        app.put("/logo/:id", async (req, res) => {
          const id = req.params.id;
          const updateData = req.body;
          const filter = { _id: new ObjectId(id) };
          const options = { upsert: true };
          const updatedDoc = {
            $set: {
              logo: updateData.logo,
            },
          };
    
          const result = await GeneralCollections.updateOne(
            filter,
            updatedDoc,
            options
          );
          res.send(result);
        });
    
        /* payment */


























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
