import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSucess, showError } from "../Utils/Utils";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  console.log(subject);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/post/suggesstion",
        {
          name,
          email,
          subject,
          message,
        }
      );
      if (res.data.success) {
        showSucess(res.data.message);
      }
      setTimeout(() => {
        setName("");
        setEmail("");
        setMessage("");
        setSubject("");
      }, 2000);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div>
        <NavBar />

        <div className="min-h-screen bg-gray-50 text-gray-800">
          {/* 1. Hero Section: Contact Banner */}
          <section className="bg-red-700 text-white py-20 px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
                Get In Touch
              </h1>
              <p className="text-lg md:text-xl font-light">
                We're here to answer your questions, coordinate blood drives,
                and assist with urgent requests.
              </p>
            </div>
          </section>

          {/* --- */}

          {/* 2. Main Content: Form and Information */}
          <section className="py-16 px-4 md:px-20 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-red-500">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Send Us a Message
                </h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                      placeholder="John Doe"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                      placeholder="john.doe@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition duration-150"
                      defaultValue=""
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option value="" disabled>
                        Select a reason for contact
                      </option>
                      <option value="donation">
                        Donation/Eligibility Inquiry
                      </option>
                      <option value="host">Host a Blood Drive</option>
                      <option value="urgent">
                        Urgent Blood Request (Hospitals Only)
                      </option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 duration-150"
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition duration-300 shadow-md"
                  >
                    Submit Inquiry
                  </button>
                </form>
              </div>

              {/* Contact Details */}
              <div className="space-y-8 p-8 lg:p-0">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                  Immediate Contact Information
                </h2>

                {/* Phone */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500">
                  <FaPhone className="text-red-600 text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">General Inquiries</h3>
                    <p className="text-gray-600">
                      Call us during business hours (9 AM - 5 PM EST).
                    </p>
                    <a
                      href="tel:+18005550199"
                      className="text-red-600 font-semibold hover:underline mt-1 block"
                    >
                      01882 5717 1676
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500">
                  <FaEnvelope className="text-red-600 text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Email Support</h3>
                    <p className="text-gray-600">
                      For non-urgent matters or detailed proposals.
                    </p>
                    <a
                      href="mailto:support@blooddonor.org"
                      className="text-red-600 font-semibold hover:underline mt-1 block"
                    >
                      bloodroute.welfare@gmail.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-md border-l-4 border-red-500">
                  <FaMapMarkerAlt className="text-red-600 text-3xl mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold">Headquarters Location</h3>
                    <p className="text-gray-600">
                      Visit our main office or mail us
                      at:bloodroute.welfare@gmail.com
                    </p>
                    <address className="not-italic text-gray-700 mt-1">
                      Our HeadOffce at : Mohali, Phase 6
                      <br />
                      Near Mohali Bus Stand
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
};
export default ContactUs;
