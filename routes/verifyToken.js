const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    console.log("authHeader is => "+authHeader);

    if( authHeader ){
        const token = authHeader.split(" ")[1];
        console.log("token is => "+token);
        jwt.verify( token, process.env.JWT_SECRET_KEY, (err, user)=>{
            if(err) res.status(401).json("Token is not valid !");
            req.user = user;
            next()
        } );
    }else{
        return res.status(401).json("You are not authenticated !");
    }
};

const authorizeUser = ( req, res, next )=>{
    verifyToken( req, res, ()=>{
        if( req.user.id === req.params.id || req.user.isAdmin ){
            next();
        }else{
            res.status(403).json("Not allowed !!");
        }
    } );
};

const authorizeOnlyAdmin = ( req, res, next )=>{
    verifyToken( req, res, ()=>{
        if( req.user.isAdmin ){
            next();
        }else{
            res.status(403).json("Not allowed !!");
        }
    } );
};

module.exports = {verifyToken, authorizeUser, authorizeOnlyAdmin};