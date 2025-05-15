import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState();

  const [profile, setProfile] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token ,setToken] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {
      try {
        // token should be let type variable because its value will change in every login. (in backend also)
        let token = localStorage.getItem("jwt"); // Retrieve the token directly from the localStorage (Go to login.jsx)
        console.log(token);
        if (token) {
          const { data } = await axios.get(
            "http://localhost:3005/api/users/my-profile", // ✅ 3005 instead of 4001
            {
              withCredentials: true,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
          setToken(token)
        }
      } catch (error) {
        console.log(error);
      }
    };


    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get("http://localhost:3005/api/blogs/all-blogs");
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
    <AuthContext.Provider value={{ blogs, profile, isAuthenticated ,setIsAuthenticated,token}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
