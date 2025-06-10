// import React, { useState } from "react";
// import "./AddPetForm.css";
// import { IoMdArrowForward } from "react-icons/io";
// import { FaHeart, FaHome } from "react-icons/fa";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { ToastContainer, toast } from 'react-toastify';

// const AddPetForm = () => {
//   const { token } = useAuth();

//   const [petData, setPetData] = useState({
//     name: "",
//     age: "",
//     title: "",
//     breed: "",
//     gender: "",
//     healthIssues: "",
//     description: "",
//     marriage: 0,
//     adoption: 0,
//     photos: [],
//   });

//   const handleDonate = async (e) => {
//     e.preventDefault();

//     const form = e.target.closest("form");
//     if (!form.checkValidity()) {
//       form.reportValidity();
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", petData.name);
//     formData.append("age", petData.age);
//     formData.append("title", petData.title);
//     formData.append("breed", petData.breed);
//     formData.append("gender", petData.gender);
//     formData.append("healthIssues", petData.healthIssues);
//     formData.append("description", petData.description || "");
//     formData.append("marriage", petData.marriage);
//     formData.append("adoption", petData.adoption);

//     petData.photos.forEach((file) => {
//       formData.append("photos", file);
//     });

//     try {
//       const response = await axios.post("/api/Pet", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
      
//       // Success toast
//       toast.success("Pet has been added successfully!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
      
//       // Reset form
//       setPetData({
//         name: "",
//         age: "",
//         title: "",
//         breed: "",
//         gender: "",
//         healthIssues: "",
//         description: "",
//         marriage: 0,
//         adoption: 0,
//         photos: [],
//       });
//     } catch (error) {
//       // Error toast
//       toast.error(error.response?.data?.message || "Error adding pet", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//       });
//       console.error("Error adding pet:", error.response?.data || error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setPetData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCheckboxChange = (name) => (e) => {
//     setPetData((prev) => ({ ...prev, [name]: e.target.checked ? 1 : 0 }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files || []);
//     setPetData((prev) => ({
//       ...prev,
//       photos: [...prev.photos, ...files],
//     }));
//   };

//   const removeImage = (index) => {
//     setPetData((prev) => ({
//       ...prev,
//       photos: prev.photos.filter((_, i) => i !== index),
//     }));
//   };

//  return (
//     <div className="add-pet-container">
//       {/* Add the ToastContainer at the top of your component's return */}
//       <ToastContainer />
      
//       {/* Rest of your existing JSX remains exactly the same */}
//       <div className="add-pet-header">
//         <h2 className="text-3xl font-bold text-gray-800">Add Pet Profile</h2>
//         <p className="text-gray-600">Fill in the details about your pet</p>
//       </div>

//       <div className="add-pet-form-container">
//         <form onSubmit={handleDonate} className="pet-form">
//           <div className="form-grid">
//             {/* Row 1 */}
//             <div className="form-group">
//               <label htmlFor="name" className="form-label">
//                 Pet Name <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="form-input"
//                 required
//                 value={petData.name}
//                 onChange={handleInputChange}
//                 placeholder="e.g. Max"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="age" className="form-label">
//                 Age <span className="required">*</span>
//               </label>
//               <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 className="form-input"
//                 required
//                 min="0"
//                 value={petData.age}
//                 onChange={handleInputChange}
//                 placeholder="In years"
//               />
//             </div>

//             {/* Row 2 */}
//             <div className="form-group">
//               <label htmlFor="title" className="form-label">
//                 Title <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 className="form-input"
//                 required
//                 value={petData.title}
//                 onChange={handleInputChange}
//                 placeholder="e.g. Friendly Labrador"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="breed" className="form-label">
//                 Breed <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="breed"
//                 name="breed"
//                 className="form-input"
//                 required
//                 value={petData.breed}
//                 onChange={handleInputChange}
//                 placeholder="e.g. Golden Retriever"
//               />
//             </div>

