const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
        type:String,
        required:true
    },
    quantity:{
        type:String,
        required:true
    }
})

const CartSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    cart: [OrderSchema]
});



module.exports = mongoose.model("cart",Cart)