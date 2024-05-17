const { uploadFile } = require("../helpers/upload");
const ProductModel = require("../models/ProductModel");

const uploadBook = async(req,res)=>{
    // console.log(req.file);
   const {title,category,author,publisher,price} = req.body;
   console.log(title,category,author,publisher,price,req.file);
   try {
    // console.log(req.file);
    const result = await uploadFile(req.file.path);

    const product = await ProductModel.create({
        title,category,author,publisher,price,
        image:result.secure_url
    });
    console.log("product saved = ",product);
    res.status(200).json({success:true, data:product});
   } catch (error) {
    res.status(500).json({success:false, error:error.message});
   }
}

module.exports = {uploadBook};