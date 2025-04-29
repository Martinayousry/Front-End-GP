import React, { useState } from "react";
import "./AddPetForm.css";
import { IoMdArrowForward } from "react-icons/io";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ThankYou from "../../components/ThankYou";

const AddPetForm = () => {
  const [showModal, setShowModal] = useState(false);
  const { token } = useAuth();

  const [petData, setPetData] = useState({
    name: "",
    age: "",
    title: "",
    breed: "",
    gender: "",
    healthIssues: "",
    description: "",
    photos: [],
  });

  const handleDonate = async (e) => {
    e.preventDefault();

    const form = e.target.closest("form");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData();
    formData.append("name", petData.name);
    formData.append("age", petData.age);
    formData.append("title", petData.title);
    formData.append("breed", petData.breed);
    formData.append("gender", petData.gender);
    formData.append("healthIssues", petData.healthIssues);
    formData.append("description", petData.description || "");

    petData.photos.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await axios.post("/api/Pet", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Pet added successfully:", response.data);
      setShowModal(true);
    } catch (error) {
      console.error("Error adding pet:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setPetData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  return (
    <div className="add-pet mt-15">
      <p className="text-center p-10 text-xl">Add Pet Profile Form</p>
      <div className="add-pet-form">
        <form onSubmit={handleDonate}>
          <div className="flex flex-row gap-10 items-center pt-7">
            <div>
              <label htmlFor="name">Pet Name</label> <br />
              <input
                type="text"
                id="name"
                name="name"
                className="input-field"
                required
                value={petData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="age">Age</label> <br />
              <input
                type="number"
                id="age"
                name="age"
                className="input-field"
                required
                value={petData.age}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="title">Title</label> <br />
              <input
                type="text"
                id="title"
                name="title"
                className="input-field"
                required
                value={petData.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="breed">Breed</label> <br />
              <input
                type="text"
                id="breed"
                name="breed"
                className="input-field"
                required
                value={petData.breed}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="gender">Gender</label> <br />
              <input
                type="text"
                id="gender"
                name="gender"
                className="input-field"
                required
                value={petData.gender}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="healthIssues">Health Status</label> <br />
              <input
                type="text"
                id="healthIssues"
                name="healthIssues"
                className="input-field"
                required
                value={petData.healthIssues}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex flex-row gap-10 items-center pt-5">
            <div>
              <label htmlFor="description">Description (optional)</label> <br />
              <input
                type="text"
                id="description"
                name="description"
                className="input-field"
                value={petData.description}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="upload-box">
            <label className="upload-label">
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
              <p className="text-blue-500">Click to upload or drag and drop</p>
              <p className="text-gray-400">JPG, JPEG, PNG (less than 1MB)</p>
            </label>
          </div>
          <div className="image-preview">
            {petData.photos.map((file, index) => (
              <img
                key={index}
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="preview-img"
              />
            ))}
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

export default AddPetForm;
