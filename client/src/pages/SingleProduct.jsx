import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useCartContext } from '../hooks/useCartContext';
import Footer from '../components/Footer';


const SingleProduct = () => {
    const {email,token,dispatch,cart} = useCartContext();
   const [quantity, setQuantity] = useState(0);

const {state } = useLocation();
const {item } = state;

const navigate = useNavigate();
console.log(item);

useEffect(()=>{
 if(cart){
    console.log(cart);
    const obj = cart.find((element)=> element.productID === item._id)
    if(obj){
        console.log("found",obj.quantity)
        setQuantity(obj.quantity)
    }
 }
},[cart])

const addToCart = async()=>{
    if(quantity==0){
        alert("Add quantity")
        return;
    }
    if(!email){
     console.log("Collection email = ", !email);
     navigate("/login");
 }
    console.log("Product _id = ",item._id);
  console.log("item = ",item)
  console.log("addtocart token = ",token)
     const res = await fetch("http://localhost:4000/api/product/add",{
     method:"POST",
     body:JSON.stringify({...item,quantity}),
     headers:{
        "Content-Type":"application/json",
        "authorization": `bearer ${token}`
     }
    })
    if(res.ok){
    const json = await res.json();
    console.log(json)
    dispatch({type:"ADD_TO_CART", payload:json});
    }

 }

 const removeFromCart = async()=>{
    console.log("quantity removeFromCart = ",quantity);
    if(quantity<=0){
      alert("No item present")
      return;
    }
    setQuantity(quantity-1);
    console.log("remove from cart called, quantity = ",quantity,"productID = ",item._id);
    
    if(!cart.find((element)=> element.productID == item._id)){
        return ;
    }
    const res = await fetch("http://localhost:4000/api/product/remove",{
        method:"POST",
        body:JSON.stringify({_id:item._id}),
        headers:{
            "Content-Type": "application/json",
            "authorization": `bearer ${token}`
        }
    })

    if(res.ok){
        const json = await res.json();
        dispatch({type:"REMOVE_FROM_CART",payload:json});
    }
   }

  return (
    <div className='flex flex-col h-screen'> 
    <Navbar/>
    <div className='flex-1 flex flex-col md:flex-row' >
        <div className='bg-blue-300 py-16 md:flex-1'>
            <div className='bg-white rounded-xl shadow-xl mx-4 flex justify-center items-center' style={{height:"400px"}}>
                <img className='rounded-xl h-3/5 w-2/5 object-contain' src={item.image} alt="Image" />
            </div>
        </div>
        <div className='bg-white flex-1 pt-6 px-4 '>
           <div className='font-bold text-2xl '>
            {item.title}
           </div>
           <div className='text-gray-400 text-xl mt-6'>
            {item.desc}
           </div>
        <div className='font-bold text-2xl mt-5'>
            Rs. {item.price}
        </div>
        <div className='flex gap-5 my-4 text-lg font-bold text-gray-500'>
            Select Quantity 
            <div className='flex rounded-md py-2 px-4 w-fit gap-2 items-center' style={{border:"1px solid black", backgroundColor:"#15e3b6d2 "}}>
                {/* <p>-</p> */}
                <FaMinus className='font-bold text-green-600 cursor-pointer' onClick={removeFromCart}/>
                <div className='bg-white px-4 rounded-md select-none'  style={{border:"1px solid black"}}>
                 {quantity}
                </div>
                {/* <p>+</p> */}
                <FaPlus className='font-bold text-green-600 cursor-pointer' onClick={()=>setQuantity(quantity+1)}/>
            </div>
        </div>
        <div className='flex justify-center my-7'>
            <button className='font-bold text-white text-xl p-3 px-16 rounded-full select-none' style={{backgroundColor:"#15e3b6d2 "}} onClick={addToCart}>Add to cart</button>
        </div>
       </div>
    </div>
    <Footer/>
    </div>
  )
}

export default SingleProduct