import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "sonner";

const AnimalMarriagePopup = ({ onClose, receiverAnimalId }) => {
  const { token } = useAuth();
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyPets = async () => {
      try {
        const res = await axios.get("/api/Pet/GetMyPets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMyPets(res.data);
      } catch (error) {
        console.error("Failed to fetch user's pets:", error);
        toast.error("Failed to load your pets.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPets();
  }, [token]);

  const handleSelectPet = async (senderPetId) => {
    try {
      await axios.post(
        "/api/AnimalMarriageRequest/MakeMarriageRequest",
        {
          senderPetId,
          receiverAnimalId: parseInt(receiverAnimalId),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Marriage request sent to admin successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to send animal marriage request:", error);
      toast.error("Failed to send marriage request.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-[#749260E5]">
          Choose Your Pet
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading your pets...</p>
        ) : myPets.length === 0 ? (
          <p className="text-center text-gray-500">
            You don't have any pets available for marriage.
          </p>
        ) : (
          <ul className="space-y-4">
            {myPets.map((pet) => (
              <li
                key={pet.petId}
                onClick={() => handleSelectPet(pet.petId)}
                className="p-4 bg-[#f6f8f4] hover:bg-[#dbe6d4] text-center rounded-xl cursor-pointer transition-all duration-300 font-medium text-[#4c5d3fe5]"
              >
                {pet.name} {pet.breed && `(${pet.breed})`}
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onClose}
          className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AnimalMarriagePopup;
