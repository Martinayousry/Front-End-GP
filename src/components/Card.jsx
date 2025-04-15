import React from "react";
import { Link } from 'react-router-dom';


export default function Card({ id, title, description,gender ,photoUrls}) {
  return (
    <>
      <div className="card w-[280px] h-[280px] bg-[#F9FAFB] flex items-center justify-center align-middle me-4  ">
      <Link to={`/pet-profile/${id}`}>
  <div className="card-info flex-col w-[232px] h-[208px] ease-in-out delay-100 hover:cursor-pointer hover:scale-105 transition-transform">
    <div className="grid place-items-center pb-5">
    <img
              src={photoUrls?.[0] || "/images/placeholder.jpg"}
              className="rounded-full w-[80px] h-[80px] object-cover"
              alt={name}
            />
    </div>

    <div className="text-center">
      <p className="font-medium text-black">{title}</p>
      <p className="text-[#6941C6] mb-2">{gender}</p>
      <p className="text-[#667085]">
      {description || "No description available."}
      </p>
    </div>
  </div>
</Link>

      </div>
    </>
  );
}
