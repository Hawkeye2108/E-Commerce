const mongoose = require("mongoose");

const MONGODB_URL = "mongodb+srv://jatinrawat2108:3K7CfUAcI5fBPP6y@cluster0.xdrxa7j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log(err);
});

