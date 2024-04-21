const mongoose = require("mongoose");

// connect to database
mongoose.connect(process.env.MONGODB_URL)
.then(()=>{
   console.log("Database connected successfully");
})
.catch((error)=>{
    console.log(error);
})
