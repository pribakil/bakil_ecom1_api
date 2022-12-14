
const mongoose = require("mongoose");

const A20PuzzleSchema = mongoose.Schema({
    c11:{type:String,default:""},
    c12:{type:String,default:""},
    c13:{type:String,default:""},
    c14:{type:String,default:""},
    c15:{type:String,default:""},
    c21:{type:String,default:""},
    c22:{type:String,default:""},
    c23:{type:String,default:""},
    c24:{type:String,default:""},
    c25:{type:String,default:""},
    c31:{type:String,default:""},
    c32:{type:String,default:""},
    c33:{type:String,default:""},
    c34:{type:String,default:""},
    c35:{type:String,default:""},
    c41:{type:String,default:""},
    c42:{type:String,default:""},
    c43:{type:String,default:""},
    c44:{type:String,default:""},
    c45:{type:String,default:""},
    c51:{type:String,default:""},
    c52:{type:String,default:""},
    c53:{type:String,default:""},
    c54:{type:String,default:""},
    c55:{type:String,default:""},
    model:{type:mongoose.Types.ObjectId, ref:'A20Model'}
    },
    {timestamps:true}
);

module.exports = mongoose.model("A20Puzzle", A20PuzzleSchema);