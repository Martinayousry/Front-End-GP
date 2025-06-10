import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "sonner";

const AdoptionRequests = ({ ID }) => {
  const { token, user } = useAuth(); // assuming `user` contains role info
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchAdoptionRequests = async () => {
      try {
        const isAdmin = user?.roles?.includes("Admin");

        const endpoint = isAdmin
          ? `/api/AdoptionRequests/byAnimals/${ID}`
          : `/api/AdoptionRequests/ByPet/${ID}`;

        const res = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRequests(res.data);
      } catch (error) {
        console.error("Failed to fetch adoption requests:", error);
        toast.error("Failed to load requests.");
      }
    };

    fetchAdoptionRequests();
  }, [ID, token, user]);

  const handleRespond = async (requestId, isAccept) => {
    try {
      const endpoint = isAccept
        ? `/api/AdoptionRequests/Accept/${requestId}`
        : `/api/AdoptionRequests/Reject/${requestId}`;

      await axios.patch(
        endpoint,
        {}, // no body needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(`Request ${isAccept ? "accepted" : "rejected"} successfully!`);

      // Remove the responded request
      setRequests((prev) => prev.filter((r) => r.adoptionRequestId !== requestId));
    } catch (error) {
      console.error("Failed to respond to request:", error);
      toast.error("Action failed. Please try again.");
    }
  };

  const pendingRequests = requests.filter((req) => req.status === "Pending");

  if (pendingRequests.length === 0) return null;

  return (
    <div className="p-4 mt-8 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[#749260E5]">
        Adoption Requests
      </h2>

      {pendingRequests.map((request) => (
        <div
          key={request.adoptionRequestId}
          className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow"
        >
          <div>
            <h3 className="font-bold">{request.requester.userName}</h3>
            <p className="text-sm text-gray-600">{request.requester.email}</p>
            <p className="text-sm mt-2">
              <strong>Other Pet at Home:</strong> {request.anotherPet}
            </p>
            <p className="text-sm">
              <strong>Owned Animal Before:</strong> {request.ownedAnimalBefore}
            </p>
            <p className="text-sm">
              <strong>Hours Alone:</strong> {request.hoursAnimalAlone}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Requested at: {new Date(request.requestedAt).toLocaleString()}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              onClick={() => handleRespond(request.adoptionRequestId, true)}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              onClick={() => handleRespond(request.adoptionRequestId, false)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdoptionRequests;
