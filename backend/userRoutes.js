const express = require("express");
const database = require("./connect");
const { ObjectId } = require("mongodb");
const objectId = require("mongodb").ObjectId;
// bcrypt step 1
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

let userRoutes = express.Router();

// bcrypt step 2
const SALT_ROUNDS = 6;

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

  // collect to database, access the users collections and run the method called findOne
  // so if return with object, then this email exist and is taken.
  const takenEmail = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (takenEmail) {
    response.json({ message: "The email is taken" });
  } else {
    // bcrypt step 3
    const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

    let mongoObject = {
      name: request.body.name,
      email: request.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };
    let data = await db.collection("users").insertOne(mongoObject);
    response.json(data);
  }
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

//#6 - Login
userRoutes.route("/users/login").post(async (request, response) => {
  let db = database.getDB();

  // collect to database, access the users collections and run the method called findOne
  // so if return with object, then this email exist and is taken.
  const user = await db
    .collection("users")
    .findOne({ email: request.body.email });

  if (user) {
    let confirmation = await bcrypt.compare(
      request.body.password,
      user.password
    );
    if (confirmation) {
      const token = jwt.sign(user, process.env.SECRETKEY, { expiresIn: "1h" });
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect Passsword" });
    }
  } else {
    response.json({ success: false, message: "User not found" });
  }
});

module.exports = userRoutes;
