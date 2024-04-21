const razorpay = require("razorpay");
const crypto = require("crypto");

require("dotenv").config();

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID ,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const createOrder = async (req,res)=>{
  const {amount, currency} = req.body;
  try {
    const order = await razorpayInstance.orders.create({amount, currency});
    console.log("order = ",order);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(400).json({error:error.message});
  }
}

const verifyOrder = async(req,res)=>{
  try {
    const {order_id, payment_id} = req.body;
    const razorpay_signature = req.headers["x-razorpay-signature"];
    


    console.log("order_id = ", order_id);
    console.log("payment_id = ", payment_id);
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    console.log("order_id|payment_id = ", order_id+"|"+payment_id);
    hmac.update(order_id + "|" + payment_id);

    const generated_signature = hmac.digest('hex');
    console.log("generated_signature = ",generated_signature);
    console.log("razorpay_signature = ",razorpay_signature);

    if(razorpay_signature === generated_signature){
      res.status(200).json({success:true, message: "Payment has been verified"})
    }
    else
    res.status(201).json({success:false, message: "Payment verification failed"})

  } catch (error) {
    console.log(error);
    res.status(500).json({error:error.message});
  }
}

module.exports = {createOrder, verifyOrder};