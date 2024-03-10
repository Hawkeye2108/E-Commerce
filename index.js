const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./routes/route");

require("./db/connect");

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// app.use("/",express.static("public"));
app.use("/",router);

app.listen(5000,()=>{
    console.log("Server started at Port 5000");
})