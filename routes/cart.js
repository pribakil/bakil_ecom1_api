const router = require("express").Router();

const Cart = require("../models/Cart");
const { authorizeUser, authorizeOnlyAdmin } = require("./verifyToken");

//CREATION
router.post("/", authorizeUser, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", authorizeUser, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE BY ID
router.delete("/:id", authorizeUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart Deleted successfully !!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//FIND BY USER_ID
router.get("/:id", authorizeUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", authorizeOnlyAdmin, async (req, res) => {
  try {
    const last = req.query.last;
    const carts =
      last !== null
        ? await Cart.find().sort({ _id: -1 }).limit(last)
        : await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;