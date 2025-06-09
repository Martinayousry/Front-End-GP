import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import "../ClinicRequests/ClinicRequests.css"; // Add this line

const ClinicRequests = () => {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/PetSitterRequests", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const pending = data.filter((req) => req.status === "Pending");
      const acceptedReqs = data.filter((req) => req.status === "Accepted");
      const rejectedReqs = data.filter((req) => req.status === "Rejected");
      setRequests(pending);
      setAccepted(acceptedReqs);
      setRejected(rejectedReqs);
    } catch (error) {
      toast.error("❌ Failed to load requests");
      console.error("Error fetching pet sitter requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const request = requests[index];
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `/api/Admin/${request.clinicId}/AcceptClinics`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(`✅ Clinic request ${newStatus.toLowerCase()} successfully`);

        if (newStatus === "Accepted") {
          setAccepted([...accepted, request]);
        } else {
          setRejected([...rejected, request]);
        }

        setRequests(requests.filter((_, i) => i !== index));
      } else {
        toast.error(`❌ Failed to ${newStatus.toLowerCase()} clinic request`);
      }
    } catch (error) {
      toast.error(`❌ Failed to ${newStatus.toLowerCase()} clinic request`);
      console.error(`Error updating status to ${newStatus}:`, error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const renderTable = (title, data, options = {}) => {
    const { showActions = false } = options;

    return (
      <div className="requests-container">
        <h2 className="p-4 text-gray-800 font-semibold text-lg flex justify-between items-center bg-white border-b border-gray-200">
          {title}
          {title === "Pet Sitter Requests" && (
            <button
              onClick={fetchRequests}
              className="bg-[#749260] text-white px-4 py-2 rounded-md text-sm hover:bg-[#5a724c] transition-colors"
            >
              {loading ? "Loading..." : "🔄 Refresh"}
            </button>
          )}
        </h2>
        <div className="overflow-x-auto">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Contact Info</th>
                <th>Pet Details</th>
                <th>Dates</th>
                <th>Notes</th>
                {showActions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((req, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[#749260] text-white flex items-center justify-center mr-3">
                        {req.doctor.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{req.doctor.userName}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">{req.doctor.email}</div>
                    <div className="text-xs text-gray-500">
                      {req.doctor.number || "No phone provided"}
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <span className="font-medium">Specialization:</span>{" "}
                      {req.doctor.specialization}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Location:</span>{" "}
                      <a
                        href={req.locationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Map
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <span className="font-medium">Name:</span> {req.name}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Address:</span> {req.address}
                    </div>
                  </td>
                  <td className="text-sm">{req.details}</td>
                  {showActions && (
                    <td>
                      <button
                        onClick={() => handleStatusChange(index, "Accepted")}
                        className="action-btn accept-btn"
                        title="Accept"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleStatusChange(index, "Rejected")}
                        className="action-btn reject-btn"
                        title="Reject"
                      >
                        ✗
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="clinic-requests">
      <p className="font-bold text-2xl border-b-1 border-gray-400 pb-4 ps-20">
        Clinic Requests
      </p>
      {renderTable("Pending Clinic Requests", requests, {
        showActions: true,
      })}
      <div className="flex justify-between gap-4">
        <div className="w-full">
          {renderTable("Accepted Clinics", accepted)}
        </div>
        <div className="w-full">
          {renderTable("Rejected Clinics", rejected)}
        </div>
      </div>
    </div>
  );
};

export default ClinicRequests;
