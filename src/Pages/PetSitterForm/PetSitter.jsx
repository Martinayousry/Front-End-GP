// import React, { useState } from "react";
// import "./PetSitter.css";
// import { IoMdArrowForward } from "react-icons/io";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import ThankYou from "../../components/ThankYou";

// const PetSitter = () => {
//   const [showModal, setShowModal] = useState(false);
//   const { token } = useAuth();

//   const [formData, setFormData] = useState({
//     number: "",
//     startDate: "",
//     endtDate: "",
//     healthIssues: "",
//     breed: "",
//     age: "",
//     notes: ""
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const form = e.target.closest("form");
//     if (!form.checkValidity()) {
//       form.reportValidity();
//       return;
//     }

//     try {
//       const response = await axios.post("api/PetSitterRequests", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json"
//         }
//       });
//       console.log("Request successful:", response.data);
//       setShowModal(true);
//     } catch (error) {
//       console.error("Error:", error.response?.data || error.message);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="add-pet mt-15">
//       <p className="text-center p-10 text-xl">Pet Sitter Form </p>
//       <div className="add-pet-form">
//         <form onSubmit={handleSubmit}>
//           <div className="flex flex-row gap-10 items-center pt-7">
//             <div>
//               <label htmlFor="number">Contact Number</label> <br />
//               <input
//                 type="text"
//                 id="number"
//                 name="number"
//                 className="input-field"
//                 required
//                 value={formData.number}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="age">Pet Age</label> <br />
//               <input
//                 type="text"
//                 id="age"
//                 name="age"
//                 className="input-field"
//                 required
//                 value={formData.age}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-row gap-10 items-center pt-5">
//             <div>
//               <label htmlFor="startDate">Start Date</label> <br />
//               <input
//                 type="datetime-local"
//                 id="startDate"
//                 name="startDate"
//                 className="input-field"
//                 required
//                 value={formData.startDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="endtDate">End Date</label> <br />
//               <input
//                 type="datetime-local"
//                 id="endtDate"
//                 name="endtDate"
//                 className="input-field"
//                 required
//                 value={formData.endtDate}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-row gap-10 items-center pt-5">
//             <div>
//               <label htmlFor="breed">Breed</label> <br />
//               <input
//                 type="text"
//                 id="breed"
//                 name="breed"
//                 className="input-field"
//                 required
//                 value={formData.breed}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div>
//               <label htmlFor="healthIssues">Health Issues</label> <br />
//               <input
//                 type="text"
//                 id="healthIssues"
//                 name="healthIssues"
//                 className="input-field"
//                 required
//                 value={formData.healthIssues}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>
//           <div className="flex flex-row gap-10 items-center pt-5">
//             <div className="w-full">
//               <label htmlFor="notes">Notes</label> <br />
//               <input
//                 type="text"
//                 id="notes"
//                 name="notes"
//                 className="input-field w-full"
//                 value={formData.notes}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="submit-button inline-flex items-center justify-center my-12 ml-120"
//           >
//             Submit
//             <IoMdArrowForward className="text-2xl ml-2" />
//           </button>

//           <ThankYou show={showModal} onClose={() => setShowModal(false)} />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PetSitter;

import React, { useState } from "react";
import "./PetSitter.css";
import { IoMdArrowForward } from "react-icons/io";
import { FaPhone, FaDog, FaCalendarAlt, FaNotesMedical, FaStickyNote } from "react-icons/fa";
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
    <div
  className="add-pet mt-10"
  style={{
    backgroundImage: "url('images/hh.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "4rem 1rem",
  }}
>
      <h2 className="text-center text-3xl font-bold text-[#4c5d3fe5] mb-10">
        🐾 Pet Sitter Request Form
      </h2>
      <div className="add-pet-form bg-[#f4f7f2] p-10 rounded-2xl shadow-md max-w-[640px] mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="number" className="label">
                <FaPhone className="inline-block mr-2 text-[#749260E5]" /> Contact Number
              </label>
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
              <label htmlFor="age" className="label">
                <FaDog className="inline-block mr-2 text-[#749260E5]" /> Pet Age
              </label>
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

            <div>
              <label htmlFor="startDate" className="label">
                <FaCalendarAlt className="inline-block mr-2 text-[#749260E5]" /> Start Date
              </label>
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
              <label htmlFor="endtDate" className="label">
                <FaCalendarAlt className="inline-block mr-2 text-[#749260E5]" /> End Date
              </label>
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

            <div>
              <label htmlFor="breed" className="label">
                <FaDog className="inline-block mr-2 text-[#749260E5]" /> Breed
              </label>
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
              <label htmlFor="healthIssues" className="label">
                <FaNotesMedical className="inline-block mr-2 text-[#749260E5]" /> Health Issues
              </label>
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

            <div className="md:col-span-2">
              <label htmlFor="notes" className="label">
                <FaStickyNote className="inline-block mr-2 text-[#749260E5]" /> Additional Notes
              </label>
          <textarea
  id="notes"
  name="notes"
  rows="4"
  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#749260E5]"
  placeholder="Enter any additional notes here..."
  value={formData.notes}
  onChange={handleInputChange}
/>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="bg-[#749260E5] text-white px-8 py-3 rounded-xl shadow-md hover:bg-[#5f7a4fe5] transition-all duration-300 inline-flex items-center"
            >
              Submit Request
              <IoMdArrowForward className="text-2xl ml-2" />
            </button>
          </div>

          <ThankYou show={showModal} onClose={() => setShowModal(false)} />
        </form>
      </div>
    </div>
  );
};

export default PetSitter;
