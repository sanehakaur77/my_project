import React from "react";
// Importing necessary icons for visual appeal and professionalism
import {
  FaHeartbeat,
  FaSearch,
  FaTruck,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const AboutUs = () => {
  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 text-gray-800">
        {/* 1. Hero Section */}
        <section className="bg-red-600 text-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              About BloodDonor: The Lifeline Connection
            </h1>
            <p className="text-lg md:text-xl font-light">
              BloodDonor is dedicated to saving lives by connecting willing
              donors with people in need. We aim to make blood donation
              **simple, reliable, and accessible** for everyone in our
              community.
            </p>
          </div>
        </section>

        {/* --- */}

        {/* 2. Mission & Vision */}
        <section className="py-16 px-4 md:px-20 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
              <h2 className="text-3xl font-bold mb-3 flex items-center">
                <FaHeartbeat className="text-red-600 mr-3 hover:" /> Our Mission
              </h2>
              <p className="text-gray-700 text-lg">
                To create a seamless digital platform for **voluntary blood
                donation**, ensuring that the crucial supply of blood and blood
                products is always available when a life depends on it.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-red-500">
              <h2 className="text-3xl font-bold mb-3 flex items-center">
                <FaSearch className="text-red-600 mr-3" /> Our Vision
              </h2>
              <p className="text-gray-700 text-lg">
                To build a community where donating blood is easy, safe, and a
                routine act of kindness, ultimately fostering a **resilient and
                compassionate** healthcare network.
              </p>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* 3. The Process: How It Works */}
        <section className="py-16 px-4 md:px-20 bg-gray-100">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12 text-gray-800">
              The BloodDonor Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="p-6 bg-white rounded-xl shadow-md border-t-4 border-t-red-500">
                <FaHandshake className="text-red-500 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">1. Connect Donors</h3>
                <p className="text-gray-600">
                  Our platform instantly matches your blood type and location
                  with the nearest urgent requests.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md border-t-4 border-t-red-500">
                <FaShieldAlt className="text-red-500 text-4xl mb-4 mx-auto border-t-4 border-t-red-500" />
                <h3 className="text-xl font-bold mb-2">2. Ensure Safety</h3>
                <p className="text-gray-600">
                  We guide you through the mandatory health screening and
                  rigorous safety protocols at accredited centers.
                </p>
              </div>
              <div className="p-6 bg-white rounded-xl shadow-md border-t-4 border-t-red-500">
                <FaTruck className="text-red-500 text-4xl mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">
                  3. Facilitate Delivery
                </h3>
                <p className="text-gray-600">
                  We work with local blood banks to prioritize and expedite the
                  delivery to patients in critical need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* 4. Statistics & Commitment */}
        <section className="bg-white py-16 px-4 md:px-20 text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-10">
              Commitment and Impact in Numbers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-red-100 rounded-lg p-6 shadow-md">
                <h3 className="text-4xl font-extrabold text-red-600 mb-2">
                  500+
                </h3>
                <p className="text-gray-700">Active Volunteer Donors</p>
              </div>
              <div className="bg-red-100 rounded-lg p-6 shadow-md">
                <h3 className="text-4xl font-extrabold text-red-600 mb-2">
                  1,200+
                </h3>
                <p className="text-gray-700">Lives Impacted</p>
              </div>
              <div className="bg-red-100 rounded-lg p-6 shadow-md">
                <h3 className="text-4xl font-extrabold text-red-600 mb-2">
                  100%
                </h3>
                <p className="text-gray-700">Safety Compliance Rate</p>
              </div>
              <div className="bg-red-100 rounded-lg p-6 shadow-md">
                <h3 className="text-4xl font-extrabold text-red-600 mb-2">
                  50+
                </h3>
                <p className="text-gray-700">Community Blood Drives</p>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gray-50 rounded-lg shadow-inner">
              <h3 className="text-2xl font-semibold mb-3 flex items-center justify-center">
                <FaShieldAlt className="text-green-600 mr-3" /> Our Safety
                Guarantee
              </h3>
              <p className="text-gray-700 max-w-4xl mx-auto">
                We only partner with **federally regulated and accredited blood
                centers**. Every unit of blood collected through our network is
                subject to the **highest standards of testing** before reaching
                a patient. Your donation is safe, and the blood received is
                secure.
              </p>
            </div>
          </div>
        </section>

        {/* --- */}

        {/* 5. Call to Action */}
        <section className="bg-red-700 py-16 px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">
            Your Generosity Can't Wait
          </h2>
          <p className="max-w-xl mx-auto mb-8 text-xl font-light">
            Become a donor today and join thousands of heroes providing a
            constant lifeline to those in urgent need.
          </p>
          <button className="bg-white text-red-700 font-extrabold px-10 py-4 rounded-lg text-lg shadow-xl hover:bg-gray-200 transition duration-300 transform hover:scale-105">
            Register as a Donor
          </button>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
