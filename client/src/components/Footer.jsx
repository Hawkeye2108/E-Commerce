import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='bg-blue-600 flex flex-col  text-white p-4 w-full' style={{backgroundColor:"#032b5f"}}>
        <div className='flex gap-6 justify-around'>
        <div className='font-mid flex flex-col gap-3'>
          <h3 className='font-bold text-white'>About the store</h3>
          <Link to="/" className='text-gray-400'>Home</Link>
          <Link to="/collection" className='text-gray-400'>Collection</Link>
        </div>
        <div className='font-mid text-gray-400 flex flex-col gap-3'>
          <h3 className='font-bold text-white'>Address</h3> 
          <p >Sector-62 Noida</p>
        </div>
        <div className='font-mid text-gray-400 flex flex-col gap-3'>
          <h3 className='font-bold text-white'>Get in touch</h3>
          <p>Email: bookbazaar@gmail.com</p>
          <p>Phone No. : +91 9999999999</p>
        </div>
        </div> 
        <div className='flex gap-5 pt-5 pb-1 text-gray-400 text-sm justify-center'>
            <p>Terms of purchase</p>
            <p>Security and privacy</p>
            <p>Newsletter</p>
              
        </div>
    </div>
  )
}

export default Footer