const mongoose = require("mongoose");

// console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("Database Connected Successfully");
})
.catch((err)=>{
    console.log(err);
});

