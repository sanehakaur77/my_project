import React, { useState } from "react";
import axios from "axios";
import {
  Megaphone,
  Send,
  LayoutDashboard,
  Bell,
  User,
  CheckCircle,
  AlertCircle,
  Loader2,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-lg">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">
            <Link to="/admin">
              Admin<span className="text-red-600">Portal</span>
            </Link>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition">
            <Bell className="w-5 h-5" />
          </button>
          <div className="h-8 w-px bg-gray-200 mx-1"></div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 text-gray-500">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 mt-auto">
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AdminPortal. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0 text-sm text-gray-500">
          <a href="#" className="hover:text-red-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Terms of Service
          </a>
          <a href="#" className="hover:text-red-600 transition">
            Support
          </a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Sub-Component: Toast Notification ---
const Toast = ({ type, message, onClose }) => {
  if (!message) return null;
  const isError = type === "error";
  return (
    <div
      className={`fixed top-20 right-5 z-50 flex items-center p-4 rounded-lg shadow-xl border-l-4 animate-in slide-in-from-right-5 fade-in duration-300 ${
        isError ? "bg-white border-red-500" : "bg-white border-green-500"
      }`}
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 text-red-500 mr-3" />
      ) : (
        <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
      )}
      <div className="mr-6">
        <h4
          className={`text-sm font-bold ${
            isError ? "text-red-800" : "text-green-800"
          }`}
        >
          {isError ? "Error" : "Success"}
        </h4>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

// --- Main Component ---
const Announcement = () => {
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    if (!formData.title.trim() || !formData.message.trim()) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await axios.post(
        "http://localhost:8080/announcement/create",
        {
          title: formData.title,
          message: formData.message,
          createdBy: "Admin", // Ideally fetches from auth context
        }
      );

      setStatus({
        type: "success",
        message: res.data.message || "Announcement published successfully.",
      });
      setFormData({ title: "", message: "" });

      // Auto dismiss success message
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message:
          err.response?.data?.message || "Failed to publish announcement.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8">
        <Toast
          type={status.type}
          message={status.message}
          onClose={() => setStatus({ type: "", message: "" })}
        />

        <div className="max-w-2xl mx-auto">
          {/* Page Title Section */}
          <div className="mb-8 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Broadcast Center
            </h1>
            <p className="mt-2 text-gray-600">
              Create and distribute important updates to your users.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-3">
              <div className="bg-red-100 p-2 rounded-full">
                <Megaphone className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                New Announcement
              </h2>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Announcement Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., System Maintenance Scheduled"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400"
                />
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Message Content
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your detailed message here..."
                  className="w-full h-40 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all placeholder:text-gray-400 resize-none"
                ></textarea>
                <p className="text-xs text-gray-500 text-right">
                  {formData.message.length} characters
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end items-center gap-3">
              <button
                onClick={() => setFormData({ title: "", message: "" })}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition"
                disabled={loading}
              >
                Clear
              </button>
              <button
                onClick={submitHandler}
                disabled={loading || !formData.title || !formData.message}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-2 rounded-lg font-medium transition-all shadow-sm"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Publish Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Announcement;
