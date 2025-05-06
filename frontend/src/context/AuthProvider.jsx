import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();

  useEffect(() => {
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
  }, []);

  return (
    <AuthContext.Provider value={{ blogs }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
