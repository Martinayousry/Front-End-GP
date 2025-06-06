import React, { useState } from "react";
import "./PetSitter.css";
import { IoMdArrowForward } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ThankYou from "../../components/ThankYou";

const PetSitter = () => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    number: "",
    startDate: "",
    endtDate: "",
    healthIssues: "",
    breed: "",
    age: "",
    notes: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    try {
      const response = await axios.post("api/PetSitterRequests", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log("Request successful:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-pet mt-15">
      <p className="text-center p-10 text-xl">Pet Sitter Form </p>
      <div className="add-pet-form">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-10 items-center pt-7">
            <div>
              <label htmlFor="number">Contact Number</label> <br />
              <input
                type="text"
                id="number"
                name="number"
                className="input-field"
                required
                value={formData.number}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="age">Pet Age</label> <br />
              <input
                type="text"
                id="age"
                name="age"
                className="input-field"
                required
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="startDate">Start Date</label> <br />
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                className="input-field"
                required
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="endtDate">End Date</label> <br />
              <input
                type="datetime-local"
                id="endtDate"
                name="endtDate"
                className="input-field"
                required
                value={formData.endtDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="breed">Breed</label> <br />
              <input
                type="text"
                id="breed"
                name="breed"
                className="input-field"
                required
                value={formData.breed}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="healthIssues">Health Issues</label> <br />
              <input
                type="text"
                id="healthIssues"
                name="healthIssues"
                className="input-field"
                required
                value={formData.healthIssues}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div className="w-full">
              <label htmlFor="notes">Notes</label> <br />
              <input
                type="text"
                id="notes"
                name="notes"
                className="input-field w-full"
                value={formData.notes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="submit-button inline-flex items-center justify-center my-12 ml-120"
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

export default PetSitter;