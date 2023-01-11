const { authorizeUser, authorizeOnlyAdmin } = require("./verifyToken");
const User = require("../models/User");

const router = require("express").Router();

router.put("/:id", authorizeUser, async (req, res)=>{
    if( req.body.password ){
        req.body.password = CryptoJS.AES.encrypt( req.body.password, process.env.PASSWORD_SECRET_KEY ).toString();
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err);
    }
});

router.delete("/:id", authorizeUser, async (rea, res)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User Delete successfully !!");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/stats", authorizeOnlyAdmin, async(req, res)=>{
    try {
        console.log("in stat");
        const date = new Date();
        const lastYear = new Date( date.setFullYear( date.getFullYear() - 1 ) );
        const data = await User.aggregate( [
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: { 
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ] );
        console.log("stat data", data)
        res.status(200).json(data);
    } catch (err) {
        console.log("Error => ",err)
        res.status(500).json(err);
    }
});


router.get("/:id", authorizeOnlyAdmin, async(req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", authorizeOnlyAdmin, async(req, res)=>{
    try {
        const query = req.query.new
        const users = query === "true" ? await User.find().sort({_id : -1}).limit(1) 
                            : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;