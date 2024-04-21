import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { useCartContext } from '../hooks/useCartContext'
import { Link} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Collection() {
  const {email,cart,dispatch} = useCartContext();
  const [products,setProducts] = useState();
  

  useEffect(()=>{
     const fetchAllProducts = async ()=>{
            try{
                const res = await fetch("http://localhost:4000/api/product");
                console.log(res)
                const data = await res.json();
                console.log("data gathering")
                console.log(data)
                setProducts(data);
            }
            catch(error){
                console.log(error);
            }
     }
     fetchAllProducts();
    },[]);
    // console.log(products);
    
    const logOut = ()=>{
        localStorage.removeItem("user");
        dispatch({type:"LOGOUT"})
    }

    // const styles = {
    //     container: {
    //     //   backgroundColor: 'lightblue',
    //     //   padding: '20px',
    //     //   textAlign: 'center',
    //     //   padding:"20px 60px",
    //       '@media (min-width: 400px)': {
    //         backgroundColor: 'green',
    //         gridTemplateColumns: "1fr 1fr"
    //       }
    //     }
    //   };
  return (
    <>
    {/* Navabr */}
    {/* <nav className='bg-white flex flex-row items-center' style={{justifyContent:"space-between",height:"40px",margin:"10px 0", width:"100%",overflow:"hidden"}}>
        <div className='ml-6 font-normal'> 
            <ul className='flex flex-row gap-6' >
                <li className='cursor-pointer'>All</li>
                <li className='cursor-pointer'>Jewllery</li>
                <li className='cursor-pointer'>Watches</li>
                <li className='cursor-pointer'>Collections</li>
            </ul>
        </div> */}
        {/* <div className='flex-1 text-center'>
            <p className='font-bold text-lg'>Nairon</p>
        </div> */}
        {/* <div className='mr-16 ml-16 '>
            <ul className='flex flex-row gap-7 items-center'>
                <Link to="/cart">Cart {cart?.length ===0 || !cart? "(0)":`(${cart.length})`}</Link>    
                {email && (
                    <div className='hover:text-white hover:bg-red-500' style={{border:"1px solid rgb(20,20,20",padding:"4px 8px",borderRadius:"4px", cursor:"pointer"}} onClick={logOut}>Logout</div>
                )}
                {
                    !email && (
                        <>
                        <Link to="/signup" className='hover:text-white hover:bg-green-600 hover:border-4 hover:border-white' style={{border:"1px solid rgb(20,20,20",padding:"4px 8px",borderRadius:"4px", cursor:"pointer"}}>Signup</Link>
                        <Link to="/login" className='hover:text-white hover:bg-green-600 hover:border-4 hover:border-white' style={{border:"1px solid rgb(20,20,20",padding:"4px 8px",borderRadius:"4px", cursor:"pointer"} }>Login</Link>
                        </>
                    )
                }
                <li>
                </li>
            </ul>
        </div>
    </nav> */}
    <Navbar/>

    {/* Collection */}
    <div className='min-h-screen'>
        {/* Cards */}
        {/* <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"20px",width:"100%", backgroundColor:"yellow"}}> */}
           {/* {products && products.map((item)=>{
            return(
            <Card key={item._id} item={item}/>
            )
           })} */}
        {/* </div> */}

        {/* Next Collection */}
        <div className='w-full h-full p-5 justify-center md:justify-around' style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,300px)",gap:"30px"}}>
            {products && products.map((item)=>{
            return(
            <Card key={item._id} item={item}/>
            )
           })}
        </div>
    </div>
    {/* <div className='relative bottom-0 w-full'> */}
    <Footer/>
    {/* </div> */}
    </>
  )
}

export default Collection