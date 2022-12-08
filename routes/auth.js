const router = require("express").Router();
const CryptoJS = require("crypto-js")
const User = require("../models/User");

//REGISTRATION
router.post("/register", async (req, res)=>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString(),
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }catch(err){
        res.status(500).json(err)
    }
    
});

module.exports = router;