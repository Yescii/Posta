const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  name: String,
  description: String,
  img: String,
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
