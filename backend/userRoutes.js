const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

let userRoutes = express.Router();

//#1 - Retrieve All
// http://localhost:3000/users
userRoutes.route("/users").get(async (request, response) => {
  let db = database.getDB();
  let data = await db.collection("users").find({}).toArray(); // by leaving find({}) empty object will get all the collection

  if (data.length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :^{");
  }
});

//#2 - Retrieve One
// http://localhost:3000/users/1
userRoutes.route("/users/:id").get(async (request, response) => {
  let db = database.getDB();
  let data = await db
    .collection("users")
    .findOne({ _id: new ObjectId(request.params.id) });

  // Object.keys same as toArray()
  if (Object.keys(data).length > 0) {
    response.json(data);
  } else {
    throw new Error("Data was not found :^{");
  }
});

//#3 - Create one
userRoutes.route("/users").post(async (request, response) => {
  let db = database.getDB();
  let mongoObject = {
    name: request.body.name,
    email: request.body.email,
    password: request.body.password,
    joinDate: new Date(),
    posts: [],
  };
  let data = await db.collection("users").insertOne(mongoObject);
  response.json(data);
});

//#4 - Update one
userRoutes.route("/users/:id").put(async (request, response) => {
  let db = database.getDB();
  let mongoObject = {
    $set: {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password,
      joinDate: request.body.joinDate,
      posts: request.body.posts,
    },
  };
  let data = await db
    .collection("users")
    .updateOne({ _id: new ObjectId(request.params.id) }, mongoObject);
  response.json(data);
});

//#5 - Delete one
userRoutes.route("/users/:id").delete(async (request, response) => {
  let db = database.getDB();
  let data = await db
    .collection("users")
    .deleteOne({ _id: new ObjectId(request.params.id) });
  response.json(data);
});

module.exports = userRoutes;
