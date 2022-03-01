const express = require("express");

const Product = require("../models/product_model");

const authenticate = require("../middlewares/authenticate");
const authorise = require("../middlewares/authorise");

const router = express.Router();

let permission = {};

router.post("", authenticate, authorise(["seller", "admin"]),async (req, res) => {
  try {
    // req.body."user_id" = req.user._id;
    const product = await Product.create(req.body);
    permission[product._id] = req.body.user_id;
    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.patch(
  "/:id",
  authenticate,
  authorise(["seller", "admin"]),
  async (req, res) => {

    if(permission[req.params.id] ==  req.body?.user_id)
    {
      try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        }).populate({path:"user_id",select:["name","mobile","email"]}) ;;
  
        return res.send(product);
        } 
        catch (err) {
          return res.status(500).send({ message: err.message });
        }
    }
    else
    {
      return res.status(500).send("User is not allowed")
    }
   
  }
);

router.get("", async (req, res) => {
  try {
    const products = await Product.find()
    .populate({path:"user_id",select:["name","mobile","email","role"]})
    .lean().exec();

    return res.send(products);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.get("/:id",async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.send(product);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.delete("/:id", authenticate, authorise(["seller", "admin"]),async (req, res) => {
  if(permission[req.params.id] ==  req.body?.user_id)
    {
        try {
          const product = await Product.findByIdAndDelete(req.params.id);
          return res.send(product);
        } 
        catch (err) {
          return res.status(500).send({ message: err.message });
        }
    }
    else
    {
      return res.status(500).send("User is not allowed")
    }
  
});

module.exports = router;
