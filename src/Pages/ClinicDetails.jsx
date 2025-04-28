import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function ClinicDetails() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`/api/Clinic/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClinic(res.data);
      } catch (err) {
        console.error("Error fetching clinic:", err);
      }
    };

    fetchClinic();
  }, [id, token]);

  return (
    <>
      <div className="bg-white mt-15">
        <div className="w-full p-1 grid place-items-center">
          <div className="w-[85%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 rounded-2xl bg-gray-100">
            <div className="lg:col-span-2 p-8 text-gray-700">
              <p className="font-medium text-xl text-black">Details</p>
              <h1 className="pt-3 text-3xl font-semibold">{clinic?.name}</h1>

              {/* Doctor Details */}
              <div className="pt-6">
                <p className="text-lg font-medium text-black">Doctor: {clinic?.doctor?.userName}</p>
              </div>

              {/* Address */}
              <div className="pt-3">
                <p className="text-lg font-medium text-black">Address: {clinic?.address}</p>

              {clinic?.locationUrl && (
                <div className="pt-6">
                  <iframe
                    src={clinic.locationUrl}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[300px] border-0 rounded-xl"
                  ></iframe>
                </div>
              )}
              </div>

              {/* Clinic Contact Info */}
              <div className="pt-3">
                <p className="text-lg font-medium text-black">Phone: {clinic?.number}</p>
              </div>

              <div className="pt-3">
                <p className="text-lg font-medium text-black">Email: {clinic?.cLinicEmail}</p>
              </div>

              {/* Clinic Details */}
              <div className="pt-6">
                <p className="text-lg font-medium text-black">Details: {clinic?.details}</p>
              </div>

              {/* Fees */}
              <div className="pt-6">
                <p className="text-lg font-medium text-black">Fees:</p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>General Consultation: EGP 200</li>
                  <li>Vaccinations: Starting from EGP 150</li>
                  <li>Dental Cleaning: EGP 500</li>
                  <li>Surgical Procedures: Starting from EGP 1,000</li>
                </ul>
                <p className="text-lg text-gray-700 pt-3">
                  For more details about our services or to book an appointment, visit our website or contact us directly.
                </p>
              </div>


            </div>

            {/* Clinic Info Section Without Card */}
            <div className="lg:col-span-1 p-8">
              <div className="bg-[#f1f5f8] p-4 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-[#2d3e2f] mb-4">Clinic Info</h2>
                <p className="text-lg font-medium text-black">Opening Hours:</p>
                <p className="text-lg text-gray-700">9:00 AM - 6:00 PM (Mon - Fri)</p>

                <p className="text-lg font-medium text-black pt-4">Specializations:</p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>General Medicine</li>
                  <li>Pediatrics</li>
                  <li>Orthopedics</li>
                  <li>Dental Care</li>
                </ul>
              </div>
              <div className="pt-6 flex justify-center space-x-4">
                {/* Button to Book Appointment */}
                <button className="bg-[#749260] text-white py-2 px-6 rounded-xl hover:bg-[#5c7b4e]">
                  Book Appointment
                </button>

                {/* Button to Contact Clinic */}
                <button className="bg-gray-300 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-400">
                  Contact Clinic
                </button>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-[#749260E5] p-3 rounded-2xl text-white text-center mt-7 max-sm:w-[40%] max-md:w-[30%] lg:w-[20%] xl:w-[15%] ms-20 flex items-center justify-center"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back
          </button>
        </div>
      </div>
    </>
  );
}
