const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const router = require("./routes/route");

require("dotenv").config();

require("./db/connect");

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended:true}));

app.use("/",express.static("public"));
app.use("/",router);

app.listen(5000,()=>{
    console.log("Server started at Port 5000");
})