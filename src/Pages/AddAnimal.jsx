import React, { useState } from "react";
import { FaInfoCircle, FaHeading, FaBirthdayCake, FaCalendarAlt, FaVenusMars, FaNotesMedical, FaCamera, FaHeart, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import bgImage from "../../src/assets/adoptt.jpg";
import { useAuth } from "../Context/AuthContext";

export default function AddAnimal() {
  const [showSubmitting, setShowSubmitting] = useState(false);
const [marriageStatus, setMarriageStatus] = useState(0);
const [adoptionStatus, setAdoptionStatus] = useState(0);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleAddAnimal = async (e) => {
    e.preventDefault();
    setShowSubmitting(true);

    const form = e.target;
    const formData = new FormData();

    formData.append("description", form.description.value);
    formData.append("title", form.title.value);
    formData.append("age", form.age.value);
    formData.append("foundDate", form.foundDate.value);
    formData.append("gender", form.gender.value);
    formData.append("healthIssues", form.healthIssues.value);
    formData.append("Marriage", marriageStatus);
    formData.append("Adoption", adoptionStatus);

    // Append multiple photos
    const photos = form.photos.files;
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }

    try {
      const res = await fetch("/api/Animals", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to add animal");

      toast.success("Animal added successfully!");
      form.reset();
      setMarriageStatus(false);
      setAdoptionStatus(false);
      setTimeout(() => {
        navigate("/admin");
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Error adding animal, please try again.");
      setShowSubmitting(false);
    }
  };
  const handleCheckboxChange = (setter) => (e) => {
  setter(e.target.checked ? 1 : 0);
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
          🐾 Add New Animal
        </motion.h1>

        <form onSubmit={handleAddAnimal} className="space-y-6">
          <div>
            <label htmlFor="description" className="block font-medium mb-1">
              <FaInfoCircle className="inline-block mr-2 text-green-600" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="title" className="block font-medium mb-1">
              <FaHeading className="inline-block mr-2 text-green-600" />
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="age" className="block font-medium mb-1">
              <FaBirthdayCake className="inline-block mr-2 text-green-600" />
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              min="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="foundDate" className="block font-medium mb-1">
              <FaCalendarAlt className="inline-block mr-2 text-green-600" />
              Found Date
            </label>
            <input
              type="date"
              id="foundDate"
              name="foundDate"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div>
            <label htmlFor="gender" className="block font-medium mb-1">
              <FaVenusMars className="inline-block mr-2 text-green-600" />
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label htmlFor="healthIssues" className="block font-medium mb-1">
              <FaNotesMedical className="inline-block mr-2 text-green-600" />
              Health Issues
            </label>
            <textarea
              id="healthIssues"
              name="healthIssues"
              rows="2"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Optional"
            ></textarea>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={marriageStatus === 1}
onChange={handleCheckboxChange(setMarriageStatus)}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <span className="ml-2 font-medium flex items-center">
                  <FaHeart className="mr-2 text-green-600" />
                  Marriage Status
                </span>
              </label>
            </div>

            <div className="flex items-center">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={adoptionStatus === 1}
onChange={handleCheckboxChange(setAdoptionStatus)}
                  className="form-checkbox h-5 w-5 text-green-600 rounded focus:ring-green-500"
                />
                <span className="ml-2 font-medium flex items-center">
                  <FaHome className="mr-2 text-green-600" />
                  Available for Adoption
                </span>
              </label>
            </div>
          </div>

          {/* Photos input remains the same */}
          <div>
            <label htmlFor="photos" className="block font-medium mb-1">
              <FaCamera className="inline-block mr-2 text-green-600" />
              Photos
            </label>
            <input
              type="file"
              id="photos"
              name="photos"
              accept="image/*"
              multiple
              className="w-full p-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Submit button remains the same */}
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={showSubmitting}
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-lg inline-flex items-center shadow-lg ${
                showSubmitting ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {showSubmitting ? "Submitting..." : "Add Animal"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}