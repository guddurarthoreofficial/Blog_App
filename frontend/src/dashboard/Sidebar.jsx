import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ setComponent }) => {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponent = (value) => {
    setComponent(value);
    setShow(false);
  };

  const gotoHome = () => {
    navigateTo('/');
    setShow(false);
  };

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await axios.get("http://localhost:3005/api/users/logout", { withCredentials: true });
      setIsAuthenticated(false);
      alert("Logout successful");
      navigateTo('/login');
    } catch (err) {
      alert(err.message || "Logout failed");
    }
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setShow(!show)}
      >
        {show ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`
          fixed md:fixed top-0 left-0 h-screen w-full md:w-1/5 bg-white shadow-lg z-40 transform
          ${show ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block transition-transform duration-300 ease-in-out
        `}
      >
        <div className="text-center p-4 border-b">
          <img
            src={profile?.photo?.url}
            alt={profile?.name}
            className="w-24 h-24 mx-auto rounded-full"
          />
          <p className="text-lg font-semibold mt-2">{profile?.name}</p>
        </div>

        <ul className="p-4 space-y-4">
          <button onClick={() => handleComponent("My Blogs")} className="w-full px-4 py-2 bg-green-500 rounded-lg hover:bg-green-700">
            MY BLOGS
          </button>
          <button onClick={() => handleComponent("Create Blog")} className="w-full px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700">
            CREATE BLOG
          </button>
          <button onClick={() => handleComponent("My Profile")} className="w-full px-4 py-2 bg-pink-500 rounded-lg hover:bg-pink-700">
            MY PROFILE
          </button>
          <button onClick={gotoHome} className="w-full px-4 py-2 bg-yellow-500 rounded-lg hover:bg-yellow-700">
            HOME
          </button>
          <button onClick={handleLogOut} className="w-full px-4 py-2 bg-red-500 rounded-lg hover:bg-red-700">
            LOGOUT
          </button>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;