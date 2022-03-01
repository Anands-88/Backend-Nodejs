const express = require("express");

const Post = require("../models/post_model");

const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", authenticate, async (req, res) => {
  try {
    // req.body.user_id = req.user._id;
    const user_post = await Post.create(req.body);

    return res.send(user_post);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", authenticate,async (req, res) => {
  try {
    const user_get = await Post.find().lean().exec();

    return res.send(user_get);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch("/:id",authenticate, async (req, res) => {
  try {
    const user_patch = await Post.findByIdAndUpdate(req.params.id,req.body);

    return res.send(user_patch);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id",authenticate, async (req, res) => {
  try {
    const user_delete = await Post.findByIdAndDelete(req.params.id);

    return res.send(user_delete);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
