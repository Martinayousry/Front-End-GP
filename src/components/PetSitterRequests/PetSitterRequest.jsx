import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import "../PetSitterRequests/petSitterRequest.css"; // Add this line

const PetSitterRequest = () => {
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

    const endpoint =
      newStatus === "Accepted"
        ? `/api/PetSitterRequests/Accept/${request.petSitterRequestId}`
        : `/api/PetSitterRequests/Reject/${request.petSitterRequestId}`;

    try {
      await axios.patch(endpoint, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(`✅ Request ${newStatus.toLowerCase()} successfully`);

      if (newStatus === "Accepted") {
        setAccepted([...accepted, request]);
      } else {
        setRejected([...rejected, request]);
      }

      setRequests(requests.filter((_, i) => i !== index));
    } catch (error) {
      toast.error(`❌ Failed to ${newStatus.toLowerCase()} request`);
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
                      {req.owner.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-medium">{req.owner.userName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="text-sm">{req.owner.email}</div>
                  <div className="text-xs text-gray-500">
                    {req.number || "No phone provided"}
                  </div>
                </td>
                <td>
                  <div className="text-sm">
                    <span className="font-medium">Breed:</span> {req.breed}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Age:</span> {req.age}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Health Status :</span> {req.healthIssues || "None"}
                  </div>
                </td>
                <td>
                  <div className="text-sm">
                    <span className="font-medium">Start:</span> {formatDate(req.startDate)}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">End:</span> {formatDate(req.endtDate)}
                  </div>
                </td>
                <td className="text-sm">{req.notes}</td>
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
    <div className="pet-sitter-requests">
      <p className="font-bold text-2xl border-b-1 border-gray-400 pb-4 ps-20">
        Pet Sitter Requests
      </p>
      {renderTable("Pet Sitter Requests", requests, {
        showActions: true,
      })}
      <div className="flex justify-between gap-4">
        <div className="w-full">
          {renderTable("Accepted Requests", accepted)}
        </div>
        <div className="w-full">
          {renderTable("Rejected Requests", rejected)}
        </div>
      </div>
    </div>
  );
};

export default PetSitterRequest;