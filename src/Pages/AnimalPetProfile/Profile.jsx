import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

const ProfileComponent = ({
  apiEndpoint,
  requiresAuth = false,
  titleKey = "title",
  imageKey = "photoUrls",
  detailsConfig,
  defaultTab = "Description",
  tabs = ["Description", "Reviews", "Support"],
  servicesList = [
    "Free adoption consultation",
    "100% Safe Adoption Process",
    "Cared for by Animal Shelter Professionals",
  ],
  buttons,
  showOwnerInfo = false,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, isAuthenticated } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [error, setError] = useState(null);


  const tabClasses = (tab) =>
    `px-4 py-2 font-medium ${
      activeTab === tab ? "text-black border-b-2 border-black" : "text-gray-500"
    } cursor-pointer`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {};

        // Add authorization header if required and user is authenticated
        if (requiresAuth && isAuthenticated) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await axios.get(`${apiEndpoint}/${id}`, { headers });

        const data = Array.isArray(res.data) ? res.data[0] : res.data;
        setProfileData(data);
        setSelectedImage(data[imageKey][0]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Failed to load profile");

        if (err.response?.status === 401) {
          if (requiresAuth) {
            navigate("/login", {
              state: { from: `/profile/${id}` },
            });
          }
        }
      }
    };

    fetchData();
  }, [
    id,
    apiEndpoint,
    imageKey,
    requiresAuth,
    token,
    isAuthenticated,
    navigate,
  ]);

 


  if (error) {
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  }

  if (!profileData) {
    return (
      <div className="text-center mt-20 text-gray-600">Loading details...</div>
    );
  }

  return (
    <div className="bg-white mt-12">
      <div className="w-full grid place-items-center">
        <div className="grid grid-cols-1 lg:grid-cols-3 p-4 gap-6 w-full max-w-7xl">
          {/* Image Gallery Section */}
          <div className="flex lg:flex-col items-center justify-center gap-4 p-6 sm:col-span-2 w-full ">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              {/* thumbnails */}
              <div className="flex flex-row lg:flex-col gap-4">
                {profileData[imageKey].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${titleKey}-${index}`}
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
                  alt={`Selected ${titleKey}`}
                  className="w-full h-auto rounded-xl shadow-md object-cover"
                />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="w-full col-span-1 flex flex-col items-center mt-5">
            <div className="w-full max-w-md p-4">
              <p className="text-2xl font-semibold mb-4 text-[#749260]">
                {profileData[titleKey]} - {profileData.gender},{" "}
                {profileData.age} years old
              </p>

              {/* Dynamic details based on config */}
              {detailsConfig.map((detail) => (
                <div key={detail.key} className="mb-4">
                  <p className="text-gray-700 font-medium">{detail.label}</p>
                  <p className="text-gray-600">
                    {profileData[detail.key] ||
                      detail.default ||
                      "Not specified"}
                  </p>
                </div>
              ))}

              {/* Owner information for pets */}
              {showOwnerInfo && profileData.owner && (
                <div className="mb-4">
                  <p className="text-gray-700 font-medium">Owner Information</p>
                  <p className="text-gray-600">
                    Name: {profileData.owner.userName}
                  </p>
                  <p className="text-gray-600">
                    Email: {profileData.owner.email}
                  </p>
                  <button className="bg-[#749260E5] w-50 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
                    <Link to={`/chat/${profileData.owner.id}`}>
                      chat with owner  <i className="fa-solid fa-comments"></i>
                    </Link>
                  </button>
                </div>
              )}

              <div className="mb-4">
                <p className="font-medium text-gray-800">Services:</p>
                <ul className="list-disc list-inside text-gray-600">
                  {servicesList.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex ">
              {buttons || (
                <>
                  <button className="bg-[#749260E5] w-40 p-3 rounded-xl mt-3 text-white me-3 mb-4 text-center">
                    <Link to={"/adoption-form"}>
                      Adopt Me <i className="ms-2 fa-solid fa-dog"></i>
                    </Link>
                  </button>
                  <button className="bg-[#ebf0e8e5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center">
                    <Link to={"/adoption-form"}>
                      <i className="fa-regular fa-heart text-[#749260E5] hover:text-black"></i>
                    </Link>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl px-8 pt-0 mt-8 mx-auto">
        <div className="flex space-x-8 border-b border-gray-300">
          {tabs.map((tab) => (
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
              <p className="text-xl font-semibold mb-2">
                Meet {profileData[titleKey]}!
              </p>
              <p>{profileData.description || "No description available"}</p>
            </>
          )}
          {activeTab === "Reviews" && <p>⭐ Reviews will go here...</p>}
          {activeTab === "Support" && <p>💬 Support content goes here...</p>}
          {/* Add other custom tab contents here */}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
