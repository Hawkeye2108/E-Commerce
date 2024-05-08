import React, { useState } from 'react'
import { useCartContext } from '../hooks/useCartContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Signup() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);

    const {dispatch} = useCartContext();
    const navigate = useNavigate();

   const signUp = async (e)=>{
   e.preventDefault();
   const data = {name,email,password};
   console.log(data);

    const res = await fetch("https://e-commerce-1-p1gt.onrender.com/api/user/register",{
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
       });
    const json = await res.json();
    console.log(json); 
    if(!res.ok){
        setError(json.error)
    }  
    if(res.ok){
        setName("");
        setEmail("");
        setPassword("");
        
        setError(null);

        dispatch({type:"SIGNUP",payload:json})
        localStorage.setItem("user",JSON.stringify(json));
        navigate("/collection")
    }
  }
  return (
    <div>
    <div className='flex flex-col' style={{height:"100vh"}}>
    <Navbar/>
    <div className='flex flex-1 justify-center items-center bg-slate-200' style={{height:"100vh"}}>
        <form action="" className='flex flex-col gap-4 p-12 pb-8 pt-9 bg-white' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:10}}>
            <h1 className='text-center font-bold text-3xl'>Sign Up</h1>
            <input type="text" placeholder='Name' value={name} onChange={ e => setName(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            <input type="email" placeholder='Email' value={email} onChange={ e => setEmail(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            <input type="password" placeholder='Password' value={password} onChange={ e => setPassword(e.target.value)} style={{padding:4,border:"1px solid grey"}}/>
            {error && <span className='text-red-600'>{error}</span>}
           
            <button style={{padding:4,color:"white",backgroundColor:"rgb(78, 100, 227)",borderRadius:1000}} onClick={signUp}>Sign Up</button>
            <p className='text-sm'>Already have an account?<Link to="/login" className='text-blue-400'> Log In</Link></p>
            <p className='w-64 text-xs text-gray-500'>Note: Password should have atleast one Capital letter, Small letter, Numerical value and Special character</p>
        </form>
    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Signup