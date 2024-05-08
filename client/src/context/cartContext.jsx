import { createContext, useEffect, useReducer } from "react";

export const CartContext = createContext();

const fetchUserDetails = async(user)=>{
  console.log("fetchUserDetails is called")
   const res  = await fetch("https://e-commerce-1-p1gt.onrender.com/api/user/details",{
     method:"POST",
     body:JSON.stringify(user),
     headers:{
      "Content-Type":"application/json",
      "authorization":`bearer ${user.token}`
     }
   });
   if(res.ok){
    const json = await res.json();
    console.log("cart = ",json);
    return json;
   }
   else{
    return [];
   }
}


const cartReducer = (state,action)=>{
  switch(action.type){
    case "ADD_TO_CART":
        console.log("ADD to cart  = ",action.payload)
        return {...state, cart:action.payload}
    case "REMOVE_FROM_CART":
        console.log("remove from cart = ",action.payload)
         return {...state, cart:action.payload}
    case "SIGNUP":
        return {...action.payload};  
    case "LOGIN":
      // console.log("action payload login = ",action.payload)
      // const cart  = await fetchUserDetails(action.payload);
      // console.log("login cart = ",cart)
      //    return {...action.payload,cart};
       return action.payload;
    case "LOGOUT":
      console.log("LOGOUT is called state = ",state);
      console.log("LOGOUT is called action.payload = ",action.payload);
        return null;   
    case "SET_CART": 
        return {...state,cart:action.payload};   
    case "ORDERED":
        return {...state,cart:action.payload}     

    default: return state;
  }
}

export const CartContextProvider = ({children})=>{
  const [state, dispatch] = useReducer(cartReducer, {
    user:null
  });

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    // if user exists
    if(user){
      //  dispatch({type:"LOGIN",payload:user})
       const cartDetails= async ()=>{
       const cart = await fetchUserDetails(user);
       console.log("useEffeect cart = ",cart)
       user.cart = cart;
       console.log("sign up user = ",user)
       dispatch({type:"SIGNUP",payload:user})
       }
       cartDetails();
    }

  },[]);
 
  console.log("CartContextProvider is called")
  console.log("state = ",state);
  return (
    <CartContext.Provider value={{dispatch,...state}}>
        {children}
    </CartContext.Provider>
  )
}