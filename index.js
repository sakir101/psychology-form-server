const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ttvi8dx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  const clientFormCollection = client
    .db("data")
    .collection("clientInfoCollection");

  try {
    app.post("/clientData", async (req, res) => {
      const clientData = req.body;
      const result = await clientFormCollection.insertOne(clientData);
      res.send(result);
    });

    app.get("/client/name/:name", async (req, res) => {
      const name = req.params.name;
      const clientInfo = await clientFormCollection.findOne({ name });
      res.send(clientInfo);
    });

    app.get("/client/id/:id", async (req, res) => {
      const id = req.params.id;
      const clientInfo = await clientFormCollection.findOne({ id });
      res.send(clientInfo);
    });
  } finally {
  }
}

run().catch(console.log);

app.get("/", async (req, res) => {
  res.send("Client Form Server is running");
});

app.listen(port, () => console.log(`Client Form Server is running ${port}`));
