import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import ContactUS from "./Pages/ContactUs";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import Donor from "./Pages/Donor";
import RequestBlood from "./Pages/RequestBlood";
import AboutUs from "./Pages/Aboutus";
import Dashboard from "./Pages/Dashboard";
import Profile from "./components/Profile";
import Announcements from "./Pages/Announcements";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/donor" element={<Donor />} />
          <Route path="/request-blood" element={<RequestBlood />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/announcements" element={<Announcements />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
