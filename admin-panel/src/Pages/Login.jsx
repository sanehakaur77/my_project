import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { Mail, KeyRound, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showSucess, showError } from "../Utils";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [res, setRes] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/req/admin/login",
        {
          email,
          password,
        }
      );
      setRes(res);
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", res.data.role);

      console.log(res);
      if (res.data.success) {
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
        showSucess("Welcome Admin");
      }
    } catch (err) {
      showError(res.data.message);
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen w-full bg-blue-50 justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl flex w-full max-w-4xl overflow-hidden">
        <div className="w-1/2 bg-gradient-to-br from-[#7b0f17] to-[#c31425] text-white p-10 flex flex-col justify-center h-[500px]">
          <h2 className="text-4xl font-bold mb-3">Welcome Back!</h2>
          <p className="text-lg opacity-90 mb-6">
            Login with your credentials to continue.
          </p>
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center shadow-lg">
          <div className="flex items-center gap-2 mb-6">
            <User className="text-gray-700 w-10 h-10" />
            <h2 className="text-4xl font-bold text-gray-700">Login</h2>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-red-600 text-xl" />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 pl-10 pr-4 py-3 w-full rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 text-red-600 text-xl " />
              <input
                type="password"
                placeholder="Password"
                className="border border-gray-300 pl-10 pr-4 py-3 w-full rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Login button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#7b0f17] to-[#c31425]
              text-white py-3 rounded-lg text-lg font-semibold 
              hover:opacity-90 transition-all"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
