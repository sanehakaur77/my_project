import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaKey } from "react-icons/fa";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false); // toggle OTP form
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Signup function
  const handleSignUp = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, agree } = formData;

    if (!name || !email || !password || !confirmPassword)
      return setMessage("All fields are required");
    if (password !== confirmPassword)
      return setMessage("Passwords do not match");
    if (!agree) return setMessage("Please agree to the Terms of Service");

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("http://localhost:8080/api/auth/signup", {
        name,
        email,
        password,
      });

      // Store userId to verify OTP
      localStorage.setItem("userId", res.data.userId);
      setIsOtpSent(true); // show OTP form
      setMessage(res.data.message || "OTP sent to your email!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // OTP verification function
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) return setMessage("Enter 6-digit OTP");

    const userId = localStorage.getItem("userId");
    if (!userId) return setMessage("User ID not found. Please signup again.");

    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post(
        "http://localhost:8080/api/auth/verify-otp",
        {
          userId,
          otp,
        }
      );

      if (res.data.success) {
        localStorage.removeItem("userId");
        setMessage("✅ Account verified! You can now login.");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-3">
      <div className="bg-white shadow-lg rounded-2xl w-[90%] sm:w-[380px] p-6">
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-900">
          {isOtpSent ? "Verify OTP" : "Create Account"}
        </h2>
        <p className="text-gray-500 text-center mb-4 text-sm">
          {isOtpSent
            ? "Enter the OTP sent to your email to verify your account."
            : "Join us and start your journey today."}
        </p>

        {message && (
          <p
            className={`text-center mb-3 text-sm ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {!isOtpSent ? (
          <form onSubmit={handleSignUp} className="space-y-3">
            <div className="relative">
              <FaUser className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <FaKey className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full pl-10 border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <label className="flex items-center text-xs text-gray-700">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mr-2"
              />
              I agree to the{" "}
              <span className="text-blue-600 ml-1 cursor-pointer hover:underline">
                Terms of Service
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white text-sm font-semibold transition ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Registering..." : "REGISTER"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-3">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-green-500 outline-none text-center"
              maxLength={6}
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white text-sm font-semibold transition ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Verifying..." : "VERIFY OTP"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
