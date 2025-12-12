import React from "react";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtected;
