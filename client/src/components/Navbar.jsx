import React, { useState } from 'react'
import { FiMenu } from "react-icons/fi";
import { IoCartOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useCartContext } from '../hooks/useCartContext';

const Navbar = () => {
const {email,cart, dispatch} = useCartContext();
const [toggle, setToggle] = useState(false);
const navLinks = [{
    name:"Log In",
    link:"/login"
    },
    {
    name:"Sign Up",
    link:"/login"
   },
   {
    name:"Home",
    link:"/"
   },
   {
    name:"Collection",
    link:"/collection"
   },
]

const logOut = ()=>{
    localStorage.removeItem("user");
    dispatch({type:"LOGOUT"})
}
if(cart && cart.length!=0)
console.log("cart.length = ",cart.length)
  return (
    <nav className='flex justify-between items-center px-2 py-2 lg:px-7 bg-white shadow-2xl'>
        <div className='flex gap-8 items-center ml-2'>
            <div className='flex items-center gap-5'>
          <FiMenu className='text-2xl cursor-pointer lg:hidden' onClick={()=>setToggle(true)}/>
          <Link to="/" className='text-2xl font-serif font-bold'>Book Bazaar</Link>
          </div>
                <Link to="/" className='hidden lg:block text-xl font-medium text-gray-400 hover:text-black'>Home</Link>
                <Link to="/collection" className='hidden lg:block text-xl font-medium text-gray-400 hover:text-black'>Collection</Link>
        </div>
        {/* Sidebar  */}
         <div className={`text-black bg-white shadow-2xl flex flex-col absolute z-10 top-0 left-0 h-screen w-56 p-7 gap-8 ${toggle?"translate-x-0":"-translate-x-full"} transition-all`} >
           <IoClose className='text-3xl mt-0 mb-8 cursor-pointer self-end' onClick={()=>setToggle(false)}/>
             {!email && <Link to="/login" className='font-bold text-xl text-green-600'>Log In</Link>}
             {!email && <Link to="/signup" className='font-bold text-xl text-green-600'>Sign Up</Link>}
             <Link to="/" className='font-bold text-xl'>Home</Link>
             <Link to="/collection" className='font-bold text-xl'>Collection</Link>
             {email && <Link to="/" className='font-bold text-xl text-red-500' onClick={logOut}>Log out</Link>}
         </div>
        <div className='mr-2 flex items-center'>

       
        <div className='relative'>
        <Link to="/cart">
       <IoCartOutline className='text-3xl'/>
       { cart && cart.length!=0 ?
        <div className='absolute -top-1 -right-2 bg-red-300 rounded-full h-5 w-5 flex justify-center items-center text-md'>{cart.length}</div>
        : null
       }
       </Link>
       </div>  
       <div className='hidden lg:block gap-4 mx-4'>
        <div className='flex items-center gap-4'>
        {
                    !email && (
                        <>
                        <Link to="/signup" className='hover:text-white hover:bg-green-600 hover:border-4 hover:border-white' style={{border:"1px solid rgb(20,20,20",padding:"4px 8px",borderRadius:"4px", cursor:"pointer"}}>Signup</Link>
                        <Link to="/login" className='hover:text-white hover:bg-green-600 hover:border-4 hover:border-white' style={{border:"1px solid rgb(20,20,20",padding:"4px 8px",borderRadius:"4px", cursor:"pointer"} }>Login</Link>
                        </>
                    )
        }
        {email && (
                    <div className='hover:text-white hover:bg-red-500' style={{border:"1px solid rgb(20,20,20",padding:"4px 8px",borderRadius:"4px", cursor:"pointer"}} onClick={logOut}>Logout</div>
        )
        }
        </div>
        </div>

        </div>
    </nav>
  )
}

export default Navbar