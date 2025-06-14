import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useAuth } from "../Context/AuthContext";

const MyPets = () => {
  const { token } = useAuth();
  const [pets, setPets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/Pet/GetMyPets", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPets(response.data);
      } catch (err) {
        setError("Failed to fetch pets");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchPets();
    } else {
      setError("No token found. Please log in.");
      setIsLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Pets
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            {pets.length > 0 
              ? `You have ${pets.length} pet${pets.length !== 1 ? 's' : ''} in your care`
              : "Manage your beloved pets here"}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {pets.map((pet) => (
              <Card
                key={pet.petId}
                id={pet.petId}
                title={pet.title}
                description={pet.description || "No description available."}
                gender={pet.gender}
                photoUrls={pet.photoUrls}
                type="pet"
                className="bg-gray-200"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No pets found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't added any pets yet. Start by adding your first pet!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPets;