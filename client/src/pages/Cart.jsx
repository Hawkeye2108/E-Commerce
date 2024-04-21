import React from 'react'
import { useCartContext } from '../hooks/useCartContext'
import CartProductCard from '../components/CartProductCard';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function loadScript(src){
     return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src = src;
        script.onload = ()=>{
            resolve(true);
        };
        script.onerror = ()=>{
            resolve(false);
        };
        document.body.appendChild(script);
     });
}


function Cart() {
  const {email, token, cart, dispatch} = useCartContext();
  console.log("cart page = ",cart);


  const removeAllProducts = async ()=>{
    const res = await fetch("http://localhost:4000/api/product/removeAllProducts",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `bearer ${token}`,
        }
    });
    console.log(res);
    if(res.ok){
      console.log("All products are removed from cart")
    }
}

 const displayRazorpay = async()=>{
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if(!res){
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }
    const result = await fetch("http://localhost:4000/api/payment/createOrder",{
        method:"POST",
        body:JSON.stringify({amount:(sum+20)*100,curreny:"INR"}),
        headers:{
            "Content-Type": "application/json",
            "Authorization": `bearer ${token}`
        }
    })
    console.log(result);
    if(!result.ok){
        alert("Server error. Are you online?");
        return;
    }
    const data = await result.json();
    console.log(data);
    const options = {
        key: 'rzp_test_rkmpq10yx9CYk4',
        amount: data.amount, // Amount is in currency subunits. For example, 50000 refers to 50000 paise or 500 INR.
        currency: 'INR',
        name: 'Acme Corp',
        description: 'Test Transaction',
        image: 'https://example.com/your_logo',
        order_id: data.id, // Replace with the actual order ID obtained from your server
        prefill: {
          name: 'Gaurav Kumar',
          email: email,
          contact: '9000090000',
        },
        notes: {
          address: 'Razorpay Corporate Office',
        },
        theme: {
          color: '#3399cc',
          height: 'auto',
          width: 'auto',
        },
        // modal:{
            
        // },
        handler: async function (response) {
          // Handle the payment response
        //   setPaymentStatus(response.razorpay_payment_id);
           console.log(response);
          


           let res = await fetch("http://localhost:4000/api/payment/verifyOrder",{
            method:"POST",
            body:JSON.stringify({order_id: response.razorpay_order_id, payment_id: response.razorpay_payment_id}),
            headers:{
                "Content-Type": "application/json",
                "Authorization": `bearer ${token}`,
                "x-razorpay-signature": response.razorpay_signature
            }
           })
        //    console.log(res);
           res = await res.json();
           console.log(res);

           if(res.success){
               await removeAllProducts();
               dispatch({type:"ORDERED",payload:[]});
               console.log("success");
           }
           else
           alert("Payment Failed. Retry!")
        },
    }
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
 }


 let sum = 0;
 if(cart){
    const total = cart.forEach((item)=> {
        console.log("item.qauntity = ",item.quantity)
        sum += item.price*item.quantity;
    })
    console.log("sum = ",sum)
}
  return (
    <>
    {/* Navabr */}
        {/* <nav className='bg-white flex flex-row items-center' style={{justifyContent:"space-between",height:"40px",margin:"10px 0"}}> */}
        {/* <div className='ml-6 font-normal'> 
            <ul className='flex flex-row gap-6' >
                <li className='cursor-pointer'>All</li>
                <li className='cursor-pointer'>Jewllery</li>
                <li className='cursor-pointer'>Watches</li>
                <li className='cursor-pointer'>Collections</li>
            </ul>
        </div> */}
        {/* <div className='flex-1 text-center'>
            <p className='font-bold text-lg'>Nairon</p>
        </div>
        <div className='mr-16 ml-16 '>
            <ul className='flex flex-row gap-7 '>
                <li>Account</li>
                <li>
                  <Link to="/cart" >Cart {cart?.length ===0 || !cart? "(0)":`(${cart.length})`}</Link>
                </li>
            </ul>
        </div>
    </nav> */}
    <Navbar/>
    {/* Cart Space  */}
    <div className='min-h-screen'>
    {(cart?.length === 0 || !cart)&& (
        <h2 className='text-center font-bold text-3xl my-8'>Your Cart is Empty</h2>
       )
    }
    {/* Checkout */}
    { (cart?.length!==0 && cart) && (
    <div className='flex flex-col lg:flex-row'>
        {/* width:"80%", margin:"20px"  */}
    <div className='flex w-full lg:w-4/5' style={{}}>
        <CartProductCard/>
    </div>   
        {/* Summary */}
        {/* width:20% , margin:"30px 18px 0 0",padding:"10px" */}
        <div style={{height:"fitContent",borderRadius:"8px", fontSize:"14px"}} className="px-4 w-full lg:w-1/5 md:px-5 my-8" >
        <div className='bg-yellow-500 py-2 px-5 rounded-xl'>
        <h2 className='font-bold text-lg mt-1 mb-3'>Cart Total</h2>
        <div className='flex justify-between'>
        <div>
            <p>Subtotal</p>
            <p>Handling Fees</p>
            <p>Delivery Charges</p>
            <p className='font-bold'>Total</p>
        </div>
        <div>
            <p>Rs. {sum}</p>
            <p>Rs. 20</p>
            <p className='font-medium'>Free</p>
            <p className='font-bold text-xl'>Rs. {sum+20}</p>
        </div>
        </div>
        <button className='bg-white w-full rounded-full py-2 mt-3 mb-2' onClick={displayRazorpay}>Checkout</button>
        </div>
        </div>
     </div>
     )}
     </div>
     {/* <div className='absolute bottom-0 w-full'> */}
     <Footer/>
     {/* </div> */}
    </>
  )
}

export default Cart