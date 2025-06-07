import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "sonner"; 
import { Link } from "react-router-dom";

const MarriageRequests = ({ petId }) => {
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchMarriageRequests = async () => {
      try {
        const res = await axios.get("/api/PetMarriageRequest", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRequests(res.data);
      } catch (error) {
        console.error("Failed to fetch marriage requests:", error);
      }
    };

    fetchMarriageRequests();
  }, [token]);

  const handleRespond = async (requestId, isAccept) => {
    try {
      const endpoint = isAccept 
        ? `/api/PetMarriageRequest/AcceptMarriageRequest/${requestId}`
        : `/api/PetMarriageRequest/RejectMarriageRequest/${requestId}`;
      
      await axios.put(
        endpoint,
        {}, // empty body since you're just sending the request ID
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success(`Request ${isAccept ? "accepted" : "rejected"} successfully!`);

      // Remove the request from UI after action
      setRequests(prev => prev.filter(r => r.requestId !== requestId));
    } catch (error) {
      console.error("Failed to respond to marriage request:", error);
      toast.error("Failed to respond to marriage request.");
    }
  };

  // Filter only requests where this pet is the receiver, and status is Pending
  const filteredRequests = requests.filter(
    (req) => req.receiverPet.petId === parseInt(petId) && req.status === "Pending"
  );

  if (filteredRequests.length === 0) return null; // If no requests, show nothing

  return (
    <div className="p-4 mt-8 bg-gray-100 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-[#749260E5]">
        Marriage Requests
      </h2>

      {filteredRequests.map((request) => (
        <div key={request.requestId} className="flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow">
          <div className="flex items-center">
            <img
              src={request.senderPet.photoUrls[0]}
              alt={request.senderPet.name}
              className="w-16 h-16 object-cover rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold">{request.senderPet.name}</h3>
              <p className="text-sm text-gray-600">Breed: {request.senderPet.breed}</p>
              <Link
  to={`/pet-profile/${request.senderPet.petId}`}
  className=" hover:text-green-600 font-medium pt-3 inline-flex items-center"
>
  View Profile <i className="fa-solid fa-arrow-right ml-1"></i>
</Link>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600"
              onClick={() => handleRespond(request.requestId, true)}
            >
              Accept
            </button>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              onClick={() => handleRespond(request.requestId, false)}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MarriageRequests;