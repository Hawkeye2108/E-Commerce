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
    desc:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }

})

module.exports = mongoose.model("product",ProductSchema);