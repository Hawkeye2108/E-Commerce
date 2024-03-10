const User = require("../models/UserSchema");

const uploadHandler = (req,res)=>{
    
}

const registerHandler = async(req,res)=>{
  try {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({message:"User Registered Successfully"});
  } catch (error) {
    console.log(error);
    res.status(400).json({error});
  }
}

module.exports = {uploadHandler,registerHandler};