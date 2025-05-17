import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { Routes, Route, useLocation } from 'react-router-dom';
import Blogs from './pages/Blogs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Creators from './pages/Creators';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthProvider';
import UpdateBlog from './dashboard/UpdateBlog';
import Details from './pages/Details';




function App() {
  const location = useLocation();
  const hideNavbarFooter = ["/dashboard", "/login", "/register"].includes(location.pathname.toLowerCase());

  const { blogs } = useAuth();
  console.log(blogs);

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/creators" element={<Creators />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />



        {/*   update page routes */}
        <Route path="/blog/:id" element={<Details />} />

        {/*   update page routes */}
        <Route path="/blog/update/:id" element={<UpdateBlog />} />
      </Routes>

      {!hideNavbarFooter && <Footer />}


    </>
  );
}

export default App;
