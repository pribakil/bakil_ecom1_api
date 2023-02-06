
const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // find doc on this

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || process.env.SERVER_PORT;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const cartRoute = require("./routes/cart");
const paymentRoute = require("./routes/stripe");
//const a20Route = require("./routes/a20");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection is Done with success !!"))
  .catch((err) => console.log(err));

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/payment", paymentRoute);
//app.use("/api/v1/a20", a20Route);

app.listen(PORT, () => {
  console.log("Backend Server is running ...");
});