//             {/* Row 3 */}
//             <div className="form-group">
//               <label htmlFor="gender" className="form-label">
//                 Gender <span className="required">*</span>
//               </label>
//               <select
//                 id="gender"
//                 name="gender"
//                 className="form-input"
//                 required
//                 value={petData.gender}
//                 onChange={handleInputChange}
//               >
//                 <option value="">Select Gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label htmlFor="healthIssues" className="form-label">
//                 Health Status <span className="required">*</span>
//               </label>
//               <input
//                 type="text"
//                 id="healthIssues"
//                 name="healthIssues"
//                 className="form-input"
//                 required
//                 value={petData.healthIssues}
//                 onChange={handleInputChange}
//                 placeholder="e.g. No known issues"
//               />
//             </div>

//             {/* Row 4 - Checkboxes */}
//             <div className="form-group checkbox-group">
//               <label className="form-label">Status</label>
//               <div className="checkbox-container">
//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     checked={petData.marriage === 1}
//                     onChange={handleCheckboxChange("marriage")}
//                     className="checkbox-input"
//                   />
//                   <span className="checkbox-custom">
//                     <FaHeart className="checkbox-icon" />
//                   </span>
//                   <span className="checkbox-text">Marriage Status</span>
//                 </label>

//                 <label className="checkbox-label">
//                   <input
//                     type="checkbox"
//                     checked={petData.adoption === 1}
//                     onChange={handleCheckboxChange("adoption")}
//                     className="checkbox-input"
//                   />
//                   <span className="checkbox-custom">
//                     <FaHome className="checkbox-icon" />
//                   </span>
//                   <span className="checkbox-text">Available for Adoption</span>
//                 </label>
//               </div>
//             </div>

//             {/* Row 5 - Description */}
//             <div className="form-group full-width">
//               <label htmlFor="description" className="form-label">
//                 Description
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 className="form-textarea"
//                 rows="3"
//                 value={petData.description}
//                 onChange={handleInputChange}
//                 placeholder="Tell us about your pet's personality, habits, etc."
//               />
//             </div>

//             {/* Row 6 - Image Upload */}
//             <div className="form-group full-width">
//               <label className="form-label">
//                 Photos <span className="required">*</span>
//               </label>
//               <div className="upload-container">
//                 <label className="upload-box">
//                   <input
//                     type="file"
//                     accept="image/*"
//                     multiple
//                     className="hidden"
//                     onChange={handleImageUpload}
//                   />
//                   <div className="upload-content">
//                     <svg
//                       className="upload-icon"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//                       />
//                     </svg>
//                     <p className="upload-text">
//                       <span className="text-blue-600 font-medium">
//                         Click to upload
//                       </span>{" "}
//                       or drag and drop
//                     </p>
//                     <p className="upload-subtext">
//                       JPG, JPEG, PNG (Max. 5MB each)
//                     </p>
//                   </div>
//                 </label>
//               </div>

//               {/* Image Preview */}
//               {petData.photos.length > 0 && (
//                 <div className="image-preview-container">
//                   {petData.photos.map((file, index) => (
//                     <div key={index} className="image-preview-item">
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt="Preview"
//                         className="preview-image"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeImage(index)}
//                         className="remove-image-btn"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="form-actions">
//             <button type="submit" className="submit-btn">
//               Submit Pet Profile
//               <IoMdArrowForward className="btn-icon" />
//             </button>
//           </div>
//         </form>
//       </div>


//     </div>
//   );
// };

// export default AddPetForm; 

import React, { useState } from "react";
import "./AddPetForm.css";
import { IoMdArrowForward, IoMdPaw } from "react-icons/io";
import { FaHeart, FaHome, FaDog, FaCat, FaVenusMars, FaStethoscope } from "react-icons/fa";
import { GiThreeLeaves, GiWeight } from "react-icons/gi";
import { MdTitle, MdDescription, MdPhotoCamera } from "react-icons/md";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';

