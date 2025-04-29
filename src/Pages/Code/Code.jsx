import React, { useState } from "react";

import "./Code.css";
import ThankYou from '../../components/ThankYou'

const Code = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDonate = () => {
    setShowModal(true);
  };
  return (
    <div className="content">
      <div className="code p-30 text-center flex flex-col  items-center ">
        <h1 className="font-bold text-xl border-b-1 border-gray-400 pb-4 w-[500px]">
          Payment
        </h1>
        <p className="mt-5">
          Enter the code sent to your phone number <br />
          We’ve sent you a message with a four-digit code to verify your phone
          number.
        </p>
        <div className="mt-5">
          <input
            type="text"
            maxLength="1"
            inputMode="numeric"
            className="digit"
          />
          <input
            type="text"
            maxLength="1"
            inputMode="numeric"
            className="digit"
          />
          <input
            type="text"
            maxLength="1"
            inputMode="numeric"
            className="digit"
          />
          <input
            type="text"
            maxLength="1"
            inputMode="numeric"
            className="digit"
          />
        </div>
        <button onClick={handleDonate} className="next text-xl items-center">
          Next
        </button>
        <ThankYou show={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default Code;
