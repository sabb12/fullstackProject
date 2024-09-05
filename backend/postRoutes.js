const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");
const objectId = require("mongodb").ObjectId;

let postRoutes = express.Router();

//#1 - Retrieve All
// http://localhost:3000/posts
postRoutes.route("/posts").get(async (request, response) => {
  let db = database.getDB();
  let data = await db.collection("posts").find({}).toArray(); // by leaving find({}) empty object will get all the collection

  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :^{");
  }
});

//#2 - Retrieve One
// http://localhost:3000/posts/1
postRoutes.route("/posts/:id").get(async (request, response) => {
  let db = database.getDB();
  let data = await db
    .collection("posts")
    .findOne({ _id: new ObjectId(request.params.id) });

  // Object.keys same as toArray()
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :^{");
  }
});

//#3 - Create one
postRoutes.route("/posts").post(async (request, response) => {
  let db = database.getDB();
  let mongoObject = {
    title: request.body.title,
    description: request.body.description,
    content: request.body.content,
    author: request.body.author,
    dateCreated: request.body.dateCreated,
  };
  let data = await db.collection("posts").insertOne(mongoObject);
  response.json(data);
});

//#4 - Update one
postRoutes.route("/posts/:id").put(async (request, response) => {
  let db = database.getDB();
  let mongoObject = {
    $set: {
      title: request.body.title,
      description: request.body.description,
      content: request.body.content,
      author: request.body.author,
      dateCreated: request.body.dateCreated,
    },
  };
  let data = await db
    .collection("posts")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
postRoutes.route("/posts/:id").delete(async (request, response) => {
  let db = database.getDB();
  let data = await db
    .collection("posts")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

module.exports = postRoutes;
