
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.set('strictQuery', true); // find doc on this

const dotenv = require("dotenv");
dotenv.config()

const PORT = process.env.PORT || process.env.SERVER_PORT;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const a20Route = require("./routes/a20");


mongoose.connect(process.env.MONGO_URL_A20)
        .then(()=>console.log("DB connection is Done with success !!"))
        .catch((err)=>console.log(err));



app.use(express.json());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/a20", a20Route);

app.listen( PORT, ()=>{
    console.log("Backend Server is running ...");
});
