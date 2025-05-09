import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>

      <nav className='shadow-lg px-4 py-2'>
        <div className='flex justify-between items-center container mx-auto '>
          {/* ================ logo ============= */}
          <div className='font-semibold text-xl'>
            Cilli<span className='text-blue-500'>Blog</span>
          </div>

          {/*================= nav menu ================ */}
          <div>
            <ul className='flex space-x-6'>
              <Link to="/" className=' hover:text-blue-500'>HOME</Link>
              <Link to="/blogs" className=' hover:text-blue-500'>BLOG</Link>
              <Link to="/crators" className=' hover:text-blue-500'>CREATORS</Link>
              <Link to="/about" className=' hover:text-blue-500'>ABOUT</Link>
              <Link to="/contact" className=' hover:text-blue-500'>CONTACT</Link>
            </ul>
          </div>

          {/* // ======== login button ====== */}

          <div className='space-x-2'>
            <Link to="/dashboard" className='bg-blue-600 text-white font font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded ' >DASHBOARD</Link>
            <Link to="/Login" className='bg-red-600 text-white font font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded ' >LOGIN </Link>
          </div>


          
        </div>
      </nav>

    </>
  )
}

export default Navbar