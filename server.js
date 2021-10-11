//___________________
//Dependencies
//___________________
require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;

//___________________
//Port
//___________________
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error / success
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongod connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongod disconnected"));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static("public"));

// Static files
app.use(express.static("public"));
// app.use("/css", express.static(__dirname + "public/css"));
app.use(express.static(__dirname + "public"));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false })); // extended: false - does not allow nested objects in query strings
app.use(express.json()); // returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride("_method")); // allow POST, PUT and DELETE from a form

//___________________
// Routes / Controllers
//___________________
//
const postController = require("./controllers/post.js");
app.use("/posta", postController);
// app.get("/", (req, res) => {
//   res.render("index.ejs");
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log("express is listening on:", PORT));
