/* connect.js 파일에서 여기 접근 하는 것이다.
module.exports = {
  // connect database
  connectToServer: () => {
    database = client.db("blogData");
  },
  // access
  getDB: () => {
    return database;
  },
};*/
const connect = require("./connect");
const express = require("express");
const cors = require("cors"); // library
const posts = require("./postRoutes");
const users = require("./userRoutes");

const app = express();
const PORT = 3000;

// MiddleWear
app.use(cors()); //tells express how to handle sharing resourse across different domain
app.use(express.json()); //tells express to parse request in JSON format
app.use(posts);
app.use(users);

//telling our local computer, where hosting our server to listen to the port 3000
app.listen(PORT, () => {
  connect.connectToServer();
  console.log(`Server is running on port ${PORT}`);
});
