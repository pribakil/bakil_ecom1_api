const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId:{type:String, required:true, unique: true},
    products:[
        {
            productId: {type:String, required:true, unique:true,},
            quantity: {type:Number, default: 1,}
        }
    ],
    amount: {type:Number, required:true,},
    adress: {type:Object, required:true,},
    status: {type:String, default:"pending",},
    },
    {timestamps:true}
);

module.exports = mongoose.model("Order", OrderSchema);