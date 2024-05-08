import React from 'react'
import { useCartContext } from '../hooks/useCartContext';

function CartProductCard() {
    const {cart,dispatch,token} = useCartContext();
    console.log("cart details page = ",cart);
    // console.log("cart details page = ",image,title,price);
    
    const addToCart = async({title,desc,price,image,productID})=>{
        console.log("item = ",{title,desc,price,image,productID})
          // we have to pass productId as _id because in addProduct api it is extracted as _id
           const res = await fetch("https://e-commerce-1-p1gt.onrender.com/api/product/add",{
           method:"POST",
           body:JSON.stringify({title,desc,price,image,_id:productID, quantity: cart.find((element)=>element.productID === productID).quantity+1}),
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

       const removeFromCart = async({quantity,productID})=>{
        console.log("remove from cart called, quantity = ",quantity,"productID = ",productID);
        if(quantity<=0)
        return ;
        const res = await fetch("https://e-commerce-1-p1gt.onrender.com/api/product/remove",{
            method:"POST",
            body:JSON.stringify({_id:productID}),
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
        <div className='rounded-md p-4 m-4 w-full' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
             <div className='grid grid-cols-4'>
                <h3 className='font-bold ml-4'>Product</h3>
                <h3 className='font-bold text-center'>Price</h3>
                <h3 className='font-bold'>Quantity</h3>
                <h3 className='font-bold'>Total Price</h3>
            </div>
            {cart?.map((item)=>{
            return(
            <div className='grid grid-cols-4 my-1' key={item.productID}>
                <div className='grid grid-cols-2 items-center'>
                    <img style={{width:"100px",height:"100px", margin:"4px", borderRadius:"8px",objectFit:"contain"}} src={item.image} alt="image" />
                    <p style={{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{item.title}</p>
                </div>
                <div className='flex items-center justify-center'>
                    {item.price}
                </div>
                <div className='flex items-center'>
                    <button style={{border:"1px solid grey", borderRadius:"5px", padding:"1px 5px", margin:"3px"}} onClick={()=>addToCart(item)}>+</button>
                    <p>{item.quantity}</p>
                    <button style={{border:"1px solid grey", borderRadius:"5px", padding:"1px 8px", margin:"3px"}} onClick={()=>removeFromCart(item)}>-</button>
                </div>
                <div className='flex items-center font-bold'>
                    <p>{item.price*item.quantity}</p>
                </div>
            </div>
            )})
        }
        </div>
    )
}

export default CartProductCard