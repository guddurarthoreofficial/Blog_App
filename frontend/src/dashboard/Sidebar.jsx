import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';

const Sidebar = ({ setComponent }) => {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponent = (value) => {
    setComponent(value);
    setShow(false); // Close sidebar on mobile after click
  };

  const gotoHome = () => {
    navigateTo('/');
    setShow(false); // Close sidebar on mobile
  };

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

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setShow(!show)}
      >
        {show ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
          h-full md:h-screen w-64 bg-white shadow-lg z-40
          fixed md:relative top-0 left-0
          transform ${show ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
        `}
      >
        {/* Profile section */}
        <div className="text-center p-4 border-b">
          <img
            src={profile?.photo?.url || "https://via.placeholder.com/150"}
            alt={profile?.name || "User"}
            className="w-24 h-24 mx-auto rounded-full object-cover"
          />
          <p className="text-lg font-semibold mt-2">{profile?.name || "Guest"}</p>
        </div>

        {/* Navigation buttons */}
        <ul className="p-4 space-y-4">
          <button
            onClick={() => handleComponent("My Blogs")}
            className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700 text-white"
          >
            MY BLOGS
          </button>
          <button
            onClick={() => handleComponent("Create Blog")}
            className="w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 text-white"
          >
            CREATE BLOG
          </button>
          <button
            onClick={() => handleComponent("My profile")}
            className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700 text-white"
          >
            MY PROFILE
          </button>
          <button
            onClick={gotoHome}
            className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700 text-white"
          >
            HOME
          </button>
          <button
            onClick={handleLogOut}
            className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700 text-white"
          >
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
};



export default Sidebar;
