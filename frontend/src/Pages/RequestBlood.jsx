import React, { useState } from "react";
import axios from "axios";
import { User, Phone, Mail, MapPin } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import { showSucess, showError } from "../Utils/Utils";
import { useNavigate } from "react-router";
import Footer from "../components/Footer";
const RequestBlood = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    requestType: "",
    bloodType: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page refresh

    try {
      const res = await axios.post(
        "http://localhost:8080/api/request/upload",
        formData
      );
      console.log(res);
      showSucess("your request has been uploaded sucessfully");
      setTimeout(() => {
        navigate("/");
      }, 3000);

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        requestType: "",
        bloodType: "",
      });
    } catch (error) {
      showError("something went wrong!", error);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full flex bg-blue-50 p-4">
        <div className="flex flex-col items-center justify-center m-auto w-full md:w-[80%] lg:w-[70%] rounded-3xl shadow-lg bg-white p-12">
          <h1 className="text-red-700 font-bold text-4xl md:text-5xl mb-6 text-center">
            Make Request
          </h1>

          {/* FORM START */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="relative w-full md:w-1/2">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name e.g. John"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-red-500"
                  required
                />
              </div>

              <div className="relative w-full md:w-1/2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email e.g john@gmail.com"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-red-500"
                  required
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="relative w-full md:w-1/2">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-red-500"
                  required
                />
              </div>

              <div className="relative w-full md:w-1/2">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500" />
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City e.g London"
                  className="w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-red-500"
                  required
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row gap-5">
              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="h-[50px] w-full md:w-1/2 bg-white rounded-xl shadow-md border border-gray-400 px-3"
                required
              >
                <option value="">Select Request</option>
                <option value="urgent">Urgent</option>
                <option value="moderate">Moderate</option>
                <option value="normal">Normal</option>
              </select>

              <select
                name="bloodType"
                value={formData.bloodType}
                onChange={handleChange}
                className="h-[50px] w-full md:w-1/2 bg-white rounded-xl shadow-md border border-gray-400 px-3"
                required
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <button
              type="submit"
              className="mx-auto block bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition w-full text-xl h-[55px]"
            >
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default RequestBlood;
