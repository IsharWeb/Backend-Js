// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-10 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center md:flex-row justify-between text-center md:text-left">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} Ishar Web. All rights reserved.</p>
        <div className="mt-2 md:mt-0">
          <Link to="/" className="text-gray-600 hover:text-blue-600 mx-2">Home</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-600 mx-2">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 mx-2">Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
