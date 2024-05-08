import React from 'react'
import { useCartContext } from '../hooks/useCartContext'
import { useNavigate } from 'react-router-dom';

function Card({item}) {
  const {email,token,dispatch} = useCartContext();
  
  console.log("token = ",token);
  const {image,title,desc,price,_id} = item;

  const navigate = useNavigate();
  const addToCart = async()=>{
     if(!email){
      console.log("Collection email = ", !email);
      navigate("/login");
  }
     console.log("Product _id = ",_id);
   console.log("item = ",item)
   console.log("addtocart token = ",token)
      const res = await fetch("https://e-commerce-1-p1gt.onrender.com/api/product/add",{
      method:"POST",
      body:JSON.stringify({...item}),
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
  return (
   // 320 220 ,backgroundColor:"rgb(247, 246, 242)  width:"100%", height:"279px",      ,textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"
   <div className='flex justify-center cursor-pointer hover:shadow-xl' style={{paddingBottom:"50px", borderRadius:"30px",height:"487px", marginBottom:"15px"}} onClick={()=>navigate("/singleProduct",{state:{item}})}>
      <div className='flex flex-col h-full w-full'>
    {/* <div style={{width:"100%", height:"357px", paddingBottom:"50px", borderRadius:"30px"}} className='bg-blue-400'> */}
       <div style={{padding:"25px 25px 10px",backgroundColor:"#f5f5f5",borderRadius:"30px",width:"100%", height:"309px"}}>
        <img  style={{width:"100%", height:"100%", objectFit:"contain", borderRadius:"30px"}} src={image} alt="image" />
       </div>  
       {/* <div className='flex justify-between items-center'>
          <p style={{marginLeft:"6%",fontWeight:"bold", fontSize:"20px",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",width:"60%"}}>{title}</p>
          <p style={{marginRight:"6%",fontSize:"14px",fontWeight:"lighter"}}>Rs. {price}</p>
       </div> */}
       {/* <p style={{marginLeft:"6%", fontSize:"13px",color:"grey",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{desc}</p>
       <div className='flex justify-evenly p-2 w-full'> */}
       {/* <button style={{fontSize:"10px"}} className='bg-black text-white px-5 py-1 text-sm' onClick={addToCart}>Add to Cart</button>
       <button style={{fontSize:"10px",border:"1px solid grey"}} className='bg-white text-black px-5 py-1 text-sm'>Learn more</button> */}
       {/* </div> */}



       <div className='flex flex-col items-center' style={{paddingTop:"15px"}}>
       <h3 style={{fontWeight:"bold", fontSize:"20px",width:"100%", textAlign:"center"}}>{title}</h3>
       {/* <p style={{marginLeft:"6%", fontSize:"13px",color:"grey",textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap"}}>{desc}</p> */}
       <p style={{marginRight:"6%",fontSize:"28px",fontWeight:"bold"}}>Rs. {price}</p>
       </div>
    </div>
    </div>
  )
}

export default Card