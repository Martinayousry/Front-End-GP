import React, { useState } from "react";
import "./Payment.css";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const Payment = () => {
  const navigate = useNavigate();
  const { amount } = useParams();
  const donationAmount = parseFloat(amount);
  const adminFee = donationAmount * 0.05;
  const totalAmount = donationAmount + adminFee;
  const [cardNumber, setCardNumber] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/code`);
      };

  const handleInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(value);
  };

  const [expiry, setExpiry] = useState("");

  const handleChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length >= 3) {
      value = value.slice(0, 4);
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }

    setExpiry(value);
  };

  return (
    <div className="payment mt-15">
    <div className="main grid grid-cols-2">
      <div className="pl-25 pt-10 pr-10">
        <h1 className="font-bold text-xl border-b-1 border-gray-400 pb-4">
          Payment
        </h1>
        <form className="pt-7" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label>Pay With</label> <br />
            <input type="radio" id="Card" name="Pay With" value="Card" />
            <label for="Card" className="m-2">
              Card
            </label>
            <input type="radio" id="Bank" name="Pay With" value="Bank" />
            <label for="Bank" className="m-2">
              Bank
            </label>
            <input
              type="radio"
              id="Transfer"
              name="Pay With"
              value="Transfer"
            />
            <label for="Transfer" className="m-2">
              Transfer
            </label>
          </div>
          <div className="mb-5">
            <label>Card Number</label> <br />
            <input
              type="text"
              className="input-field"
              placeholder="1234 5678 9101 1121"
              maxLength="19"
              inputMode="numeric"
              value={cardNumber}
              onChange={handleInputChange}
              //   style={{ padding: '10px', fontSize: '16px', width: '250px' }}
            />
          </div>
          <div className="mb-5">
            <label>Expiration Date</label> <br />
            <input
              type="text"
              required
              className="input-field"
              placeholder="MM/YY"
              maxLength="5"
              inputMode="numeric"
              value={expiry}
              onChange={handleChange}
            />
          </div>

          <div className="mb-5">
            <label>CVV</label> <br />
            <input
              type="number"
              required
              className="input-field"
              placeholder="123"
            />
          </div>
          <div className="mb-5">
            <input
              type="checkbox"
              id="card"
              name="card"
              value="Bike"
              required
            />
            <label for="card">Save card details</label>
          </div>
          <button
            type="submit"
            className="pay-button text-center px-6 py-2 text-2xl"
          >
            Pay
          </button>
        </form>
        <p className="text-neutral-500 py-5">
          Your personal data will be used to process your order, support your{" "}
          <br />
          experience throughout this website, and for other purposes described
          in our privacy policy .
        </p>
        <button
          className="goback flex flex-row justify-center text-xl items-center gap-2 mt-5"
          onClick={() => navigate("/donation")}
        >
          <IoMdArrowBack />
          Back
        </button>
      </div>
      <div className="right  col-span-1 pl-15 pt-10 pr-10">
        <h1 className="font-bold text-xl border-b-1 border-gray-400 pb-4">
          Payment Details
        </h1>
        <div className="py-10 border-b-1 border-gray-400">
          <p className="pb-5">
            Donation Amount{" "}
            <span className="ml-30 text-gray-500">${donationAmount}</span>
          </p>
          <p>
            5% Administrative fees{" "}
            <span className="ml-30 text-gray-500">${adminFee}</span>
          </p>
        </div>
        <div className="py-10 text-xl">
          <p>
            Total Amount{" "}
            <span className="ml-30 text-gray-500">${totalAmount}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Payment;
