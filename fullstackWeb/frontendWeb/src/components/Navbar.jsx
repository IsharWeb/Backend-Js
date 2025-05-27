import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ isLoggedIn }) => {
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo/Brand */}
        <NavLink to="/" className="text-xl font-bold text-blue-600">
          Ishar Web
        </NavLink>

        {/* Nav Links */}
        <div className="space-x-4 flex items-center">
          <NavLink to="/" className={navLinkStyles}>Home</NavLink>
          <NavLink to="/about" className={navLinkStyles}>About</NavLink>
          <NavLink to="/contact" className={navLinkStyles}>Contact</NavLink>

          {/* Conditional Button */}
          {isLoggedIn ? (
            <NavLink
              to="/upload"
              className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Upload Video
            </NavLink>
          ) : (
            <NavLink
              to="/signin"
              className="px-4 py-1 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition"
            >
              Sign in
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
