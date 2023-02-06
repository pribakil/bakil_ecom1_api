const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", async (req, res)=>{
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },(stripeErr, stripeRes)=>{
            if( stripeErr ){
                console.log(stripeErr);
                res.status(500).json(stripeErr);
            }else{
                console.log(stripeRes);
                res.status(200).json(stripeRes);
            }
        },
    );
});

module.exports = router