import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & Description */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Cilli<span className="text-blue-500">Blog</span></h1>
          <p className="text-sm">A place where thoughts meet technology. Share, learn, and grow with insightful articles and developer stories.</p>
        </div>

        {/* Navigation Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Quick Links</h2>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-400">Blogs</Link></li>
            <li><Link to="/crators" className="hover:text-blue-400">Creators</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">Follow Us</h2>
          <div className="flex space-x-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500"><FaFacebook /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-300"><FaLinkedin /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white"><FaGithub /></a>
          </div>
        </div>

      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © {new Date().getFullYear()} CilliBlog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
