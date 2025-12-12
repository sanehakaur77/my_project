import React, { useState, useEffect, useCallback } from "react";
import {
  HeartPulse,
  Menu,
  X,
  UserCircle,
  LogOut,
  LayoutDashboard,
  Megaphone,
} from "lucide-react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSucess } from "../Utils/Utils";
import { Link } from "react-router-dom";

// --- Global Styles (for blur, custom animations, and dynamic underlines) ---
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
    }

    /* Keyframes for the mobile menu slide-down */
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .animate-slideDown {
      animation: slideDown 0.3s ease-out forwards;
    }

    /* Custom CSS for the floating effect */
    .floating-header {
      background-color: rgba(255, 255, 255, 0.98); /* Less transparent */
      backdrop-filter: blur(12px); /* Stronger blur */
      -webkit-backdrop-filter: blur(12px);
    }

    /* ADVANCED: Dynamic Underline Effect */
    .nav-link-dynamic {
      position: relative;
      overflow: hidden;
      display: inline-block;
    }

    .nav-link-dynamic::after {
      content: '';
      position: absolute;
      width: 100%;
      transform: scaleX(0);
      height: 2px;
      bottom: -6px; /* Position below the text */
      left: 0;
      background-color: #dc2626; /* red-600 */
      transform-origin: bottom right;
      transition: transform 0.3s ease-out;
    }

    .nav-link-dynamic:hover::after,
    .nav-link-dynamic:focus::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  `}</style>
);
import { useNavigate } from "react-router-dom";

// --- Profile Dropdown Component ---
const ProfileDropdown = ({ userName, onSignOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close the dropdown when clicking outside
  const handleOutsideClick = useCallback((event) => {
    if (event.target.closest("#profile-menu") === null) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  const initials = userName.charAt(0).toUpperCase();

  return (
    <div id="profile-menu" className="relative">
      {/* UPDATED: Profile Button with refined colors */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 pr-4 rounded-full transition duration-150 bg-red-800 hover:bg-red-700 text-white shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300/80"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* UPDATED: Initials Circle */}
        <div className="h-8 w-8 flex items-center justify-center rounded-full bg-white text-red-800 font-bold text-sm">
          {initials}
        </div>
        {localStorage.getItem("token") && (
          <span className="hidden lg:inline font-semibold text-sm">
            Welcome, {userName}!
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-3 w-60 rounded-xl shadow-2xl bg-white border border-gray-100 z-50 transform origin-top-right animate-slideDown"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="p-4 border-b border-gray-100">
            <p className="text-sm font-bold text-red-800 truncate">
              Signed in as:
            </p>
            <p className="text-sm text-gray-600">{userName}</p>
          </div>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150"
            role="menuitem"
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false); /* Nav to profile page */
            }}
          >
            <UserCircle className="w-5 h-5 mr-3" />
            <Link to="/profile"> View Profile</Link>
          </a>
          <button
            onClick={() => {
              onSignOut();
              setIsOpen(false);
            }}
            className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150 border-t border-gray-100"
            role="menuitem"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
          <button
            className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150 border-t border-gray-100"
            role="menuitem"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            <span>
              <Link to="/dashboard">Dashboard</Link>
            </span>
          </button>
          <button
            className="flex w-full items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150 border-t border-gray-100"
            role="menuitem"
          >
            <Megaphone className="w-5 h-5 mr-3" />
            <span>
              <Link to="/announcements">Announcements</Link>
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

// --- Main Navigation Bar Component ---
const NavBar = () => {
  const [userName, setUserName] = useState(""); // Mock authenticated user
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:8080/api/decode/getuser", {
        headers: {
          Authorization: token,
        },
      });
      setUserName(res.data.user.name);
    };
    fetchData();
  }, []);
  // --- MOCK AUTHENTICATION/STATE ---

  // Mock sign out function
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setTimeout(() => {
      showSucess("Logout successfully!");
    }, 1000);

    setIsAuthenticated(false);
  };

  const navLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact Us" },
    { href: "/request-blood", text: "Request Blood" },
    { href: "/about", text: "About Us" },
  ];

  return (
    <>
      <GlobalStyles />
      <header className="sticky top-0 z-50 floating-header shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* --- Logo (UPDATED: Deeper color for prominence) --- */}
          <a
            href="/"
            className="text-3xl font-extrabold text-red-800 flex items-center group"
          >
            <HeartPulse className="text-blue-600 mr-2 h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
            Blood<span className="text-gray-900">Route</span>
          </a>

          {/* --- Desktop Navigation (UPDATED: Dynamic Underline) --- */}
          <nav className="hidden md:flex items-center gap-4 text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                // ADVANCED: Applied custom class for animated underline
                className="px-2 py-2 rounded-lg font-semibold text-sm hover:text-red-600 transition duration-150 tracking-wider uppercase nav-link-dynamic"
              >
                {link.text}
              </a>
            ))}
            {/* Call to Action Button */}
            <a
              href="/donor"
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl transition-all duration-300 transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-red-400/50"
            >
              Become a Donor
            </a>
          </nav>

          {/* --- Profile & Mobile Button Group --- */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <ProfileDropdown userName={userName} onSignOut={handleSignOut} />
            ) : (
              <a
                href="/login"
                className="bg-red-800 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition duration-150 shadow-lg hidden sm:block"
              >
                Sign In
              </a>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* --- Mobile Menu Panel --- */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-2xl z-40 animate-slideDown border-t border-gray-200">
            <nav className="flex flex-col p-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-bold text-red-800 hover:bg-red-50 hover:text-red-600 transition duration-150 uppercase tracking-wider"
                >
                  {link.text}
                </a>
              ))}
              <a
                href="/donor"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center mt-3 px-4 py-3 text-base font-bold rounded-lg bg-red-600 text-white shadow-md hover:bg-red-700 transition duration-300"
              >
                Become a Donor
              </a>
              {!isAuthenticated && (
                <a
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center mt-2 px-4 py-3 text-base font-bold rounded-lg bg-red-800 text-white shadow-md hover:bg-red-700 transition duration-300"
                >
                  Sign In
                </a>
              )}
            </nav>
          </div>
        )}
      </header>
      <ToastContainer />
    </>
  );
};

// Exporting the NavBar component to be used as the main app
export default NavBar;
