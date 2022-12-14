
const mongoose = require("mongoose");

const A20PuzzleSchema = mongoose.Schema({
    c1:{type:String,default:""},
    c2:{type:String,default:""},
    c3:{type:String,default:""},
    c4:{type:String,default:""},
    c5:{type:String,default:""},
    c6:{type:String,default:""},
    c7:{type:String,default:""},
    c8:{type:String,default:""},
    c9:{type:String,default:""},
    c10:{type:String,default:""},
    c11:{type:String,default:""},
    c12:{type:String,default:""},
    c13:{type:String,default:""},
    c14:{type:String,default:""},
    c15:{type:String,default:""},
    c16:{type:String,default:""},
    c17:{type:String,default:""},
    c18:{type:String,default:""},
    c19:{type:String,default:""},
    c20:{type:String,default:""},
    c21:{type:String,default:""},
    c22:{type:String,default:""},
    c23:{type:String,default:""},
    c24:{type:String,default:""},
    c25:{type:String,default:""},
    level:{type:String},
    model:{type:mongoose.Types.ObjectId, ref:'A20Model'}
    },
    {timestamps:true}
);

module.exports = mongoose.model("A20Puzzle", A20PuzzleSchema);