import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSucess, showError } from "../Utils/Utils";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        // Save token + role
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);

        showSucess(res.data.message);

        // 🔥 Admin redirect logic
        if (res.data.role === "admin") {
          window.location.href("http://localhost:5174/admin");
        }

        // 🔥 Normal user logic
        const userRes = await axios.get(
          "http://localhost:8080/api/auth/home/data",
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`,
            },
          }
        );

        if (userRes.data.success) {
          navigate("/");
        }
      }
    } catch (error) {
      showError(error.response?.data?.message || "Login succeed");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2"
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2"
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>

        <div className="p-3 text-center">
          <p>
            Do not have an Account?
            <Link to="/signup" className="text-blue-500 hover:underline ml-1">
              Sign up
            </Link>
          </p>
        </div>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-t" />
          <span className="mx-3 text-sm text-gray-500">OR</span>
          <hr className="flex-grow border-t" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full border py-2.5 rounded-lg flex items-center justify-center"
        >
          <FcGoogle className="mr-3 text-2xl" /> Continue with Google
        </button>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
