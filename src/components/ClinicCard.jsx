import { Link } from "react-router-dom";
import React from "react";

export default function ClinicCard({
  id,
  name,
  address,
  phone,
  details,
  email,
  mapSrc,
}) {
  return (
    <div className="grid place-items-center w-full mt-30">
      <div className="clinic-card grid grid-cols-1 lg:grid-cols-2 bg-[#F9FAFB] text-black w-[75%] rounded-2xl border border-gray-100 shadow-sm p-2">
        <div className="p-8">
          <p className="font-medium p-4 text-xl">{name}</p>

          <div className="flex flex-row ms-4">
            <i className="fa-solid fa-location-dot opacity-50 me-1 mt-[4px]"></i>
            <p className="ms-1 whitespace-pre-line">{address}</p>
          </div>

          <div className="flex flex-row m-3">
            <i className="fa-solid fa-phone opacity-50 me-2 mt-1"></i>
            <p>{phone}</p>
          </div>

          <p className="p-3">
            <i className="fa-solid fa-earth-americas opacity-50 me-1"></i>
            {details}
          </p>

          <p className="p-[11px]">
            <i className="fa-regular fa-envelope opacity-50 me-1"></i>
            {email}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <iframe
            src={mapSrc}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="p-5 w-full h-[100%] border-0"
          ></iframe>

          <button className="bg-[#749260E5] p-3 rounded-2xl mt-3 text-white me-3 mb-4 sm:w-[50%] md:w-[30%] w-[75%] text-center">
            <Link to={`/clinic-details/${id}`}>See more</Link>
            <i className="fa-solid fa-arrow-right ms-1"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
