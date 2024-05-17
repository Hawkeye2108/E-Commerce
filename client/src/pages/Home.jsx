import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  const keyframes = `
  @keyframes moveRight {
    from {
      // transform: translateX(100%);
      left:-100vw;
    }
    to {
      // transform: translateX(100%);
      left:0vw;
    }
  }`
  return (
    <>
    <div>
    <div className='flex flex-col ' style={{height:"100vh"}}>
     {/* Navbar */}
    <Navbar/>
    {/* <nav className='bg-white flex flex-row items-center' style={{justifyContent:"space-between",height:"40px",margin:"10px 0",overflow:"hidden"}}>
    
        <p className='sm:hidden cursor-pointer hover:text-green-500' onClick={()=>setToggle(!toggle)}>Hello</p>
        
        <div className='ml-6 font-normal hidden sm:block'> 
            <ul className='flex flex-row gap-6' >
                <li className='cursor-pointer'>Shop all</li>
                <li className='cursor-pointer'>Rewards</li>
                <li className='cursor-pointer'>Sale</li>
                <li className='cursor-pointer'>About us</li>
            </ul>
            
        </div>
        <div className='flex-1 text-center'>
            <p className='font-bold text-lg'>Nairon</p>
        </div>
        <div className='mr-16 ml-16 '>
            <ul className='flex flex-row gap-7 '>
                <li>Account</li>
                <li>Cart</li>
            </ul>
        </div>
    </nav>
    {  toggle &&
          <div style={{backgroundColor:"rgb(250, 250, 250)",height:'calc(100vh - 60px)',position:"absolute",width:"100%",display:"flex",marginTop:"60px"}} className={`transition-all ease-in duration-500 ${toggle?'top-50 bg-slate-500':'left-[-400px]'}`}>
            <style>{keyframes}</style>
            <div className='flex-1 border-r-2'>
            <ul className='flex flex-col gap-7 mt-8'>
                <li className='cursor-pointer border-b-2'><Link to="/login"><p className='ml-4'>Log In</p></Link></li>
                <li className='cursor-pointer border-b-2'><Link to="/login"><p className='ml-4'>Sign Up</p></Link></li>
                <li className='cursor-pointer border-b-2'><p className='ml-4'>Shop all</p></li>
                <li className='cursor-pointer border-b-2'><p className='ml-4'>Rewards</p></li>
                <li className='cursor-pointer border-b-2'><p className='ml-4'>Sale</p></li>
                <li className='cursor-pointer border-b-2'><p className='ml-4'>About us</p></li>
            </ul>
            </div>
            <div style={{width:"40px"}}>
              <div className='cursor-pointer'>close</div>
            </div>
          </div>
        } */}
    {/* Hero */}
    <div className='bg-amber-600 flex-1 flex flex-col justify-center items-center w-full h-full'>
      <h1 className='text-5xl text-white font-bold text-center m-4' style={{maxWidth:"500px"}}>Find the book you're looking for</h1>
      <p className='text-2xl text-white font-light'>For students within campus</p>
      <div className=' w-full flex justify-center'>
        <button className='p-1 text-black bg-white px-8 font-bold m-3' style={{border:" 1px solid white"}}>
          <Link to="/productForm">Sell Book</Link>
        </button>
        <button className='p-1 text-white bg-transparent px-8 font-bold m-3' style={{border:" 2px solid white"}}>
         <Link to="/collection"> See collections</Link>
       </button>
      </div>
      </div>
      </div>
      {/* Footer  */}
      <Footer/>
      
    </div>
    </>
  )
}

export default Home