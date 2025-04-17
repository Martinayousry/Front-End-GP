import React, { useState } from "react";
import "./AdoptionForm.css";
import { IoMdArrowForward } from "react-icons/io";
import ThankYou from "../../components/ThankYou";
import { useAuth } from "../../Context/AuthContext";
import { useParams, useSearchParams } from "react-router-dom";

const AdoptionForm = () => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  if (!["pet", "animal"].includes(type)) {
    return (
      <div className="text-center py-10 text-lg text-red-500">
        Invalid adoption type.
      </div>
    );
  }

  const handleAdopt = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const anotherPet = form.elements["anotherPet"].value;
    const hoursAnimalAlone = form.elements["hoursAnimalAlone"].value;
    const ownedAnimalBefore = form.elements["ownedAnimalBefore"].value;

    const requestBody = {
      petId: type === "pet" ? id : null,
      animalId: type === "animal" ? id : null,
      anotherPet,
      hoursAnimalAlone,
      ownedAnimalBefore,
    };

    try {
      const res = await fetch("/api/AdoptionRequests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) throw new Error("Failed to submit adoption request");

      setShowModal(true);
      form.reset();
    } catch (err) {
      console.error("Adoption request failed:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="adoption mt-16">
      <p className="text-center p-10 text-xl">Adoption Application Form</p>
      <div className="adoption-form">
        <form onSubmit={handleAdopt}>
          <div className="flex flex-col p-15 gap-10">
            <div>
              <label htmlFor="anotherPet">Do you have other pets?</label> <br />
              <input
                type="text"
                id="anotherPet"
                name="anotherPet"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="hoursAnimalAlone">
                How many hours per day will the animal be alone?
              </label>{" "}
              <br />
              <input
                type="text"
                id="hoursAnimalAlone"
                name="hoursAnimalAlone"
                className="input-field"
                required
              />
            </div>

            <div>
              <label htmlFor="ownedAnimalBefore">
                Have you ever owned an animal before?
              </label>{" "}
              <br />
              <input
                type="text"
                id="ownedAnimalBefore"
                name="ownedAnimalBefore"
                className="input-field"
                required
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

export default AdoptionForm;
