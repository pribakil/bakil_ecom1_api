const A20Model = require("../models/A20Model");
const A20Puzzle = require("../models/A20Puzzle");

const router = require("express").Router();

router.get("/models", async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
    
});

module.exports = router;