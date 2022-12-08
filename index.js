
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.set('strictQuery', true); // find doc on this

const dotenv = require("dotenv");
dotenv.config()

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");


mongoose.connect(process.env.MONGO_URL)
        .then(()=>console.log("DB connection is Done with success !!"))
        .catch((err)=>console.log(err));



app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1", userRoute);

app.listen(process.env.SERVER_PORT || 5000, ()=>{
    console.log("Backend Server is running ...");
});
