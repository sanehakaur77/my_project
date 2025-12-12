import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  Search,
  Trash2,
  Loader2,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";
import Sidebar from "../components/Sidebar"; // Adjust path if needed

const SUGGESTIONS_API_URL = "http://localhost:8080/api/suggestions/req";
const DELETE_API_URL = "http://localhost:8080/delete";

// Suggestion Card Component
const SuggestionsCard = ({ item, onDelete }) => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-200 border-l-4 border-l-red-600 p-6 relative flex flex-col justify-between h-full transition duration-300 transform hover:shadow-2xl hover:border-l-red-400">
    <button
      onClick={() => onDelete(item._id)}
      className="absolute top-4 right-4 p-2 rounded-full text-red-600 bg-red-100 hover:bg-red-400 transition duration-200 z-10 opacity-75 hover:opacity-100"
      aria-label={`Delete suggestion from ${item.name}`}
    >
      <Trash2 size={18} />
    </button>

    <div className="flex-grow">
      <h2 className="text-xl font-bold text-red-600 mb-1 pr-10">{item.name}</h2>
      <p className="text-sm text-red-600 font-semibold mb-3 flex items-center">
        <MessageSquare size={14} className="mr-1" />
        Suggestion ID: {item._id.substring(0, 8)}...
      </p>

      <div className="grid grid-cols-2 gap-y-1 gap-x-4 text-sm mb-4 border-t border-b py-3 border-gray-100 bg-indigo-50/30 rounded-md px-2">
        <p className="text-gray-600 font-semibold">Email:</p>
        <a
          href={`mailto:${item.email}`}
          className="truncate text-gray-800 hover:text-indigo-600 transition"
        >
          {item.email}
        </a>
        <p className="text-gray-600 font-semibold">Phone:</p>
        <a
          href={`tel:${item.phone}`}
          className="text-gray-800 hover:text-indigo-600 transition"
        >
          {item.phone}
        </a>
      </div>

      <div className="mt-3">
        <p className="font-semibold text-gray-700 mb-1">Message:</p>
        <p className="text-gray-700 leading-relaxed italic bg-gray-50 p-3 rounded-lg border border-gray-200 max-h-40 overflow-y-auto">
          {item.message}
        </p>
      </div>
    </div>
  </div>
);

const Suggestion = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  // Fetch suggestions
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(SUGGESTIONS_API_URL);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data.suggesstion)) {
        const sortedData = data.suggesstion.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setSuggestions(sortedData);
      } else {
        setError("API returned data in unexpected format.");
      }
    } catch (err) {
      setError(`Failed to connect to backend: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Confirm delete modal
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Delete suggestion
  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${DELETE_API_URL}/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
      setSuggestions((prev) => prev.filter((item) => item._id !== deleteId));
    } catch (err) {
      setError(`Delete operation failed for ID ${deleteId}`);
    } finally {
      setIsDeleting(false);
      setShowModal(false);
      setDeleteId(null);
    }
  };

  const filteredSuggestions = useMemo(() => {
    const lower = search.toLowerCase().trim();
    if (!lower) return suggestions;
    return suggestions.filter(
      (item) =>
        item.name.toLowerCase().includes(lower) ||
        item.email.toLowerCase().includes(lower) ||
        item.phone.toLowerCase().includes(lower) ||
        item.message.toLowerCase().includes(lower)
    );
  }, [suggestions, search]);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-red-600 text-red-600">
        <Loader2 className="h-12 w-12 animate-spin mb-4" />
        <p className="text-2xl font-semibold">Loading Suggestions...</p>
      </div>
    );

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-red-50">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        logout={logout}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="sticky top-0 z-20 bg-white shadow-lg p-5 border-b-2 border-red-600 mb-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <h1 className="text-3xl font-extrabold text-red-600 mb-4 sm:mb-0 flex items-center">
              <MessageSquare className="w-8 h-8 mr-3 text-red-600" />
              Feedback & Suggestions
            </h1>

            <div className="relative w-full sm:max-w-sm">
              <input
                type="text"
                placeholder={`Search ${suggestions.length} entries...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 pl-12 rounded-full shadow-inner border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700"
                disabled={isDeleting}
                ref={inputRef}
              />
              <button
                onClick={() => inputRef.current.focus()}
                className="absolute top-3 left-4 text-gray-400"
              >
                <Search size={20} />
              </button>
            </div>
          </div>
        </header>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-800 rounded-lg bg-red-100 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-3 text-red-600" />
              <span>{error}</span>
            </div>
            <button
              onClick={fetchData}
              className="ml-4 px-3 py-1 bg-red-600 text-white rounded-md text-xs font-semibold hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        )}

        <div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-7"
          style={{ pointerEvents: isDeleting ? "none" : "auto" }}
        >
          {filteredSuggestions.length > 0 ? (
            filteredSuggestions.map((item) => (
              <SuggestionsCard
                key={item._id}
                item={item}
                onDelete={confirmDelete}
              />
            ))
          ) : (
            <div className="col-span-full bg-white p-12 rounded-xl shadow-lg border border-gray-200 text-center">
              <Search className="w-10 h-10 mx-auto text-red-600 mb-3" />
              <p className="text-2xl font-semibold text-gray-700">
                No Results Found
              </p>
              <p className="text-gray-500 mt-2">
                Try adjusting your search keywords.
              </p>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50"></div>
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 z-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Confirm Delete
              </h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this suggestion?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suggestion;
