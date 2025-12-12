import React, { useState } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSucess } from "../Utils/Utils"; // your custom toast function
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const IconBaseProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const IconInputProps = {
  ...IconBaseProps,
  className:
    "w-5 h-5 text-red-600 absolute left-3 top-1/2 transform -translate-y-1/2 z-10",
};

const IconTextareaProps = {
  ...IconBaseProps,
  className: "w-5 h-5 text-red-600 absolute left-3 top-4 z-10",
};

// Icons
const Users = (props) => (
  <svg {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const User = (props) => (
  <svg {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const Mail = (props) => (
  <svg {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const Phone = (props) => (
  <svg {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-7.5-7.5C4.24 7.82 4.09 7.02 5.09 5.82L9.5 2.5a2 2 0 0 1 2 0l3.92 3.92a2 2 0 0 1 0 2l-2.73 2.73 2.73 2.73 2.73-2.73a2 2 0 0 1 2 0Z" />
  </svg>
);

const Globe = (props) => (
  <svg {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2m0-20v20m0-20H4M12 2h8" />
  </svg>
);

const MapPin = (props) => (
  <svg {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Droplet = (props) => (
  <svg {...props}>
    <path d="M12 2a8 8 0 0 0-8 8c0 7 8 12 8 12s8-5 8-12a8 8 0 0 0-8-8z" />
    <path d="M12 18c-3.31 0-6-2.69-6-6h12c0 3.31-2.69 6-6 6z" />
  </svg>
);

const Calendar = (props) => (
  <svg {...props}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

// Loader
const Loader = () => (
  <div className="flex items-center justify-center space-x-2">
    <div className="w-4 h-4 rounded-full animate-spin border-2 border-solid border-white border-t-transparent"></div>
    <span>Submitting...</span>
  </div>
);

const Donor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    phone: "",
    address: "",
    gender: "",
    bloodGroup: "",
    nationality: "",
    lastDonationDate: "",
    comments: "",
    file: null,
  });

  const [preview, setPreview] = useState(null);
  const [showCross, setShowCross] = useState(false); // New state for cross button
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearForm = () => {
    setFormData({
      name: "",
      email: "",
      city: "",
      state: "",
      phone: "",
      address: "",
      gender: "",
      bloodGroup: "",
      nationality: "",
      lastDonationDate: "",
      comments: "",
      file: null,
    });
    setPreview(null);
    setShowCross(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
      setShowCross(false); // Hide cross initially
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;
    setMessage("");
    setIsLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => data.append(key, val));

    try {
      const response = await axios.post(
        "http://localhost:8080/api/file/upload",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200 || response.status === 201) {
        showSucess("Donor details saved successfully!");
        clearForm();
      } else {
        setMessage("Registration failed. Unexpected server response.");
      }
    } catch (err) {
      console.error(err);
      const errorMsg =
        err.response?.data?.message || "Network error. Please try again.";
      setMessage(`Registration failed. Error: ${errorMsg}`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClasses = `
    w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500
    transition duration-200 ease-in-out placeholder-gray-500 appearance-none
  `;

  const buttonClasses = `
    col-span-full text-center text-white font-semibold py-3 px-6 rounded-lg shadow-lg
    transition duration-300 ease-in-out transform
    ${
      isLoading
        ? "bg-red-400 cursor-not-allowed"
        : "bg-red-600 hover:bg-red-700 hover:scale-[1.01] active:scale-[0.99]"
    }
  `;

  return (
    <>
      <div>
        <NavBar />
        <div className="flex-col items-center justify-center bg-gray-50 ">
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 font-inter">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-6 sm:p-10 m-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-red-700">
                  Donor Registration
                </h1>
                <p className="mt-2 text-base sm:text-lg text-gray-500">
                  Join the cause to save lives. Your data is kept confidential.
                </p>
              </div>

              {message && (
                <div
                  className={`p-4 mb-6 rounded-lg font-medium text-center transition-all duration-300 ${
                    message.startsWith("✅")
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                  }`}
                >
                  {message}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Name */}
                <div className="relative">
                  <User {...IconInputProps} />
                  <input
                    className={inputClasses}
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail {...IconInputProps} />
                  <input
                    className={inputClasses}
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <Phone {...IconInputProps} />
                  <input
                    className={inputClasses}
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Nationality */}
                <div className="relative">
                  <Globe {...IconInputProps} />
                  <input
                    className={inputClasses}
                    name="nationality"
                    placeholder="Nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* City */}
                <div className="relative">
                  <MapPin {...IconInputProps} />
                  <input
                    className={inputClasses}
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* State */}
                <div className="relative">
                  <MapPin {...IconInputProps} />
                  <input
                    className={inputClasses}
                    name="state"
                    placeholder="State / Region"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Blood Group */}
                <div className="relative">
                  <Droplet {...IconInputProps} />
                  <select
                    className={inputClasses}
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="" disabled>
                      Select Blood Group
                    </option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                {/* Gender */}
                <div className="relative">
                  <Users {...IconInputProps} />
                  <select
                    className={inputClasses}
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Last Donation Date */}
                <div className="col-span-full relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Last Donation
                  </label>
                  <div className="relative">
                    <Calendar {...IconInputProps} />
                    <input
                      className={inputClasses}
                      type="date"
                      name="lastDonationDate"
                      value={formData.lastDonationDate}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="col-span-full relative">
                  <MapPin {...IconTextareaProps} />
                  <textarea
                    className={`${inputClasses} h-24 resize-none`}
                    name="address"
                    placeholder="Full Residential Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Comments */}
                <div className="col-span-full relative">
                  <textarea
                    className={`${inputClasses.replace(
                      "pl-10",
                      "pl-3"
                    )} h-20 resize-none`}
                    name="comments"
                    placeholder="Medical History or Comments (Optional)"
                    value={formData.comments}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                </div>

                {/* File Upload */}
                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Upload Health Document
                  </label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input
                      type="file"
                      name="file"
                      className="w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-red-50 file:text-red-700
                         hover:file:bg-red-100"
                      accept="image/*,application/pdf"
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {preview && (
                      <div className="relative w-20 h-20">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-20 h-20 object-cover rounded-lg border cursor-pointer"
                          onClick={() => setShowCross((prev) => !prev)} // Toggle cross
                        />
                        {showCross && (
                          <button
                            type="button"
                            onClick={() => {
                              setPreview(null);
                              setFormData((prev) => ({ ...prev, file: null }));
                              setShowCross(false);
                            }}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm font-bold hover:bg-red-700"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={buttonClasses}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader /> : "Register Donor"}
                </button>
              </form>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Donor;
