import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClinicDetailsDr() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [slots, setSlots] = useState([]);
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSlot, setCurrentSlot] = useState(null);
  const [slotForm, setSlotForm] = useState({
    startTime: "",
    endTime: ""
  });
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`/api/Clinic/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClinic(res.data);
      } catch (err) {
        console.error("Error fetching clinic:", err);
        toast.error("Failed to load clinic details");
      }
    };

    const fetchSlots = async () => {
      try {
        const res = await axios.get(`/api/Slot/clinic/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSlots(res.data);
      } catch (err) {
        console.error("Error fetching slots:", err);
        toast.error("Failed to load clinic slots");
      }
    };

    fetchClinic();
    fetchSlots();
  }, [id, token]);

  const handleSlotInputChange = (e) => {
    const { name, value } = e.target;
    setSlotForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      const slotData = {
        clinicId: parseInt(id),
        startTime: slotForm.startTime,
        endTime: slotForm.endTime
      };

      await axios.post("/api/Slot", slotData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh slots
      const res = await axios.get(`/api/Slot/clinic/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSlots(res.data);
      setShowSlotModal(false);
      setSlotForm({ startTime: "", endTime: "" });
      toast.success("Slot added successfully!");
    } catch (err) {
      console.error("Error adding slot:", err);
      toast.error("Failed to add slot. Please try again.");
    }
  };

  const handleEditSlot = async (e) => {
    e.preventDefault();
    try {
      const slotData = {
        slotId: currentSlot.slotId,
        clinicId: parseInt(id),
        startTime: slotForm.startTime,
        endTime: slotForm.endTime
      };

      await axios.put(`/api/Slot/${currentSlot.slotId}`, slotData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh slots
      const res = await axios.get(`/api/Slot/clinic/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSlots(res.data);
      setShowEditModal(false);
      setCurrentSlot(null);
      setSlotForm({ startTime: "", endTime: "" });
      toast.success("Slot updated successfully!");
    } catch (err) {
      console.error("Error updating slot:", err);
      toast.error("Failed to update slot. Please try again.");
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (window.confirm("Are you sure you want to delete this slot?")) {
      try {
        await axios.delete(`/api/Slot/${slotId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Refresh slots
        const res = await axios.get(`/api/Slot/clinic/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSlots(res.data);
        toast.success("Slot deleted successfully!");
      } catch (err) {
        console.error("Error deleting slot:", err);
        toast.error("Failed to delete slot. Please try again.");
      }
    }
  };

  const formatTimeDisplay = (timeString) => {
    if (!timeString) return "";

    // Check if timeString is already in HH:MM format
    if (/^\d{2}:\d{2}$/.test(timeString)) {
      const [hours, minutes] = timeString.split(':');
      const hourNum = parseInt(hours, 10);
      const period = hourNum >= 12 ? 'PM' : 'AM';
      const displayHour = hourNum % 12 || 12;
      return `${displayHour}:${minutes} ${period}`;
    }

    return timeString;
  };

  const openEditModal = (slot) => {
    setCurrentSlot(slot);
    setSlotForm({
      startTime: slot.startTime,
      endTime: slot.endTime
    });
    setShowEditModal(true);
  };

  return (
    <div className="bg-white mt-15">
      <div className="w-full p-1 grid place-items-center">
        <div className="w-[85%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 rounded-2xl bg-gray-100">
          <div className="lg:col-span-2 p-8 text-gray-700">
            <p className="font-medium text-xl text-black">Details</p>
            <h1 className="pt-3 text-3xl font-semibold">{clinic?.name}</h1>

            {/* Doctor Details */}
            <div className="pt-6">
              <p className="text-lg font-medium text-black">Doctor: {clinic?.doctor?.userName}</p>
            </div>

            {/* Address */}
            <div className="pt-3">
              <p className="text-lg font-medium text-black">Address: {clinic?.address}</p>

              {clinic?.locationUrl && (
                <div className="pt-6">
                  <iframe
                    src={clinic.locationUrl}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[300px] border-0 rounded-xl"
                  ></iframe>
                </div>
              )}
            </div>

            {/* Clinic Contact Info */}
            <div className="pt-3">
              <p className="text-lg font-medium text-black">Phone: {clinic?.number}</p>
            </div>

            <div className="pt-3">
              <p className="text-lg font-medium text-black">Email: {clinic?.cLinicEmail}</p>
            </div>

            {/* Clinic Details */}
            <div className="pt-6">
              <p className="text-lg font-medium text-black">Details: {clinic?.details}</p>
            </div>

            {/* Slots Section */}
            <div className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium text-black">Available Slots:</p>
                <button 
                  onClick={() => setShowSlotModal(true)}
                  className="bg-[#749260] text-white py-1 px-4 rounded hover:bg-[#5c7b4e] text-sm"
                >
                  Add Slot
                </button>
              </div>
              
              {slots.length > 0 ? (
                <div className="space-y-2">
                  {slots.map(slot => (
                    <div key={slot.slotId} className="flex justify-between items-center p-3 bg-white rounded shadow">
                      <div>
                        <span className="font-medium">{formatTimeDisplay(slot.startTime)}</span> - <span className="font-medium">{formatTimeDisplay(slot.endTime)}</span>
                      </div>
                      <div className="space-x-2">
                        <button 
                          onClick={() => openEditModal(slot)}
                          className="bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDeleteSlot(slot.slotId)}
                          className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No slots available. Add a new slot.</p>
              )}
            </div>
          </div>

          {/* Clinic Info Section Without Card */}
          <div className="lg:col-span-1 p-8">
            <div className="bg-[#f1f5f8] p-4 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold text-[#2d3e2f] mb-4">Clinic Info</h2>
              <p className="text-lg font-medium text-black">Opening Hours:</p>
              <p className="text-lg text-gray-700">9:00 AM - 6:00 PM (Mon - Fri)</p>

              <p className="text-lg font-medium text-black pt-4">Specializations:</p>
              <ul className="list-disc pl-5 text-gray-700">
                <li>General Medicine</li>
                <li>Pediatrics</li>
                <li>Orthopedics</li>
                <li>Dental Care</li>
              </ul>
            </div>
            <div className="pt-6 flex justify-center">
              <button 
                onClick={() => navigate(`/Chat/${clinic?.doctor?.id}`)}
                className="bg-gray-300 text-gray-700 py-2 px-6 rounded-xl hover:bg-gray-400"
              >
                Contact Clinic
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="bg-[#749260E5] p-3 rounded-2xl text-white text-center mt-7 max-sm:w-[40%] max-md:w-[30%] lg:w-[20%] xl:w-[15%] ms-20 flex items-center justify-center"
        >
          <i className="fa-solid fa-arrow-left mr-2"></i>
          Back
        </button>
      </div>

      {/* Add Slot Modal */}
      {showSlotModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#749260]">Add New Slot</h2>
              <button 
                onClick={() => setShowSlotModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleAddSlot}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Time (HH:MM) *</label>
                <input
                  type="time"
                  name="startTime"
                  value={slotForm.startTime}
                  onChange={handleSlotInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">End Time (HH:MM) *</label>
                <input
                  type="time"
                  name="endTime"
                  value={slotForm.endTime}
                  onChange={handleSlotInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowSlotModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#749260] text-white rounded hover:bg-[#5c7b4e]"
                >
                  Add Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Slot Modal */}
      {showEditModal && currentSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#749260]">Edit Slot</h2>
              <button 
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleEditSlot}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Time (HH:MM) *</label>
                <input
                  type="time"
                  name="startTime"
                  value={slotForm.startTime}
                  onChange={handleSlotInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">End Time (HH:MM) *</label>
                <input
                  type="time"
                  name="endTime"
                  value={slotForm.endTime}
                  onChange={handleSlotInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#749260] text-white rounded hover:bg-[#5c7b4e]"
                >
                  Update Slot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}