const A20Model = require("../models/A20Model");
const A20Puzzle = require("../models/A20Puzzle");
const mongoose = require("mongoose");

const router = require("express").Router();

router.get("/models", async (req, res)=>{
    const newA20Model = new A20Model({
        c1:"8",
        c2:"5",
        c3:"0",
        c4:"6",
        c5:"1",
        c6:"0",
        c7:"7",
        c8:"8",
        c9:"2",
        c10:"3",
        c11:"6",
        c12:"0",
        c13:"4",
        c14:"2",
        c15:"8",
        c16:"1",
        c17:"7",
        c18:"6",
        c19:"3",
        c20:"3",
        c21:"5",
        c22:"1",
        c23:"2",
        c24:"7",
        c25:"5",
    });

    try{
        const user = await A20Model.findOne( {...newA20Model} );

        if( user ){
            res.status(302).json("This Model already exist !");
        }else{
            const savedA20Model = await newA20Model.save();

            const { _id, __v, createdAt, updatedAt, ...rest } = {...savedA20Model._doc};
            rest.level = "1";
            rest.model = mongoose.Types.ObjectId(savedA20Model._id)

            const newA20Puzzle = new A20Puzzle({
                ...rest
            });

            const savedA20Puzzle = await newA20Puzzle.save();

            res.status(201).json(savedA20Model);
        }
        
    }catch(err){
        res.status(500).json(err);
    }
    
});


module.exports = router;