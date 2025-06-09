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
    <div className="bg-white min-h-screen pt-20 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-[#749260] hover:text-[#5c7b4e] transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Clinics
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{clinic?.name}</h1>
          <div className="w-10"></div> {/* Spacer for alignment */}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Clinic Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Clinic Info Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Clinic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#749260]">Doctor</h3>
                    <p className="text-gray-700">{clinic?.doctor?.userName}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#749260]">Address</h3>
                    <p className="text-gray-700">{clinic?.address}</p>
                  </div>
                  
                  {clinic?.locationUrl && (
                    <div className="mt-4">
                      <iframe
                        src={clinic.locationUrl}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-64 rounded-lg border border-gray-200"
                      ></iframe>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#749260]">Contact</h3>
                    <p className="text-gray-700">{clinic?.number}</p>
                    <p className="text-gray-700">{clinic?.cLinicEmail}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-[#749260]">About</h3>
                    <p className="text-gray-700">{clinic?.details}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slots Section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Available Slots</h2>
                  <button 
                    onClick={() => setShowSlotModal(true)}
                    className="flex items-center bg-[#749260] hover:bg-[#5c7b4e] text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Slot
                  </button>
                </div>
                
                {slots.length > 0 ? (
                  <div className="space-y-3">
                    {slots.map(slot => (
                      <div key={slot.slotId} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-[#749260] flex items-center justify-center text-white">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium text-gray-800">{formatTimeDisplay(slot.startTime)} - {formatTimeDisplay(slot.endTime)}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => openEditModal(slot)}
                            className="flex items-center text-white bg-blue-500 hover:bg-blue-600 py-1 px-3 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteSlot(slot.slotId)}
                            className="flex items-center text-white bg-red-500 hover:bg-red-600 py-1 px-3 rounded-lg transition-colors"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No slots available</h3>
                    <p className="mt-1 text-gray-500">Add a new slot to get started.</p>
                    <div className="mt-6">
                      <button
                        onClick={() => setShowSlotModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#749260] hover:bg-[#5c7b4e] focus:outline-none"
                      >
                        <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        New Slot
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Clinic Info */}
          <div className="space-y-6">
            {/* Clinic Hours Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Clinic Hours</h2>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
                    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
                    { day: "Sunday", hours: "Closed" }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-700">{item.day}</span>
                      <span className="font-medium text-gray-800">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Services</h2>
                <ul className="space-y-2">
                  {[
                    "General Checkups",
                    "Vaccinations",
                    "Dental Care",
                    "Surgical Procedures",
                    "Emergency Care",
                    "Pet Grooming"
                  ].map((service, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 h-5 w-5 text-[#749260] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact Button */}
           
          </div>
        </div>
      </div>

      {/* Add Slot Modal */}
      {showSlotModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Add New Slot</h2>
                <button 
                  onClick={() => setShowSlotModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleAddSlot}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={slotForm.startTime}
                      onChange={handleSlotInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#749260] focus:border-[#749260]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={slotForm.endTime}
                      onChange={handleSlotInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#749260] focus:border-[#749260]"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowSlotModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#749260] hover:bg-[#5c7b4e] rounded-md transition-colors"
                  >
                    Add Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Slot Modal */}
      {showEditModal && currentSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Slot</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleEditSlot}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={slotForm.startTime}
                      onChange={handleSlotInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#749260] focus:border-[#749260]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={slotForm.endTime}
                      onChange={handleSlotInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#749260] focus:border-[#749260]"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-white bg-[#749260] hover:bg-[#5c7b4e] rounded-md transition-colors"
                  >
                    Update Slot
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}