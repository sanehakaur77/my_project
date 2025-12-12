import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminRoute({ children }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      // No token → redirect
      navigate("/login");
      return;
    }

    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      // Not an admin → redirect
      navigate("/login");
    }
  }, [token, navigate]);

  // Only render children if token exists and role is admin
  if (!token) return null;

  const decoded = jwtDecode(token);
  if (decoded.role !== "admin") return null;

  return children;
}

export default AdminRoute;
