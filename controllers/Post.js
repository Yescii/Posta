// Dependencies
const express = require("express");
const postRouter = express.Router();
const Post = require("../models/PostDB");

//INDEX
postRouter.get("/", (req, res) => {
  Post.find({}, (error, allPost) => {
    res.render("index.ejs", { post: allPost });
  });
});

//NEW
postRouter.get("/new", (req, res) => {
  res.render("new.ejs");
});

//DELETE
postRouter.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/posta");
  });
});

//UPDATE
postRouter.put("/:id", (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (error, updatedPost) => {
    res.redirect("/posta");
  });
});
// Create
postRouter.post("/", (req, res) => {
  Post.create(req.body, (error, createdPost) => {
    res.redirect("/posta");
  });
});

//EDIT
postRouter.get("/:id/edit", (req, res) => {
  Post.findById(req.params.id, (error, foundPost) => {
    res.render("edit.ejs", {
      post: foundPost,
    });
  });
});
// SHOW

module.exports = postRouter;
