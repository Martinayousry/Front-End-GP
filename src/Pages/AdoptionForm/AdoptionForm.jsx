import React, { useState } from "react";
import "./AdoptionForm.css";
import { IoMdArrowForward } from "react-icons/io";
import ThankYou from "../../components/ThankYou";

const AdoptionForm = () => {
  const [showModal, setShowModal] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    if (form.checkValidity()) {
      setShowModal(true);
    } else {
      form.reportValidity();
    }
  };
  return (
    <div className="adoption mt-16">
      <p className="text-center p-10 text-xl">Adoption Application Form</p>
      <div className="adoption-form">
        <form onSubmit={handleDonate}>
          <div className="flex flex-row gap-10 items-center pt-7 ">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Second Name</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">Email Address</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Phone Number</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">Address</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Government</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">Nationality</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Gender</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Age</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="firstName">First Name</label> <br />
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="input-field"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label> <br />
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="input-field"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="submit-button inline-flex items-center justify-center my-12 ml-120"
            onClick={handleDonate}
          >
            Submit
            <IoMdArrowForward className="text-2xl ml-2" />
          </button>
          <ThankYou show={showModal} onClose={() => setShowModal(false)} />
        </form>
      </div>
    </div>
  );
};

export default AdoptionForm;