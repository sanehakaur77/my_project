import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LogOut,
  MessageSquare,
  ShieldUser,
  ChevronLeft,
  ChevronRight,
  Megaphone,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className={`bg-red-50 shadow-md transition-all duration-300 ${
        sidebarOpen ? "w-52" : "w-16"
      } flex flex-col`}
    >
      {/* Top Section */}
      <div className="flex items-center justify-between p-4 border-b-2 border-b-red-500">
        <div className="flex items-center gap-3">
          {sidebarOpen && (
            <div className="w-7 h-7 flex items-center bg-red-200 justify-center rounded-xl">
              <ShieldUser className="text-red-500" />
            </div>
          )}
          <h1
            className={`font-bold text-lg text-red-500 ${
              sidebarOpen ? "block" : "hidden"
            }`}
          >
            Admin
          </h1>
        </div>

        {sidebarOpen ? (
          <ChevronLeft className="cursor-pointer" onClick={toggleSidebar} />
        ) : (
          <ChevronRight
            className="cursor-pointer text-red-500 w-7 h-7 mr-2"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Menu Items */}
      <div className="flex flex-col mt-4 space-y-2">
        <Link to="/admin">
          <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:text-white">
            <LayoutDashboard className="mr-2 text-red-500 group-hover:text-white" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Dashboard
            </span>
          </button>
        </Link>

        <Link to="/suggestions">
          <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:text-white">
            <MessageSquare className="mr-2 text-red-500 group-hover:text-white" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Suggestions
            </span>
          </button>
        </Link>

        <Link to="/donor">
          <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:text-white">
            <Users className="mr-2 text-red-500 group-hover:text-white" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Donors
            </span>
          </button>
        </Link>

        <Link to="/request">
          <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:text-white">
            <ClipboardList className="mr-2 text-red-500 group-hover:text-white" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Requests
            </span>
          </button>
        </Link>
        <Link to="/announcement">
          <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:text-white">
            <Megaphone className="mr-2 text-red-500 group-hover:text-white" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Announcements
            </span>
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center p-2 mt-auto mb-4 hover:bg-red-200 rounded text-red-600 w-full hover:text-white"
        >
          <LogOut className="mr-2 text-red-500" />
          <span className={`${sidebarOpen ? "block" : "hidden"}`}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
