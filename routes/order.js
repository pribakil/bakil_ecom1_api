const router = require("express").Router();
const Order = require("../models/Order");
const { authorizeUser, authorizeOnlyAdmin } = require("./verifyToken");

//CREATION
router.post("/", authorizeUser, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", authorizeOnlyAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE BY ID
router.delete("/:id", authorizeOnlyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Deleted successfully !!");
  } catch (err) {
    res.status(500).json(err);
  }
});

//FIND BY ID
router.get("/:id", authorizeOnlyAdmin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL
router.get("/", authorizeOnlyAdmin, async (req, res) => {
  try {
    const last = req.query.last;
    const userId = req.query.userId
    let orders;
    
    if (last && userId) {
      orders = await Order.find({ userId: userId })
        .sort({ _id: -1 })
        .limit(last);
    }else if( last ){
      orders = await Order.find().sort({ _id: -1 }).limit(last)
    }else if( userId ){
      orders = await Order.find( { userId: userId } )
    }else{
      orders = await Order.find();
    }

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// MONTHLY INCOME

router.get("/income", authorizeOnlyAdmin, async (req, rep)=>{
  const date = new Date();
  const lastMonth = new Date( date.setMonth( date.getMonth() - 1 ) )
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const data = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;