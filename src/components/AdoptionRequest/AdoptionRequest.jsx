import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const AdoptionRequest = () => {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/AdoptionRequests", {
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
      console.error("Error fetching adoption requests:", error);
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
        ? `/api/AdoptionRequests/Accept/${request.adoptionRequestId}`
        : `/api/AdoptionRequests/Reject/${request.adoptionRequestId}`;

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

  const renderTable = (title, data, options = {}) => {
    const { showActions = false, showFull = false } = options;

    const getFirstLetter = (name) => name?.charAt(0).toUpperCase() || "?";

    return (
      <div className="requests mt-10">
        <h2 className="p-6 text-gray-800 font-semibold text-xl flex justify-between">
          {title}
          {title === "Request Adoption" && (
            <button
              onClick={fetchRequests}
              className="bg-[#749260] text-white px-4 py-1 rounded-md text-sm"
            >
              {loading ? "Loading..." : "🔄 Refresh"}
            </button>
          )}
        </h2>
        <table className="text-center w-full">
          <thead>
            <tr>
              <th>Personal Data</th>
              <th>Pets Owned</th>
              <th>Hours Animal Alone</th>
              {showFull && <th>Owned Animal Before</th>}
              {showFull && <th>Email</th>}
              {showActions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((req, index) => (
              <tr key={index}>
                <td className="flex items-center gap-5 text-center">
                  <div className="flex">
                    <p className="w-9 h-9 rounded-full bg-[#749260] text-white text-lg font-bold me-4">
                      {getFirstLetter(req.requester.userName)}
                    </p>
                    <div>
                    <div>{req.requester.userName}</div>
                    <div className="text-xs text-gray-500">
                      {req.requester.id}
                    </div>
                    </div>
                  </div>
                </td>
                <td>{req.anotherPet}</td>
                <td>{req.hoursAnimalAlone}</td>
                {showFull && <td>{req.ownedAnimalBefore}</td>}
                {showFull && <td>{req.requester.email}</td>}
                {showActions && (
                  <td>
                    <button
                      onClick={() => handleStatusChange(index, "Accepted")}
                      className="text-green-600 text-lg"
                    >
                      ✔
                    </button>
                    <button
                      onClick={() => handleStatusChange(index, "Rejected")}
                      className="ml-5 text-red-700 text-lg"
                    >
                      ✘
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="adoptions">
      <p className="font-bold text-2xl border-b-1 border-gray-400 pb-4">
        Adoptions
      </p>
      {renderTable("Request Adoption", requests, {
        showActions: true,
        showFull: true,
      })}
      <div className="flex justify-between gap-4">
        <div className="w-full">
          {renderTable("Accepted Adoption Tracking", accepted)}
        </div>
        <div className="w-full">
          {renderTable("Rejected Adoption Tracking", rejected)}
        </div>
      </div>
    </div>
  );
};

export default AdoptionRequest;
