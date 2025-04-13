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
        <div className=" checkmark flex justify-center">
          <IoCheckmarkDoneCircleOutline />
        </div>
        <p className="font-bold">Thank You for Your Generosity!</p>
        <p className="text-gray-500">
          Your donation helps us care for animals in need and give <br /> them a
          chance at a better life. We're grateful for your generosity!
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
