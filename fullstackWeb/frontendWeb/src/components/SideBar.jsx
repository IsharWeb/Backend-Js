import React, { useState } from 'react';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  TvIcon,
  BookOpenIcon,
  ClockIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { name: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
    { name: 'Explore', icon: <MagnifyingGlassIcon className="w-5 h-5" /> },
    { name: 'Subscriptions', icon: <TvIcon className="w-5 h-5" /> },
    { name: 'Library', icon: <BookOpenIcon className="w-5 h-5" /> },
    { name: 'History', icon: <ClockIcon className="w-5 h-5" /> },
    { name: 'Upload Video', icon: <ArrowUpTrayIcon className="w-5 h-5" /> },
    { name: 'Dashboard', icon: <ChartBarIcon className="w-5 h-5" /> },
    { name: 'Users', icon: <UsersIcon className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen py-20  bg-gray-100">
      {/* Always Visible Toggle Button */}
      <button
        className="absolute  hover:bg-slate-100 top-4 left-4 z-52 text-gray-800"
        onClick={toggleSidebar}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full  w-64 bg-white text-gray-900 transform transition-transform duration-300 ease-in-out py-10 z-50 rounded-r-2xl
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-4 text-lg font-bold">MyTube</div>
        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className="flex items-center px-3 py-2 rounded-lg hover:bg-slate-100 transition"
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-0 md:ml-64">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome to MyTube Dashboard</h1>
        <p className="mt-4 text-gray-600">This is where your content will go.</p>
      </div>
    </div>
  );
};

export default Sidebar;
