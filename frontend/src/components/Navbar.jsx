import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";



const Navbar = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <nav className='shadow-lg px-4 py-2'>
        <div className='flex justify-between items-center container mx-auto '>
          {/* ================ logo ============= */}
          <div className='font-semibold text-xl'>
            Cilli<span className='text-blue-500'>Blog</span>
          </div>

          {/*================= Destop ================ */}
          <div className=''>
            <ul className='space-x-6 hidden md:flex'>
              <Link to="/" className=' hover:text-blue-500'>HOME</Link>
              <Link to="/blogs" className=' hover:text-blue-500'>BLOG</Link>
              <Link to="/crators" className=' hover:text-blue-500'>CREATORS</Link>
              <Link to="/about" className=' hover:text-blue-500'>ABOUT</Link>
              <Link to="/contact" className=' hover:text-blue-500'>CONTACT</Link>
            </ul>

            <div className='md:hidden' onClick={() => setShow(!show)}>
              {show ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
          </div>

          {/* // ======== login button ====== */}

          <div className='space-x-2'>
            <Link to="/dashboard" className='bg-blue-600 text-white font font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded hidden md:flex' >DASHBOARD</Link>
            <Link to="/Login" className='bg-red-600 text-white font font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded hidden md:flex' >LOGIN </Link>
          </div>


        </div>

        {/*  =================== Mobile navbaar============  */}
        {show && (
          <div className='bg-white'>
            <ul className='flex  md:hidden h-screen items-center text-xl  flex-col  space-y-3'>
              <Link to="/" className=' hover:text-blue-500'>HOME</Link>
              <Link to="/blogs" className=' hover:text-blue-500'>BLOG</Link>
              <Link to="/crators" className=' hover:text-blue-500'>CREATORS</Link>
              <Link to="/about" className=' hover:text-blue-500'>ABOUT</Link>
              <Link to="/contact" className=' hover:text-blue-500'>CONTACT</Link>
            </ul>
          </div>
        )}


      </nav>

    </>
  )
}

export default Navbar