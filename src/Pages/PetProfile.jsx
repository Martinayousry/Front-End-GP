import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function PetProfile() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("Description");
  const { token } = useAuth();

  const tabClasses = (tab) =>
    `px-4 py-2 font-medium ${
      activeTab === tab ? "text-black border-b-2 border-black" : "text-gray-500"
    } cursor-pointer`;

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`/api/Animals/${id}`);
        setPet(res.data);
        setSelectedImage(res.data.photoUrls[0]);
      } catch (err) {
        console.error("Error fetching pet:", err);
      }
    };
    fetchPet();
  }, [id]);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        "/api/Cart/Add",
        {
          petId: null,
          animalId: pet.animalId,
          itemType: "animal",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }
  };

  if (!pet) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading pet details...
      </div>
    );
  }

  return (
    <div className="bg-white mt-12">
      <div className="w-full grid place-items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-6 w-full max-w-7xl">
          <div className="flex lg:flex-col items-center gap-4 p-6 sm:col-span-2 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* thumbnails */}
              <div className="flex flex-row lg:flex-col gap-4">
                {pet.photoUrls.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`pet-${index}`}
                    className={`w-[20%] h-25 lg:w-20 object-cover rounded-lg cursor-pointer ${
                      selectedImage === img ? "border-2 border-green-500" : ""
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* selected image */}
              <div className="flex-1">
                <img
                  src={selectedImage}
                  alt="Selected Pet"
                  className="w-full h-auto rounded-xl shadow-md object-cover"
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full col-span-1 flex flex-col items-center mt-5">
            <div className="w-full max-w-md p-4">
              <p className="text-2xl font-semibold mb-4 text-[#749260]">
                {pet.title} - {pet.gender}, {pet.age} years old
              </p>

              <div className="mb-4">
                <p className="text-gray-700 font-medium">Found Date</p>
                <p className="text-gray-600">{pet.foundDate}</p>
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-800">Health Info:</p>
                <p className="text-gray-600">
                  {pet.healthIssues || "No known issues"}
                </p>
              </div>

              <div className="mb-4">
                <p className="font-medium text-gray-800">Services:</p>
                <ul className="list-disc list-inside text-gray-600">
                  <li>Free adoption consultation</li>
                  <li>100% Safe Adoption Process</li>
                  <li>Cared for by Animal Shelter Professionals</li>
                </ul>
              </div>
            </div>

            <div className="flex">
              <button className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
                <Link to={`/adoption/adoption-form/${pet.animalId}`}>
                  Adopt Me <i className="ms-2 fa-solid fa-dog"></i>
                </Link>
              </button>

              <button
                onClick={handleAddToFavorites}
                className="bg-[#ebf0e8e5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center"
              >
                <i className="fa-regular fa-heart text-[#749260E5] hover:text-black"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl px-8 pt-0 mt-8 mx-auto">
        <div className="flex space-x-8 border-b border-gray-300">
          {["Description", "Reviews", "Support"].map((tab) => (
            <button
              key={tab}
              className={tabClasses(tab)}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === "Reviews" && (
                <span className="ml-1 text-sm bg-gray-200 px-2 rounded-full">
                  157
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-6 text-gray-700 leading-7">
          {activeTab === "Description" && (
            <>
              <p className="text-xl font-semibold mb-2">Meet {pet.title}!</p>
              <p>{pet.description}</p>
            </>
          )}
          {activeTab === "Reviews" && <p>⭐ Reviews will go here...</p>}
          {activeTab === "Support" && <p>💬 Support content goes here...</p>}
        </div>
      </div>
    </div>
  );
}
