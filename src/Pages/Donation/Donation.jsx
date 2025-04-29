import React, { useState } from "react";
import "./Donation.css";
import { useNavigate } from "react-router-dom";

const Donation = () => {
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/payment/${amount}`);
  };
  return (
    <div className="p-25">
    <div className="header">
      <h6>Support Our Mission</h6>
      <h1>Every Contribution Matters</h1>
      <p className="text-gray-500">
        Our mission is simple — provide care, shelter, and hope to animals in
        need. With your help, we can rescue <br />
        more animals, provide them with medical care, and ensure they find
        loving forever homes.
      </p>
    </div>
    <div className="amount p-10 text-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 items-center"
      >
        <label>
          Donation Amount <span className="text-red-700">*</span>
        </label>
        <input
          type="number"
          required
          className="input text-center"
          placeholder="120"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit" className="submit text-center px-6 py-2">
          Pay
        </button>
      </form>
    </div>
  </div>
  );
};

export default Donation;
