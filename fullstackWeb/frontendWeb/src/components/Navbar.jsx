
import React, { useState } from 'react';
import Sidebar from './SideBar';
import { RegisterUser, LoginUser } from '../pages/Index';
import {
  MagnifyingGlassIcon,
  MicrophoneIcon,
  VideoCameraIcon,
  BellIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {

  const [showAuth, setShowAuth] = useState(false);
  const [isRegister, setIsRegister] = useState(true);

  const toggleAuthMenu = () => {
    setShowAuth(!showAuth);
  };



  return (
    <>

      <nav className="flex flex-wrap items-center justify-between px-4 py-2 bg-white shadow-md sticky top-0 z-50">
        {/* Left: Logo (You can add logo or text here) */}
        <div className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0">
          {/* Placeholder for Logo */}
          {/* <h1 className="text-xl font-bold text-gray-800">MyTube</h1> */}
        </div>

        {/* Middle: Search Bar */}
        <div className="flex items-center w-full sm:w-2xl flex-grow sm:flex-grow-0 max-w-full sm:max-w-xl px-5 sm:mb-0">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow px-4 py-1 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-r-full">
            <MagnifyingGlassIcon className="w-5 h-5" />
          </button>
          <button className="ml-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <MicrophoneIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Right: Icons */}
        {/* <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
          <VideoCameraIcon className="w-6 h-6 cursor-pointer" />
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <UserCircleIcon id='user' className="w-8 h-8 cursor-pointer text-gray-600" />
          {
            
          }
          <RegisterUser />
        </div> */}


        <div className="relative flex items-center gap-4 w-full sm:w-auto justify-end">
          <VideoCameraIcon className="w-6 h-6 cursor-pointer" />
          <BellIcon className="w-6 h-6 cursor-pointer" />
          <UserCircleIcon id="user" className="w-8 h-8 cursor-pointer text-gray-600" onClick={toggleAuthMenu} />

          {showAuth && (
            <div className="absolute right-0 top-12 w-[320px] bg-white shadow-lg rounded-lg p-4 z-50 max-h-[420px] overflow-y-auto">
              <div className="flex justify-between mb-2 border-b pb-2">
                <button
                  className={`w-1/2 py-2 text-sm font-semibold ${isRegister ? 'border-b-2 border-black' : ''}`}
                  onClick={() => setIsRegister(true)}
                >
                  Register
                </button>
                <button
                  className={`w-1/2 py-2 text-sm font-semibold ${!isRegister ? 'border-b-2 border-black' : ''}`}
                  onClick={() => setIsRegister(false)}
                >
                  Login
                </button>
              </div>

              {/* Scrollable form content */}
              <div className="space-y-4">
                {isRegister ? <RegisterUser /> : <LoginUser />}
              </div>
            </div>
          )}
        </div>
      </nav>

      <Sidebar />
    </>
  );
};

export default Navbar;
