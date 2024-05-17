const Product = require("../models/ProductModel");
const User = require("../models/UserModel")

const getAllProducts = async (req,res)=>{
  //  return res.json({mssg:"valid"});
  // console.log(req.query);
  // const query = {};
  let title = "";
  if(req.query.title){
    // query.title = req.query.title;
    title = req.query.title;
  }

  // console.log(query);
  let page = 1;
  if(req.query.page){
    page = req.query.page;
  }
   const limit = 6;
   try{
     const products = await Product.find({title:{$regex:title,$options:"i"}}).skip((page-1)*limit).limit(limit*1).exec();
    //  console.log("get all products called = ",products);
    const total = await Product.find({title:{$regex: title, $options:"i"}}).countDocuments();
     res.status(200).json({data:products, totalPages:(Math.ceil(total/limit)), currentPage:page});
   }
   catch(error){
    console.log(error);
    res.status(400).json({error:error.message});
   }
}

const addProduct = async (req,res)=>{
  const {_id,title,desc,price,image,quantity} = req.body;
  const userId = req.user;
  //to check if product exist already
  let user = await User.findOne({_id:userId});
  console.log(user)
  const productExist = user.cart.findIndex((product)=> product.productID === _id);

  // let quantity=0;
  //if product is not present in user's cart
  // if(productExist === -1){
  //   quantity = 1;
  // }
  // else{
  //   quantity = user.cart[productExist].quantity + 1;
  // }

  const item = {
    productID:_id, title, desc,price,image,quantity
  }

  try{

    if(productExist===-1)
    user = await User.findByIdAndUpdate(userId,{$push:{cart:item}},{new:true});
    else
    user = await User.findOneAndUpdate({_id:userId,'cart.productID':_id},{$set: {'cart.$.quantity':quantity}},{new: true})
    console.log("add to cart = ",user.cart);
    res.status(200).json(user.cart);
  }
  catch(error){
    console.log(error);
    res.status(400).json({error:error.message});
  }
}

const removeProduct = async(req,res)=>{
  const {_id} = req.body;
  const userId = req.user;
  
  console.log("removeProduct called");
  let user = await User.findOne({_id:userId});
  console.log("removeProduct called user = ",user);
  let quantity=0;
  const productExist = user.cart.findIndex((product)=> product.productID === _id) 
  if(productExist === -1){
     return res.status(200).json("Product does not exist")
  }
  quantity = user.cart[productExist].quantity-1;
  try {
    if(quantity==0){
      cart = user.cart.filter((product)=>product.productID !== _id)
      user = await User.findOneAndUpdate({_id:userId}, {$set:{'cart':cart}}, {new:true});
    }
    else{
      user = await User.findOneAndUpdate({_id:userId,'cart.productID':_id}, {$set: {'cart.$.quantity': quantity}}, {new:true})
    }
    res.status(200).json(user.cart);
    
  } catch (error) {
    console.log(error);
    res.status(400).json({error:error.message});
  }

}


const removeAllProducts = async (req,res)=>{
  const userId = req.user;
  try {
    const user = await User.findOneAndUpdate({_id:userId}, {$set:{'cart': []}} , {new:true});
    res.status(200).json(user); 
  } catch (error) {
    console.log(error);
    res.status(400).json({error: error.message})
  }
}

module.exports = { getAllProducts,addProduct, removeProduct, removeAllProducts}