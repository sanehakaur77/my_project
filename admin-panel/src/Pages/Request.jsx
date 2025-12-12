import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const Request = () => {
  const [reqs, setReqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchReq = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/get/req", {
          headers: { Authorization: token },
        });
        const data = await res.json();
        setReqs(data.req);
      } catch (err) {
        console.error("Failed to fetch", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReq();
  }, []);

  // ================= STATUS UPDATE FUNCTION =================
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:8080/update/update-request/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setReqs((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, status: newStatus } : item
          )
        );
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:8080/delete/req/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });

      setReqs((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete failed");
    }
  };

  const filteredReqs = reqs.filter((item) =>
    (item.name + item.city + item.bloodType + item.requestType)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading)
    return (
      <p className="text-center mt-10 text-xl font-semibold">Loading...</p>
    );

  return (
    <div className="flex min-h-screen bg-red-50">
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        logout={logout}
      />

      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          sidebarOpen ? "ml-52" : "ml-16"
        }`}
      >
        <div className="max-w-md mb-6">
          <input
            type="text"
            placeholder="Search by name, city, blood type..."
            className="w-full p-3 rounded-xl shadow border border-gray-300 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReqs.map((item) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-bold text-gray-800 capitalize">
                  {item.name}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    item.requestType === "urgent"
                      ? "bg-red-600"
                      : item.requestType === "moderate"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }`}
                >
                  {item.requestType}
                </span>
              </div>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span> {item.email}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {item.phone}
                </p>
                <p>
                  <span className="font-semibold">City:</span> {item.city}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-lg font-bold text-center bg-red-100 text-red-700 py-2 rounded-xl">
                  {item.bloodType}
                </p>
              </div>

              {/* STATUS DROPDOWN */}
              <div className="mt-4">
                <label className="font-semibold text-gray-700">Status:</label>
                <select
                  value={item.status || "pending"}
                  onChange={(e) => updateStatus(item._id, e.target.value)}
                  className="w-full mt-2 p-2 border rounded-xl shadow focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl font-semibold hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Request;
