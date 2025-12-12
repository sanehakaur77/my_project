import React, { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Lock,
  X,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Loader2,
} from "lucide-react";
import NavBar from "./NavBar";
import Footer from "./Footer";

const API_BASE = "http://localhost:8080";

// --- Sub-Component: Status Toast ---
const StatusMessage = ({ type, message, onClose }) => {
  if (!message) return null;
  const isError = type === "error";

  return (
    <div
      className={`fixed top-5 right-5 z-50 flex items-center p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 transform translate-y-0 ${
        isError
          ? "bg-white border-red-500 text-red-700"
          : "bg-white border-green-500 text-green-700"
      }`}
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 mr-3" />
      ) : (
        <CheckCircle className="w-5 h-5 mr-3" />
      )}
      <span className="font-medium mr-8">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// --- Sub-Component: Profile Option Card ---
const ProfileOptionCard = ({
  title,
  desc,
  icon: Icon,
  onClick,
  colorClass = "text-indigo-600",
}) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group flex items-center justify-between"
  >
    <div className="flex items-center gap-4">
      <div
        className={`p-3 rounded-full bg-gray-50 group-hover:bg-indigo-50 transition-colors ${colorClass}`}
      >
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-500 transition-colors" />
  </div>
);

// --- Sub-Component: Dynamic Modal ---
const UpdateModal = ({
  type,
  isOpen,
  onClose,
  formData,
  handleChange,
  onSubmit,
  isLoading,
}) => {
  if (!isOpen) return null;

  const config = {
    name: {
      title: "Update Name",
      fields: [{ name: "name", type: "text", placeholder: "Full Name" }],
    },
    email: {
      title: "Update Email",
      fields: [{ name: "email", type: "email", placeholder: "new@email.com" }],
    },
    phone: {
      title: "Update Phone",
      fields: [{ name: "phone", type: "tel", placeholder: "+1 234 567 890" }],
    },
    password: {
      title: "Change Password",
      fields: [
        {
          name: "oldPassword",
          type: "password",
          placeholder: "Current Password",
        },
        { name: "newPassword", type: "password", placeholder: "New Password" },
      ],
    },
  };

  const currentConfig = config[type];

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-50 transform transition-all scale-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {currentConfig.title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-4">
            {currentConfig.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                  {field.placeholder}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                  required
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition flex justify-center items-center disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Main Component ---
const Profile = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setActiveModal(null);
    setFormData({
      name: "",
      email: "",
      phone: "",
      oldPassword: "",
      newPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    const endpoints = {
      name: { url: "/user/update-name", payload: { name: formData.name } },
      email: { url: "/user/update-email", payload: { email: formData.email } },
      phone: { url: "/user/update-phone", payload: { phone: formData.phone } },
      password: {
        url: "/user/update-password",
        payload: {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        },
      },
    };

    const config = endpoints[activeModal];

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`${API_BASE}${config.url}`, config.payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStatus({
        type: "success",
        message: res.data.message || "Update successful!",
      });
      setTimeout(handleClose, 1000); // Close modal after short delay on success
    } catch (err) {
      setStatus({
        type: "error",
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900">
              Account Settings
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your profile information and security.
            </p>
          </div>

          {/* Status Notification */}
          <StatusMessage
            type={status.type}
            message={status.message}
            onClose={() => setStatus({ type: "", message: "" })}
          />

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileOptionCard
              title="Personal Name"
              desc="Update your display name"
              icon={User}
              onClick={() => setActiveModal("name")}
            />
            <ProfileOptionCard
              title="Email Address"
              desc="Manage your login email"
              icon={Mail}
              onClick={() => setActiveModal("email")}
            />
            <ProfileOptionCard
              title="Phone Number"
              desc="Update contact number"
              icon={Phone}
              onClick={() => setActiveModal("phone")}
            />
            <ProfileOptionCard
              title="Security"
              desc="Change your password"
              icon={Lock}
              colorClass="text-red-600 group-hover:bg-red-50"
              onClick={() => setActiveModal("password")}
            />
          </div>

          {/* The Modal */}
          <UpdateModal
            type={activeModal}
            isOpen={!!activeModal}
            onClose={handleClose}
            formData={formData}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
