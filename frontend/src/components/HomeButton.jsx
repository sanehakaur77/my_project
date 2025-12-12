import React from "react";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const HomeButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/home")}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl shadow-lg transition-all"
    >
      <Home className="w-5 h-5" />
      Home
    </button>
  );
};

export default HomeButton;
