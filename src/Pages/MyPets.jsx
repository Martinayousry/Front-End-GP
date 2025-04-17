import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useAuth } from "../Context/AuthContext";

const MyPets = () => {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/Pet/GetMyPets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets(response.data);
      } catch (err) {
        setError("Failed to fetch pets");
      }
    };

    if (token) {
      fetchPets();
    } else {
      setError("No token found. Please log in.");
    }
  }, [token]);

  return (
    <div>
      <div className="grid place-items-center pt-15">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center p-10 gap-8 w-[90%]">
          {error ? (
            <p>{error}</p>
          ) : pets.length > 0 ? (
            pets.map((pet) => (
              <Card
                key={pet.petId}
                animalId={pet.petId}
                title={pet.title}
                description={pet.description || "No description available."}
                gender={pet.gender}
                photoUrls={pet.photoUrls}
                type="Pet"
              />
            ))
          ) : (
            <p>No pets available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPets;
