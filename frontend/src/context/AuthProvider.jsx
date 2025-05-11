import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();
  const [profile, setProfile] = useState();

  const [isAuthenticated,setIsAuthenticated] = useState();


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const {data} = await axios.get("http://localhost:3005/api/users/my-profile");
        // console.log(response.data);
        console.log(data);
        // setBlogs(response.data);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchBlogs = async () => {
      try {
        const {data} = await axios.get("http://localhost:3005/api/blogs/all-blogs");
        // console.log(response.data);
        console.log(data);
        // setBlogs(response.data);
        setBlogs(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
    fetchProfile();

  }, []);

  return (
    <AuthContext.Provider value={{ blogs,profile}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
