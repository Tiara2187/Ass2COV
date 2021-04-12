const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/posts", async (req, res) => {
  const posts = await User.find();
  res.send(posts);
});

router.post("/posts", async (req, res) => {
  const post = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  await post.save();
  res.send(post);
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await User.findOne({ _id: req.params.id });
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});

router.patch("/posts/:id", async (req, res) => {
  try {
    const post = await User.findOne({ _id: req.params.id });

    if (req.body.username) {
      post.username = req.body.username;
    }

    if (req.body.townhall) {
      post.townhall = req.body.townhall;
    }

    await post.save();
    res.send(post);
  } catch {
    res.status(404);
    res.send({ error: "Post doesn't exist!" });
  }
});


module.exports = router;