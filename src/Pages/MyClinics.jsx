import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation
import ClinicCard from "../components/ClinicCard";
import { useAuth } from "../Context/AuthContext";

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await fetch("/api/Clinic/MyClinics", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch clinics");

        const data = await res.json();
        setClinics(data);
      } catch (err) {
        console.error("Error fetching clinics:", err);
      }
    };

    if (token) fetchClinics(); // Only fetch if token is available
  }, [token]);

  return (
    <div className="grid place-items-center w-full mt-30">
    {clinics.map((clinic) => (
  <div
    key={clinic.clinicId}
    className="clinic-card grid grid-cols-1 lg:grid-cols-2 bg-[#F9FAFB] text-black w-[75%] rounded-2xl border border-gray-100 shadow-sm p-2 mb-8" // <-- added mb-8 for spacing
  >
    <div className="p-8">
      <p className="font-medium p-4 text-xl">{clinic.name}</p>

      <div className="flex flex-row ms-4">
        <i className="fa-solid fa-location-dot opacity-50 me-1 mt-[4px]"></i>
        <p className="ms-1 whitespace-pre-line">{clinic.address}</p>
      </div>

      <div className="flex flex-row m-3">
        <i className="fa-solid fa-phone opacity-50 me-2 mt-1"></i>
        <p>{clinic.number}</p>
      </div>

      <p className="p-3">
        <i className="fa-solid fa-earth-americas opacity-50 me-1"></i>
        {clinic.details}
      </p>

      <p className="p-[11px]">
        <i className="fa-regular fa-envelope opacity-50 me-1"></i>
        {clinic.cLinicEmail}
      </p>
    </div>

    <div className="flex flex-col items-end">
      <iframe
        src={clinic.locationUrl}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="p-5 w-full h-[100%] border-0"
      ></iframe>

      <button className="bg-[#749260E5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center">
        <Link to={`/clinic-details-dr/${clinic.clinicId}`}>
          See more <i className="fa-solid fa-arrow-right ms-1"></i>
        </Link>
      </button>
    </div>
  </div>
))}

    </div>
  );
}
