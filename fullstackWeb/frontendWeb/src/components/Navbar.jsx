import React from 'react';
import Sidebar from './SideBar';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {

  return (
    <>
      <nav className="flex items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-50">
        {/* Left: Menu + Logo */}
        <div className="flex items-center gap-4">
          {/* <Bars3Icon className="w-6 h-6 cursor-pointer" /> */}
          {/* <img
          src="https://www.logo.wine/a/logo/YouTube/YouTube-Logo.wine.svg"
          alt="YouTube"
          className="h-6 m-20px"
        /> */}
        </div>

        {/* Middle: Search Bar */}
        <div className="flex items-center flex-1 max-w-xl mx-4">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-4 py-1 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-r-full">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          <button className="ml-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <MicrophoneIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          <VideoCameraIcon className="w-6 h-6 cursor-pointer" />
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <UserCircleIcon className="w-8 h-8 cursor-pointer text-gray-600" />
        </div>
      </nav>
      <Sidebar />
    </>
  );
};

export default Navbar;
