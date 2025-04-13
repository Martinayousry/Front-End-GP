import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

 
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-100 transition-all duration-500 ease-in-out"
    >
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you are looking for doesn't exist.
        </p>
    
        <img
          src="/images/sadDog.jpg" 
          alt="Cute Dog"
          className="mx-auto mb-6 w-64  object-contain"
        />
        
        <button
          onClick={handleGoBack}
          className="bg-[#749260E5] p-3 rounded-2xl text-white text-center transition-transform transform hover:scale-105"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i> Go Back
        </button>
      </div>
    </div>
  );
}
