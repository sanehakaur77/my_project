// src/components/Navbar.jsx

import React from "react";
import { Search, Bell, User, HeartPlus } from "lucide-react";
// Using lucide-react for modern, clean icons (popular choice with Tailwind)

const Navbar = () => {
  // Define the accent color from your dashboard (Red/Maroon)
  const ACCENT_COLOR = "text-red-600";

  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 1. Logo/Branding (Left Side) */}
          <div className="flex items-center">
            <div className="flex">
              <span
                className={`text-xl font-extrabold tracking-tight ${ACCENT_COLOR}`}
              >
                Blood
              </span>
              <span
                className={`text-xl font-extrabold tracking-tight ${ACCENT_COLOR}`}
              >
                Route
              </span>
            </div>
          </div>

          {/* 2. Search Bar (Center/Mid-Left) */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users, requests, or data..."
                className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* 3. User Actions/Icons (Right Side) */}
          <div className="flex items-center space-x-4">
            {/* Notification Icon */}
            <button
              type="button"
              className={`p-2 rounded-full hover:bg-gray-100 ${ACCENT_COLOR} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150`}
            >
              <Bell className="h-6 w-6" />
              {/* Optional: Add a small red dot badge for notifications */}
              <span className="absolute top-2 right-12 block h-2 w-2 rounded-full ring-2 ring-white bg-yellow-400" />
            </button>

            {/* Profile Icon/Avatar */}
            <button
              type="button"
              className="flex items-center space-x-2 text-sm font-medium text-gray-700 p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              <User className={`h-6 w-6 ${ACCENT_COLOR}`} />
              <span className="hidden md:inline">Admin User</span>
              {/* Hide name on small screens */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
