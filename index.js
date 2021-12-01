const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.nr9ns.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const run = async () => {
	try {
		await client.connect();
		const database = client.db("Portfolio");
		const projectCollection = database.collection("Projects");

		app.get("/portfolio", async (req, res) => {
			const cursor = projectCollection.find({});
			const result = await cursor.toArray();
			res.send(result);
		});

		app.get("/portfolio/:_id", async (req, res) => {
			const id = req.params._id;
			const result = await projectCollection.findOne({ _id: ObjectId(id) });
			res.json(result);
		});
	} finally {
	}
};
run().catch(console.dir);

app.get("/", (req, res) => {
	res.send("My Portfolio is working");
});
app.listen(port, () => {
	console.log("server is running in ", port);
	console.log(uri);
});
