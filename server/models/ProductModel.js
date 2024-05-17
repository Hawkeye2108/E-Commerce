const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    // edition:{
    //     type:String,
    //     required:true
    // }
})

module.exports = mongoose.model("product",ProductSchema);