const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const adminRouter = require("./routes/adminRoutes");

const app = express();

require("dotenv").config();

require("./db/connect");

app.use(cors());

app.use(express.json());

app.use("/api/user",userRouter);

app.use("/api/product",productRouter);

app.use("/api/payment",paymentRouter);

app.use("/api/admin",adminRouter);

app.listen(4000,()=>{
    console.log("Server started at PORT 4000");
})