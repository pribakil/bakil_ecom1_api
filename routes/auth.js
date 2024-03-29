const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTRATION
router.post("/register", async (req, res)=>{
  const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_SECRET_KEY).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("Err => ", err);
    res.status(500).json(err);
  }
});


//LOGIN
router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne( { username: req.body.username } )
        !user && res.status(401).json("This User don't exist !");
        if(user){
            const password = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_SECRET_KEY).toString(  CryptoJS.enc.Utf8);
            password !== req.body.password && res.status(401).json("Wrong password !!");
    
            const accessToken = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin,
                },
                process.env.JWT_SECRET_KEY,
                {expiresIn:"3d"}
            );
    
            const {password:pw, ...others} = user._doc;
            res.status(200).json({...others, accessToken});
        }

    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;