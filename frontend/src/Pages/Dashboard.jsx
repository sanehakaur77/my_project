import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  Search,
  AlertCircle,
  RefreshCw,
  Activity,
} from "lucide-react";

// --- Helper Components & Functions ---

// 1. Status Badge Component
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200",
    default: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const currentStyle = styles[status?.toLowerCase()] || styles.default;

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full border ${currentStyle} uppercase tracking-wide`}
    >
      {status || "Unknown"}
    </span>
  );
};

// 2. Request Card Component
const RequestCard = ({ req }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      {/* Card Header */}
      <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-900 leading-tight">
            {req.name}
          </h2>
          <span className="text-xs text-gray-500 font-medium flex items-center mt-1">
            <Activity className="w-3 h-3 mr-1 text-red-500" />
            {req.requestType || "General Request"}
          </span>
        </div>
        <StatusBadge status={req.status} />
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <Droplet className="w-4 h-4 mr-3 text-red-600 flex-shrink-0" />
          <span className="font-medium text-gray-900 mr-1">Group:</span>
          {req.bloodType || req.bloodGroup || "N/A"}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
          <span className="truncate">
            {req.city}, {req.state}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Mail className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
          <span className="truncate">{req.email}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Phone className="w-4 h-4 mr-3 text-indigo-500 flex-shrink-0" />
          {req.phone}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex items-center text-xs text-gray-500">
        <Calendar className="w-3 h-3 mr-2" />
        Requested on: {formatDate(req.createdAt || req.date)}
      </div>
    </div>
  );
};

// 3. Loading Skeleton
const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

// --- Main Component ---

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchRequests = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please login to view your requests.");

      const res = await axios.get("http://localhost:8080/my-req/my-requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRequests(res.data.Request || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch requests."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    const term = search.toLowerCase();
    return requests.filter((req) => {
      // Safety checks for undefined values
      const name = req.name?.toLowerCase() || "";
      const city = req.city?.toLowerCase() || "";
      const state = req.state?.toLowerCase() || "";
      const bType = (req.bloodType || req.bloodGroup)?.toLowerCase() || "";

      return (
        name.includes(term) ||
        city.includes(term) ||
        state.includes(term) ||
        bType.includes(term)
      );
    });
  }, [requests, search]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <NavBar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 flex items-center">
              <Users className="w-8 h-8 mr-3 text-red-600" />
              My Requests
            </h1>
            <p className="text-slate-500 mt-1 ml-11">
              Manage and track your blood donation requests.
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={fetchRequests}
              className="p-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600 transition"
              title="Refresh"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-red-800">
              Unable to load data
            </h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchRequests}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
            <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No requests found
            </h3>
            <p className="text-gray-500 mt-1">
              {search
                ? `No results matching "${search}"`
                : "You haven't made any requests yet."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRequests.map((req) => (
              <RequestCard key={req._id} req={req} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
