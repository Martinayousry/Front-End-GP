import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import "../ClinicRequests/ClinicRequests.css";

const ClinicRequests = () => {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/admin/PendingCLinics", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Your backend only returns pending clinics, so we don't need to filter
      setRequests(data);
      
      // You'll need separate endpoints for accepted/rejected if you want to show them
      // For now, we'll just show pending requests with actions
    } catch (error) {
      toast.error("❌ Failed to load clinic requests");
      console.error("Error fetching clinic requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    const request = requests[index];
    if (!request?.clinicId) {
      toast.error("❌ Invalid clinic request");
      return;
    }

    setActionLoading(true);
    const token = localStorage.getItem("token");

    try {
      const endpoint = newStatus === "Accepted" 
        ? `/api/admin/AcceptClinics/${request.clinicId}`
        : `/api/admin/RejectClinics/${request.clinicId}`;

      // Changed from PATCH to PUT to match your backend
      const response = await axios.put(endpoint, null, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 204) { // Your backend returns NoContent (204)
        toast.success(`✅ Clinic request ${newStatus.toLowerCase()} successfully`);
        fetchRequests(); // Refresh the list after successful action
      }
    } catch (error) {
      toast.error(`❌ Failed to ${newStatus.toLowerCase()} clinic request`);
      console.error(`Error updating status:`, error);
    } finally {
      setActionLoading(false);
    }
  };

  const renderTable = (title, data, options = {}) => {
    const { showActions = false } = options;

    return (
      <div className="requests-container">
        <h2 className="p-4 text-gray-800 font-semibold text-lg flex justify-between items-center bg-white border-b border-gray-200">
          {title}
          <span className="text-sm text-gray-500">
            {data.length} {data.length === 1 ? 'request' : 'requests'}
          </span>
        </h2>
        
        <div className="overflow-x-auto">
          <table className="requests-table">
            <thead>
              <tr>
                <th>DR Name</th>
                <th>Contact Info</th>
                <th>Doctor Details</th>
                <th>Clinic Details</th>
                <th>More info</th>
                {showActions && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((req, index) => (
                  <tr key={`${req.clinicId}-${index}`}>
                    <td>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[#749260] text-white flex items-center justify-center mr-3">
                          {req.doctor?.userName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div>
                          <div className="font-medium">
                            {req.doctor?.userName || 'Unknown'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">{req.doctor?.email || 'No email'}</div>
                      <div className="text-xs text-gray-500">
                        {req.doctor?.number || "No phone provided"}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <span className="font-medium">Specialization:</span>{" "}
                        {req.doctor?.specialization || 'Not specified'}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Medical Id:</span>{" "}
                        {req.doctor?.medicalId || 'Not provided'}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">
                        <span className="font-medium">Name:</span> {req.name || 'Unnamed clinic'}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Address:</span> {req.address || 'No address'}
                      </div>
                    </td>
                    <td className="text-sm">{req.details || 'No additional info'}</td>
                    {showActions && (
                      <td>
                        <button
                          onClick={() => handleStatusChange(index, "Accepted")}
                          className="action-btn accept-btn"
                          title="Accept"
                          disabled={actionLoading}
                        >
                          {actionLoading ? '...' : '✓'}
                        </button>
                        <button
                          onClick={() => handleStatusChange(index, "Rejected")}
                          className="action-btn reject-btn"
                          title="Reject"
                          disabled={actionLoading}
                        >
                          {actionLoading ? '...' : '✗'}
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={showActions ? 6 : 5} className="text-center py-4 text-gray-500">
                    No {title.toLowerCase()} found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="clinic-requests p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Clinic Requests</h1>
        <button
          onClick={fetchRequests}
          className="bg-[#749260] text-white px-4 py-2 rounded-md text-sm hover:bg-[#5a724c] transition-colors"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "🔄 Refresh All"}
        </button>
      </div>

      {renderTable("Pending Clinic Requests", requests, { showActions: true })}
    
    </div>
  );
};

export default ClinicRequests;