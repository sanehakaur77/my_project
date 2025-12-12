import React from "react";
import { Facebook, Instagram, Linkedin, Twitter, Heart } from "lucide-react";
import { HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="">
          <h2 className="text-2xl font-bold text-white">
            <div className="flex items-center">
              <HeartPulse className="text-blue-500" />
              <span className="text-red-500 px-0.5">Blood</span>
              <span className="text-blue-600">Route</span>
            </div>
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Saving lives starts with you. Donate blood and be a hero for someone
            in need.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="hover:text-red-500">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donor" className="hover:text-red-500">
                Register as Donor
              </Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-red-500">
                Find Donors
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-red-500">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-red-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Policies</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="hover:text-red-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-red-500">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-red-500">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-red-500">
              <Instagram />
            </a>
            <a href="#" className="hover:text-red-500">
              <Facebook />
            </a>
            <a href="#" className="hover:text-red-500">
              <Linkedin />
            </a>
            <a href="#" className="hover:text-red-500">
              <Twitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <p className="flex justify-center items-center gap-1">
          Made with <Heart className="w-4 h-4 text-red-500" /> by{" "}
          <span className="text-red-500 font-semibold">Saneha</span>
        </p>
        <p className="text-gray-400 mt-1">
          © {new Date().getFullYear()} BloodRoute. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
