import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!email || !password || !role) {
      toast.warn("Please fill in all fields.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:3005/api/users/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json", // Use JSON since you're not sending FormData
          },
        }
      );

      toast.success(data.message || "Login successful!", {
        onClose: () => navigate("/dashboard"), // Redirect on success
        autoClose: 2000,
      });

      // Clear form fields
      setEmail("");
      setPassword("");
      setRole("");

    } catch (err) {
      console.error(err);
      const errorMessage = err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <form onSubmit={handleLogin}>
          <div className="font-semibold text-xl text-center mb-2">
            Cilli<span className="text-blue-500">Blog</span>
          </div>
          <h1 className="text-xl font-semibold mb-6 text-center">Login</h1>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />

          <p className="mb-4 text-sm">
            New User?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register Now
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Login;
