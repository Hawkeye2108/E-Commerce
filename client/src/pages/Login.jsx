import React, { useState } from 'react'
import { useCartContext } from '../hooks/useCartContext';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(null);

  const {dispatch} = useCartContext();
 const navigate = useNavigate();
  const logIn = async (e)=>{
    e.preventDefault();
    console.log(email,password);

    const res = await fetch("http://localhost:4000/api/user/login",{
      method:"post",
      body:JSON.stringify({email,password}),
      headers:{
        "Content-Type":"application/json"
      }
    })

    const json = await res.json();
    console.log("json = ",json)

    if(res.ok){
      setEmail("");
      setPassword("");
      setError(null);
      dispatch({type:"LOGIN", payload:json})
      localStorage.setItem("user",JSON.stringify(json));
      navigate("/collection")
    }
    if(!res.ok){    
      setError(json.error);
    }
  }
  return (
    <div>
    <div className='flex flex-col' style={{height:"100vh"}}>
    <Navbar/>
    <div className='flex flex-1 justify-center items-center bg-slate-200'>
        <form action="" className='flex flex-col gap-4 p-8 py-12 pt-9 bg-white items-center' style={{boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px",borderRadius:10}}>
            <h1 className='text-center font-bold text-3xl'>Log In</h1>
            <input type="email" placeholder='Email' value={email} onChange={ e => setEmail(e.target.value)} style={{padding:4,border:"1px solid grey",width:"80%"}}/>
            <input type="password" placeholder='Password' value={password} onChange={ e => setPassword(e.target.value)} style={{padding:4,border:"1px solid grey",width:"80%"}}/>
            {error && <span className='text-red-600'>{error}</span>}
            <button style={{padding:4,color:"white",backgroundColor:"rgb(78, 100, 227)",borderRadius:1000,width:"80%"}} onClick={logIn}>Log In</button>
            <p className='text-sm'>Doesn't have an account? Create one<Link to="/signup" className='text-blue-400'> Sign Up</Link></p>
        </form>
    </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Login