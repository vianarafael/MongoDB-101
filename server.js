const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false });
const port = 3000;

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/apacdb");
};

const post = new mongoose.Schema({
  item: String,
});

const Post = mongoose.model("post", post);

app.get("/", async (req, res) => {
  connect().then(async (connection) => {
    const posts = await Post.find({});
    res.send(posts);
  });
});

app.post("/", jsonParser, async (req, res) => {
  connect().then(async (connection) => {
    const { item } = req.body;
    const post = await Post.create({
      item,
    });
    res.send(post);
  });
});

app.put("/", jsonParser, (req, res) => {
  connect().then(async (connection) => {
    const { id, item } = req.body;
    const post = await Post.findByIdAndUpdate(id, { item });
    res.send(post);
  });
});

app.delete("/", jsonParser, (req, res) => {
  connect().then(async (connection) => {
    const { id } = req.body;
    const post = await Post.findByIdAndDelete(id);
    res.send(post);
  });
});

app.listen(port, () => console.log("Running 🚀" + "\n" + "And rockin'🎸"));
