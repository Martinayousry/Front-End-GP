import React, { useState } from "react";
import { IoMdArrowForward } from "react-icons/io";
import { FaDog, FaClock, FaPaw } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";
import ThankYou from "../../components/ThankYou";
import { useAuth } from "../../Context/AuthContext";
import { useParams, useSearchParams } from "react-router-dom";
import bgImage from "../../assets/adoptt.jpg"; 
import { useNavigate } from "react-router-dom";

const AdoptionForm = () => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const navigate = useNavigate();


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

    const requestBody = {
      petId: type === "pet" ? id : null,
      animalId: type === "animal" ? id : null,
      anotherPet: form.elements["anotherPet"].value,
      hoursAnimalAlone: form.elements["hoursAnimalAlone"].value,
      ownedAnimalBefore: form.elements["ownedAnimalBefore"].value,
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
      toast.success("Adoption request submitted successfully!");
    
      setTimeout(() => {
        navigate(`/pet-profile/${id}`);
      }, 2000); // optional: wait 2 seconds before redirect
    } catch (err) {
      console.error("Adoption request failed:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-20 px-4"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <motion.div
        className="bg-white bg-opacity-95 max-w-2xl mx-auto p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-3xl font-bold text-center text-green-700 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          🐾 Adoption Application
        </motion.h1>

        <form onSubmit={handleAdopt} className="space-y-6">
          <div>
            <label htmlFor="anotherPet" className="block font-medium mb-1">
              <FaDog className="inline-block mr-2 text-green-600" />
              Do you have other pets?
            </label>
            <select
              id="anotherPet"
              name="anotherPet"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">-- Select an option --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label htmlFor="hoursAnimalAlone" className="block font-medium mb-1">
              <FaClock className="inline-block mr-2 text-green-600" />
              How many hours per day will the animal be alone?
            </label>
            <input
              type="number"
              min="0"
              id="hoursAnimalAlone"
              name="hoursAnimalAlone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="ownedAnimalBefore" className="block font-medium mb-1">
              <FaPaw className="inline-block mr-2 text-green-600" />
              Have you ever owned an animal before?
            </label>
            <select
              id="ownedAnimalBefore"
              name="ownedAnimalBefore"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">-- Select an option --</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg inline-flex items-center shadow-lg"
            >
              Submit <IoMdArrowForward className="ml-2 text-xl" />
            </motion.button>
          </div>
        </form>

        <ThankYou show={showModal} onClose={() => setShowModal(false)} />
      </motion.div>
    </div>
  );
};

export default AdoptionForm;