const AddPetForm = () => {
  const { token } = useAuth();

  const [petData, setPetData] = useState({
    name: "",
    age: "",
    title: "",
    breed: "",
    gender: "",
    healthIssues: "",
    description: "",
    marriage: 0,
    adoption: 0,
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
    formData.append("marriage", petData.marriage);
    formData.append("adoption", petData.adoption);

    petData.photos.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await axios.post("/api/Pet", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      toast.success("Pet has been added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setPetData({
        name: "",
        age: "",
        title: "",
        breed: "",
        gender: "",
        healthIssues: "",
        description: "",
        marriage: 0,
        adoption: 0,
        photos: [],
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding pet", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Error adding pet:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPetData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name) => (e) => {
    setPetData((prev) => ({ ...prev, [name]: e.target.checked ? 1 : 0 }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    setPetData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...files],
    }));
  };

  const removeImage = (index) => {
    setPetData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="add-pet-container">
      <ToastContainer />
      
      <div className="add-pet-header">
        <div className="header-icon-container">
          <IoMdPaw className="header-icon" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800">Add Pet Profile</h2>
        <p className="text-gray-600">Share your furry friend's details with our community</p>
      </div>

      <div className="add-pet-form-container">
        <form onSubmit={handleDonate} className="pet-form">
          <div className="form-grid">
            {/* Row 1 */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <IoMdPaw className="input-icon" /> Pet Name <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  required
                  value={petData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Max"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="age" className="form-label">
                <GiThreeLeaves className="input-icon" /> Age <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="number"
                  id="age"
                  name="age"
                  className="form-input"
                  required
                  min="0"
                  value={petData.age}
                  onChange={handleInputChange}
                  placeholder="In years"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                <MdTitle className="input-icon" /> Title <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  required
                  value={petData.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Friendly Labrador"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="breed" className="form-label">
                {petData.breed.toLowerCase().includes('cat') ? (
                  <FaCat className="input-icon" />
                ) : (
                  <FaDog className="input-icon" />
                )} Breed <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="breed"
                  name="breed"
                  className="form-input"
                  required
                  value={petData.breed}
                  onChange={handleInputChange}
                  placeholder="e.g. Golden Retriever"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="form-group">
              <label htmlFor="gender" className="form-label">
                <FaVenusMars className="input-icon" /> Gender <span className="required">*</span>
              </label>
              <div className="select-with-icon">
                <select
                  id="gender"
                  name="gender"
                  className="form-input"
                  required
                  value={petData.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="healthIssues" className="form-label">
                <FaStethoscope className="input-icon" /> Health Status <span className="required">*</span>
              </label>
              <div className="input-with-icon">
                <input
                  type="text"
                  id="healthIssues"
                  name="healthIssues"
                  className="form-input"
                  required
                  value={petData.healthIssues}
                  onChange={handleInputChange}
                  placeholder="e.g. No known issues"
                />
              </div>
            </div>

            {/* Row 4 - Checkboxes */}
            <div className="form-group checkbox-group">
              <label className="form-label">
                <IoMdPaw className="input-icon" /> Status
              </label>
              <div className="checkbox-container">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={petData.marriage === 1}
                    onChange={handleCheckboxChange("marriage")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom">
                    <FaHeart className="checkbox-icon" />
                  </span>
                  <span className="checkbox-text">Marriage Status</span>
                </label>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={petData.adoption === 1}
                    onChange={handleCheckboxChange("adoption")}
                    className="checkbox-input"
                  />
                  <span className="checkbox-custom">
                    <FaHome className="checkbox-icon" />
                  </span>
                  <span className="checkbox-text">Available for Adoption</span>
                </label>
              </div>
            </div>

            {/* Row 5 - Description */}
            <div className="form-group full-width">
              <label htmlFor="description" className="form-label">
                <MdDescription className="input-icon" /> Description
              </label>
              <div className="textarea-with-icon">
                <textarea
                  id="description"
                  name="description"
                  className="form-textarea"
                  rows="3"
                  value={petData.description}
                  onChange={handleInputChange}
                  placeholder="Tell us about your pet's personality, habits, etc."
                />
              </div>
            </div>

            {/* Row 6 - Image Upload */}
            <div className="form-group full-width">
              <label className="form-label">
                <MdPhotoCamera className="input-icon" /> Photos <span className="required">*</span>
              </label>
              <div className="upload-container">
                <label className="upload-box">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <div className="upload-content">
                    <MdPhotoCamera className="upload-icon" />
                    <p className="upload-text">
                      <span className="text-primary font-medium">
                        Click to upload
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="upload-subtext">
                      JPG, JPEG, PNG (Max. 5MB each)
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              {petData.photos.length > 0 && (
                <div className="image-preview-container">
                  {petData.photos.map((file, index) => (
                    <div key={index} className="image-preview-item">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="preview-image"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="remove-image-btn"
                        aria-label="Remove image"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-btn">
              <span>Submit Pet Profile</span>
              <IoMdArrowForward className="btn-icon" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPetForm;