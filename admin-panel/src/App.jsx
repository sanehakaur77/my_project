import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Suggestions from "./Pages/Suggesstions";
import Announcement from "./Pages/Announcement";
import Donor from "./Pages/Donors";
import Request from "./Pages/Request";
import Admin from "./Pages/Admin";
import Login from "./Pages/Login";
import AdminRoute from "./Pages/ProtectedAdmin";
import Navbar from "./components/AdminNavbar";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/suggestions" element={<Suggestions />} />
        <Route path="/donor" element={<Donor />} />
        <Route path="/request" element={<Request />} />
        <Route path="/login" element={<Login />} />
        <Route path="/announcement" element={<Announcement />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
