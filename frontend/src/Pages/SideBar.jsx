import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  HeartPulse,
  Home,
  Search,
  Users,
  Info,
  Phone,
  LogIn,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token"); // clear auth token
    setIsOpen(false); // close sidebar
    navigate("/login"); // redirect to login page
  };

  const links = [
    { to: "/", text: "Home", icon: <Home className="w-5 h-5" /> },
    {
      to: "/finddonors",
      text: "Find Donor",
      icon: <Search className="w-5 h-5" />,
    },
    { to: "/donor", text: "Become Donor", icon: <Users className="w-5 h-5" /> },
    { to: "/about", text: "About Us", icon: <Info className="w-5 h-5" /> },
    { to: "/contact", text: "Contact", icon: <Phone className="w-5 h-5" /> },
    { to: "/login", text: "Sign In", icon: <LogIn className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 bg-red-700 hover:bg-red-800 text-white p-2 rounded-lg shadow-md transition-all duration-300"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-transparent bg-opacity-30 z-40"
        ></div>
      )}

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-6 py-5 bg-white text-white shadow-md">
          <HeartPulse className="w-7 h-7 text-blue-600" />
          <h2 className="text-xl font-bold">
            <span className="text-red-600">Blood</span>
            <span className="text-blue-600">Route</span>
          </h2>
        </div>

        {/* Links */}
        <nav className="flex flex-col p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-100 hover:text-red-700 font-medium transition-all"
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 w-full text-center text-gray-500 text-sm">
          © 2025 BloodRoute
        </div>
      </div>
    </>
  );
};

export default Sidebar;
