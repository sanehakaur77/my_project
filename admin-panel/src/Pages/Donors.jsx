import React, { useEffect, useState, useMemo } from "react";
import {
  Users,
  Mail,
  Phone,
  MapPin,
  Droplet,
  Calendar,
  MessageSquare,
  Loader2,
  Trash2,
  Menu,
} from "lucide-react";
import Sidebar from "../components/Sidebar";

const DONORS_API_URL = "http://localhost:8080/api/get/donor";
const DELETE_API_URL = "http://localhost:8080/delete/donor";

/* ---------------------- Donor Card Component ----------------------- */
const DonorCard = ({ donor, onDelete, onImageClick }) => {
  const defaultImage = `https://placehold.co/400x200/b91c1c/ffffff?text=${
    donor.name
      .split(" ")
      .map((n) => n[0])
      .join("") || "DN"
  }`;

  const donationDate = donor.lastDonationDate
    ? new Date(donor.lastDonationDate).toLocaleDateString()
    : "N/A";

  return (
    <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl border-t-4 border-red-600 p-6 flex flex-col transition duration-300 relative">
      {/* Delete Button */}
      <button
        onClick={() => onDelete(donor._id)}
        className="absolute top-4 right-4 p-2 rounded-full text-red-600 bg-red-100 hover:bg-red-200 transition duration-200"
      >
        <Trash2 size={18} />
      </button>

      {/* Donor Image */}
      <img
        src={donor.fileUrl || defaultImage}
        alt={donor.name}
        className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
        onClick={() => onImageClick(donor.fileUrl || defaultImage, donor.name)}
      />

      <h2 className="text-2xl font-bold text-red-700 mb-1">{donor.name}</h2>

      <p className="text-sm text-gray-600 mb-4 flex items-center">
        <MapPin className="w-4 h-4 mr-1 text-red-400" />
        {donor.city}, {donor.state}
      </p>

      <div className="space-y-3 text-gray-700 text-sm">
        <p className="flex items-center">
          <Droplet className="w-4 h-4 mr-2 text-red-600" />
          <span className="font-semibold w-24">Blood Group:</span>
          <span className="text-red-700 font-bold">{donor.bloodGroup}</span>
        </p>

        <p className="flex items-center">
          <Mail className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="font-semibold w-24">Email:</span>
          <a href={`mailto:${donor.email}`} className="truncate">
            {donor.email}
          </a>
        </p>

        <p className="flex items-center">
          <Phone className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="font-semibold w-24">Phone:</span>
          <a href={`tel:${donor.phone}`}>{donor.phone}</a>
        </p>

        <p className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-green-600" />
          <span className="font-semibold w-24">Last Donation:</span>
          {donationDate}
        </p>
      </div>

      {donor.comments && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 flex items-center mb-1">
            <MessageSquare className="w-3 h-3 mr-1" />
            Comments:
          </p>
          <p className="text-sm italic bg-red-50 p-2 rounded-md">
            {donor.comments}
          </p>
        </div>
      )}
    </div>
  );
};

/* ------------------------------ Main Component ------------------------------- */
const Donor = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  /* ------------------ Fetch Donors ------------------ */
  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await fetch(DONORS_API_URL);
      const data = await res.json();
      setDonors(data.donors || []);
    } catch (err) {
      setError("Failed to fetch donors");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  /* ------------------ Delete Donor ------------------ */
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    setIsDeleting(true);

    try {
      await fetch(`${DELETE_API_URL}/${confirmDeleteId}`, {
        method: "DELETE",
      });

      setDonors((prev) => prev.filter((d) => d._id !== confirmDeleteId));
    } catch {
      setError("Delete failed");
    }

    setIsDeleting(false);
    setConfirmDeleteId(null);
  };

  /* ------------------ Filters ------------------ */
  const filteredDonors = useMemo(() => {
    const s = searchTerm.toLowerCase();
    return donors.filter(
      (d) =>
        d.bloodGroup?.toLowerCase().includes(s) ||
        d.city?.toLowerCase().includes(s) ||
        d.state?.toLowerCase().includes(s)
    );
  }, [donors, searchTerm]);

  /* ------------------ Image Modal ------------------ */
  const openImageModal = (url, alt) => {
    setModalImageUrl(url);
    setModalImageAlt(alt);
    setIsImageModalOpen(true);
  };

  /* ------------------ LOADING SCREEN ------------------ */
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <Loader2 className="animate-spin text-red-500 w-10 h-10" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* TOP BAR (Menu button) */}
        <div className="flex items-center mb-6 md:hidden">
          <button
            onClick={toggleSidebar}
            className="p-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
          >
            <Menu size={24} />
          </button>
          <h1 className="ml-4 text-2xl font-bold text-gray-800">Donors</h1>
        </div>

        {/* Header */}
        <div className="mb-8 pb-2 border-b border-red-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-800 flex items-center">
            <Users className="w-8 h-8 mr-3 text-red-600" />
            Registered Donors
          </h1>

          <input
            type="text"
            placeholder="Search by blood group, city, state..."
            className="w-full md:w-96 p-3 pl-4 border rounded-lg shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredDonors.map((donor) => (
            <DonorCard
              key={donor._id}
              donor={donor}
              onDelete={(id) => setConfirmDeleteId(id)}
              onImageClick={openImageModal}
            />
          ))}
        </div>

        {/* Confirm Delete Modal */}
        {confirmDeleteId && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl text-center shadow-xl">
              <h2 className="text-xl font-bold text-red-600 mb-3">
                Confirm Delete
              </h2>
              <p className="text-gray-700 mb-4">
                Are you sure you want to delete this donor?
              </p>

              <div className="flex gap-4 justify-center">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
                <button
                  className="bg-gray-300 px-4 py-2 rounded-lg"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal with Cross Button */}
        {isImageModalOpen && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="relative">
              <img
                src={modalImageUrl}
                alt={modalImageAlt}
                className="max-h-[90vh] rounded-lg"
              />
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute -top-4 -right-4 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-red-700"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Donor;
