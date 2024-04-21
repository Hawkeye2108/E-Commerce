const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

const createToken = (_id)=>{
   return jwt.sign({_id}, process.env.SECRET, {expiresIn: "3d"})
}

// register user
const registerUser = async (req,res)=>{
  const {name,email,password} = req.body;

  try {
    const user = await User.signup(name, email, password);

    // create a jwt token
    const token = createToken(user._id);

    res.status(200).json({email, token,cart:user.cart});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// login user
const loginUser = async (req,res)=>{
  const {email,password} = req.body;
 
  try {
    const user = await User.login(email,password);

    // create a jwt token
    const token = createToken(user._id);
    res.status(200).json({email,token});
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

//to update cart of user
const findUserDetails = async(req,res)=>{
  const userId = req.user;
  console.log("findUserDetails is called")
  console.log("userId = ",userId)
   try {
     const user = await User.findOne({_id:userId});
     console.log(user)
     console.log("user.cart = ",user.cart);

     res.status(200).json(user.cart);
   } catch (error) {
    console.log(error)
    res.status(401).json({error: error.message});
   }
}

module.exports = {
   registerUser,
   loginUser,
   findUserDetails
}