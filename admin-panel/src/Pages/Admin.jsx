import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LogOut,
  MessageSquare,
  ShieldUser,
  ChevronLeft,
  ChevronRight,
  ChartNoAxesCombined,
  Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSucess, showError } from "../Utils";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    userCount: 0,
    suggestionCount: 0,
    reqCount: 0,
    donorCount: 0,
  });

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
    showSucess("Admin Logout Successfully!");
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/admin/getdata"
        );
        if (response.data.success) {
          setStats({
            userCount: response.data.userCount,
            suggestionCount: response.data.suggestionCount,
            reqCount: response.data.reqCount,
            donorCount: response.data.donorCount,
          });
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchStats();
  }, []);

  const extraCards = [
    {
      title: "Active Admins",
      value: 5,
      icon: <ShieldUser className="w-6 h-6 text-red-600" />,
      color: "bg-red-50",
    },
    {
      title: "Pending Approvals",
      value: 12,
      icon: <ClipboardList className="w-6 h-6 text-red-600" />,
      color: "bg-red-50",
    },
    {
      title: "Feedbacks",
      value: 8,
      icon: <MessageSquare className="w-6 h-6 text-red-600" />,
      color: "bg-red-50",
    },
    {
      title: "New Requests",
      value: 7,
      icon: <Users className="w-6 h-6 text-red-600" />,
      color: "bg-red-50",
    },
  ];

  const cards = [
    {
      title: "Total Users",
      value: stats.userCount,
      icon: <Users className="w-6 h-6 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Suggestions",
      value: stats.suggestionCount,
      icon: <MessageSquare className="w-6 h-6 text-white" />,
      color: "bg-green-500",
    },
    {
      title: "Requests",
      value: stats.reqCount,
      icon: <ClipboardList className="w-6 h-6 text-white" />,
      color: "bg-yellow-500",
    },
    {
      title: "Donors",
      value: stats.donorCount,
      icon: <LayoutDashboard className="w-6 h-6 text-white" />,
      color: "bg-red-500",
    },
  ];

  const chartData = [
    { name: "Users", value: stats.userCount },
    { name: "Suggestions", value: stats.suggestionCount },
    { name: "Requests", value: stats.reqCount },
    { name: "Donors", value: stats.donorCount },
  ];

  const COLORS = ["#3B82F6", "#10B981", "#FBBF24", "#EF4444"];

  return (
    <div className="flex h-screen bg-red-50">
      {/* Sidebar */}
      <div
        className={`bg-red-50 shadow-md transition-all duration-300 ${
          sidebarOpen ? "w-52" : "w-16"
        } flex flex-col`}
      >
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

        <div className="flex flex-col mt-4 space-y-2">
          <Link to="/">
            <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:rounded-xl hover:text-white">
              <LayoutDashboard className="mr-2 text-red-500 group-hover:text-white" />
              <span
                className={`${
                  sidebarOpen ? "block" : "hidden"
                } group-hover:text-white`}
              >
                Dashboard
              </span>
            </button>
          </Link>

          <Link to="/suggestions">
            <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:rounded-xl hover:text-white">
              <MessageSquare className="mr-2 text-red-500 group-hover:text-white" />
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Suggestions
              </span>
            </button>
          </Link>

          <Link to="/donor">
            <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:rounded-xl hover:text-white">
              <Users className="mr-2 text-red-500 group-hover:text-white" />
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Donors
              </span>
            </button>
          </Link>

          <Link to="/request">
            <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:rounded-xl hover:text-white">
              <ClipboardList className="mr-2 text-red-500 group-hover:text-white" />
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Requests
              </span>
            </button>
          </Link>
          <Link to="/announcement">
            <button className="group flex items-center p-2 hover:bg-red-500 rounded w-full hover:rounded-xl hover:text-white">
              <Megaphone className="mr-2 text-red-500 group-hover:text-white" />
              <span className={`${sidebarOpen ? "block" : "hidden"}`}>
                Announcement
              </span>
            </button>
          </Link>

          <button
            onClick={logout}
            className="flex items-center p-2 mt-auto mb-4 hover:bg-red-200 rounded text-red-600 w-full hover:rounded-xl hover:text-white"
          >
            <LogOut className="mr-2 text-red-500" />
            <span className={`${sidebarOpen ? "block" : "hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        {/* Header */}
        <div className="flex items-center px-5 gap-3 mb-5">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <ChartNoAxesCombined className="text-red-600" />
              <h2 className="text-2xl font-semibold">System Overview</h2>
            </div>
            <p className="text-gray-500 text-[14px] ml-7">
              Comprehensive Overview of Blood Management System
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="flex items-center p-5 bg-white shadow hover:shadow-lg transition duration-300 border-l-4 border-red-500 w-[90%] h-[150px] rounded-2xl"
            >
              <div
                className={`p-3 rounded-full ${card.color} mr-4 flex items-center justify-center`}
              >
                {card.icon}
              </div>

              <div>
                <p className="text-gray-500">{card.title}</p>
                <p className="text-2xl font-bold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Extra Cards ABOVE charts */}

        {/* Charts */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          {/* Bar Chart */}
          <div className="flex-1 bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Statistics - Bar Chart
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6">
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="w-full lg:w-96 bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Statistics - Pie Chart
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Original Cards BELOW charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {extraCards.map((card, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-5 bg-white shadow hover:shadow-lg transition duration-300 rounded-2xl"
            >
              {/* Icon */}
              <div
                className={`p-3 rounded-full ${card.color} w-12 h-12 flex items-center justify-center mb-4`}
              >
                {card.icon}
              </div>

              {/* Title & Description */}
              <div className="mb-4">
                <p className="font-semibold text-gray-800 text-lg">
                  {card.title}
                </p>
                <p className="text-gray-500 text-sm mt-1">{card.description}</p>
              </div>

              {/* Button */}
              <button className="bg-red-600 text-white px-4 py-2 rounded-xl w-full hover:bg-red-700 transition">
                {card.buttonText}
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Admin;
