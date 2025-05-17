import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated } = useAuth();

  console.log(profile);
  console.log(isAuthenticated);


  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3005/api/users/logout", {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      toast.success("Logout successful");
      navigateTo('/login');
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };


  const navigateTo = useNavigate();





  const handleCloseMenu = () => setShow(false);
  return (
    <>
      <nav className='shadow-lg px-4 py-2'>
        <div className='flex justify-between items-center container mx-auto'>
          {/* Logo */}
          <div className='font-semibold text-xl'>
            Cilli<span className='text-blue-500'>Blog</span>
          </div>

          {/* Desktop Menu */}
          <div>
            <ul className='space-x-6 hidden md:flex'>
              <li><Link to="/" className='hover:text-blue-500'>HOME</Link></li>
              <li><Link to="/blogs" className='hover:text-blue-500'>BLOG</Link></li>
              <li><Link to="/creators" className='hover:text-blue-500'>CREATORS</Link></li>
              <li><Link to="/about" className='hover:text-blue-500'>ABOUT</Link></li>
              <li><Link to="/contact" className='hover:text-blue-500'>CONTACT</Link></li>
            </ul>

            {/* Mobile Toggle Icon */}
            <div className='md:hidden' onClick={() => setShow(!show)}>
              {show ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
            </div>
          </div>

          {/*  Dashboard && Login Buttons */}

          <div className='space-x-2 hidden md:flex'>

            {(isAuthenticated && profile.role === "admin") ? <Link to="/dashboard" className='bg-blue-600 text-white font-semibold hover:bg-blue-800 duration-300 px-4 py-2 rounded'>DASHBOARD</Link> : ""}

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGIN
              </Link>
            ) : (
              <button
                onClick={handleLogOut}
                className="bg-red-600 text-white font-semibold hover:bg-red-800 duration-300 px-4 py-2 rounded"
              >
                LOGOUT
              </button>
            )}

          </div>
        </div>

        {/* Mobile Navbar */}
        {show && (
          <div className='bg-white md:hidden'>
            <ul className='flex flex-col items-center text-xl space-y-4 py-4 h-screen'>
              <li><Link to="/" onClick={handleCloseMenu} className='hover:text-blue-500'>HOME</Link></li>
              <li><Link to="/blogs" onClick={handleCloseMenu} className='hover:text-blue-500'>BLOG</Link></li>
              <li><Link to="/creators" onClick={handleCloseMenu} className='hover:text-blue-500'>CREATORS</Link></li>
              <li><Link to="/about" onClick={handleCloseMenu} className='hover:text-blue-500'>ABOUT</Link></li>
              <li><Link to="/contact" onClick={handleCloseMenu} className='hover:text-blue-500'>CONTACT</Link></li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
