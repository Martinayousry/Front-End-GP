import React from "react";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import "./ThankYou.css";

const ThankYou = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="overlay">
      <div className="container">
        <button onClick={onClose} className="close-button">
          ×
        </button>
        <div className="checkmark flex justify-center text-green-600 text-5xl mb-4">
          <IoCheckmarkDoneCircleOutline />
        </div>
        <p className="font-bold text-xl text-center mb-2">
          Adoption Request Submitted!
        </p>
        <p className="text-gray-600 text-center">
          Thank you for submitting your adoption request. <br />
          Our team will review your application and get back to you shortly.
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
