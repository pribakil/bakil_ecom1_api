const A20Model = require("../models/A20Model");
const A20Puzzle = require("../models/A20Puzzle");
const mongoose = require("mongoose");

const router = require("express").Router();

router.get("/models", async(req, res)=>{
    try {
      const puzzles = await A20Model.find().limit(18);
      res.status(201).json(puzzles);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }  
    
});

router.get("/delete", async(req, res)=>{
    try {
        for (let i = 0; i < 18; i++) {
            await A20Model.findOneAndRemove(
                {},
                { "sort": { "_id": -1 } }
            )
            console.log("=>deleted "+i)
        }
        
        res.status(201).json("deleted");
    } catch (error) {
        res.status(500).json(err);
    }  
    
});

router.get("/load", (req, res)=>{

        models.map(async function(modelArray){
            const newA20Model = new A20Model({
                c1:modelArray[0], c2:modelArray[1],
                c3:modelArray[2], c4:modelArray[3],
                c5:modelArray[4], c6:modelArray[5],
                c7:modelArray[6], c8:modelArray[7],
                c9:modelArray[8], c10:modelArray[9],
                c11:modelArray[10], c12:modelArray[11],
                c13:modelArray[12], c14:modelArray[13],
                c15:modelArray[14], c16:modelArray[15],
                c17:modelArray[16], c18:modelArray[17],
                c19:modelArray[18], c20:modelArray[19],
                c21:modelArray[20], c22:modelArray[21],
                c23:modelArray[22], c24:modelArray[23],
                c25:modelArray[24],
            });
    
            try{
            
                const savedA20Model = await newA20Model.save();
    
                const { _id, __v, createdAt, updatedAt, ...rest } = {...savedA20Model._doc};
                rest.level = "4";
                rest.model = mongoose.Types.ObjectId(savedA20Model._id)
        
                let counter = 1;
                while(counter <= 12){
                    var index = Math.floor(Math.random() * (25 - 1 + 1) + 1);
                    var field = "c"+index;

                    if( field !== "c13" && rest[""+field] !== "" ){
                        rest[""+field] = "";
                        counter++;
                    }
                }
            
        
                const newA20Puzzle = new A20Puzzle({
                    ...rest
                });
        
                const savedA20Puzzle = await newA20Puzzle.save();
                if( puzzles.length === 0 ){
                    puzzles[0] = savedA20Puzzle._doc;
                }else{
                    puzzles = [...puzzles, savedA20Puzzle._doc]
                }
                
            }catch(err){
                console.log("=> Error: "+err)
                res.status(500).json(err);
            }
        
        });

        console.log("=>puzzles :"+puzzles)

        res.status(201).json(puzzles);
    
    
});


module.exports = router;


const models = [
    [7, 0, 8, 3, 2, 5, 8, 0, 1, 6, 0, 6, 4, 8, 2, 1, 5, 2, 5, 7, 7, 1, 6, 3, 3],
    [7, 5, 0, 1, 7, 0, 8, 6, 5, 1, 8, 0, 4, 2, 6, 3, 1, 8, 5, 3, 2, 6, 2, 7, 3],
    [5, 8, 0, 1, 6, 7, 0, 8, 3, 2, 0, 6, 4, 8, 2, 7, 1, 6, 3, 3, 1, 5, 2, 5, 7],
    [7, 0, 9, 3, 1, 2, 6, 3, 0, 9, 4, 4, 5, 7, 0, 6, 7, 1, 4, 2, 1, 3, 2, 6, 8],
    [7, 2, 4, 6, 1, 0, 6, 4, 7, 3, 9, 3, 5, 1, 2, 3, 0, 7, 4, 6, 1, 9, 0, 2, 8],
    [2, 6, 3, 0, 9, 7, 0, 9, 3, 1, 4, 4, 5, 7, 0, 1, 3, 2, 6, 8, 6, 7, 1, 4, 2],
    [1, 2, 8, 0, 9, 9, 3, 4, 0, 4, 2, 5, 6, 4, 3, 1, 5, 2, 9, 3, 7, 5, 0, 7, 1],
    [1, 9, 2, 1, 7, 2, 3, 5, 5, 5, 8, 4, 6, 2, 0, 0, 0, 4, 9, 7, 9, 4, 3, 3, 1],
    [9, 3, 4, 0, 4, 1, 2, 8, 0, 9, 2, 5, 6, 4, 3, 7, 5, 0, 7, 1, 1, 5, 2, 9, 3],
    [8, 4, 5, 1, 2, 3, 5, 0, 8, 4, 4, 0, 7, 1, 8, 0, 2, 6, 9, 3, 5, 9, 2, 1, 3],
    [8, 3, 4, 0, 5, 4, 5, 0, 2, 9, 5, 0, 7, 6, 2, 1, 8, 1, 9, 1, 2, 4, 8, 3, 3],
    [3, 5, 0, 8, 4, 8, 4, 5, 1, 2, 4, 0, 7, 1, 8, 5, 9, 2, 1, 3, 0, 2, 6, 9, 3],
    [1, 5, 6, 4, 4, 3, 2, 2, 9, 4, 3, 7, 8, 2, 0, 7, 0, 3, 5, 5, 6, 6, 1, 0, 7],
    [1, 3, 3, 7, 6, 5, 2, 7, 0, 6, 6, 2, 8, 3, 1, 4, 9, 2, 5, 0, 4, 4, 0, 5, 7],
    [3, 2, 2, 9, 4, 1, 5, 6, 4, 4, 3, 7, 8, 2, 0, 6, 6, 1, 0, 7, 7, 0, 3, 5, 5],
    [6, 0, 5, 8, 1, 7, 4, 1, 6, 2, 5, 2, 9, 0, 4, 2, 6, 4, 3, 5, 0, 8, 1, 3, 8],
    [6, 7, 5, 2, 0, 0, 4, 2, 6, 8, 5, 1, 9, 4, 1, 8, 6, 0, 3, 3, 1, 2, 4, 5, 8],
    [7, 4, 1, 6, 2, 6, 0, 5, 8, 1, 5, 2, 9, 0, 4, 0, 8, 1, 3, 8, 2, 6, 4, 3, 5],
];

let puzzles = [];