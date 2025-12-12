import React, { useEffect, useState } from "react";
import axios from "axios";
import { Megaphone, Loader2, Calendar } from "lucide-react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get("http://localhost:8080/announcement/all");
      setAnnouncements(res.data.announcements);
    } catch (err) {
      console.log("Error fetching announcements", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10">
          {/* Mobile Menu button */}
          <button
            className="md:hidden p-2 bg-white shadow rounded-lg mb-4"
            onClick={() => setSidebarOpen(true)}
          >
            <Megaphone className="h-6 w-6 text-gray-700" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Megaphone className="text-red-600 h-8 w-8" />
            <h1 className="text-3xl font-bold text-gray-800">
              Latest Announcements
            </h1>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="animate-spin w-8 h-8 text-red-600" />
            </div>
          )}

          {/* No Announcements */}
          {!loading && announcements.length === 0 && (
            <div className="text-center text-gray-500 mt-10 text-lg">
              No announcements available.
            </div>
          )}

          {/* Announcement List */}
          <div className="grid gap-6 mt-4">
            {announcements.map((a) => (
              <div
                key={a._id}
                className="bg-white shadow-lg rounded-2xl p-6 border-l-4 border-red-600"
              >
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-red-600" />
                  {a.title}
                </h2>

                <p className="text-gray-700 mt-2 leading-relaxed">
                  {a.message}
                </p>

                <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(a.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Announcements;
