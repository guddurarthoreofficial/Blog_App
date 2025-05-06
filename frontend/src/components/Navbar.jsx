import React from 'react'
import { Link } from 'react-router-dom';



const Navbar = () => {

  return (
    <>
    <nav>
      <div className='flex justify-between container mx-auto'>
        {/* =========== logo ========= */}
        <div className='font-semibold text-xl'>
          Cilli<span className='text-blue-500'>Blog</span>
        </div>

      
        <div>
          <ul className='flex space-x-6'>
            <Link to="/">Home</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/creators">CREATORS</Link>
            <Link to="/about">ABOUT</Link>
            <Link to="/contact">CONTACT</Link>
          </ul>
        </div>

        <div className='space-x-2'>
          <Link to="/dashboard" className=' bg-blue-600  text-white font-semibold hover:bg-red-800 duration-300 px-4 rounded-md'>DASHBOARD</Link>
          <Link to="/login" className=' bg-red-600  text-white font-semibold hover:bg-blue-800 duration-300 px-4 rounded-md'>LOGIN</Link>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar;