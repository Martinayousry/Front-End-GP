import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// THEME COLORS (adjust if your theme colors change!)
// Primary: #749260 (dark green)
// Secondary/Accent: #5c7b4e (darker green), #f1f5f8 (light bg), #2d3e2f (deep green for headings)

export default function ClinicDetails() {
  const { id } = useParams();
  const [clinic, setClinic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    breed: "",
    reasonForVisit: "",
    patientNotes: ""
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

    fetchClinic();
  }, [id, token]);

  const fetchAvailableSlots = async (date) => {
    try {
      const res = await axios.get(`/api/Slot/available/${id}?date=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAvailableSlots(res.data);
    } catch (err) {
      console.error("Error fetching available slots:", err);
      toast.error("Failed to load available slots");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTime("");
    if (date) {
      fetchAvailableSlots(date);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both date and time");
      return;
    }

    try {
      const selectedSlot = availableSlots.find(slot => slot.slotId === parseInt(selectedTime));
      if (!selectedSlot) {
        toast.error("Invalid time slot selected");
        return;
      }

      const appointmentData = {
        clinicId: parseInt(id),
        slotId: selectedSlot.slotId,
        appointmentDate: new Date(`${selectedDate}T${selectedSlot.startTime}:00`).toISOString(),
        patientNotes: formData.patientNotes,
        petName: formData.petName,
        breed: formData.breed,
        petType: formData.petType,
        reasonForVisit: formData.reasonForVisit
      };

      await axios.post("/api/Appointment", appointmentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Appointment booked successfully!");
      setShowModal(false);
      setFormData({
        petName: "",
        petType: "",
        breed: "",
        reasonForVisit: "",
        patientNotes: ""
      });
      setSelectedDate("");
      setSelectedTime("");
    } catch (err) {
      console.error("Error booking appointment:", err);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-white mt-15 min-h-screen">
        <div className="w-full p-4 flex flex-col items-center">
          <div className="w-full max-w-7xl grid grid-cols-1 xl:grid-cols-3 gap-7 rounded-2xl bg-[#f1f5f8] shadow-xl">
            {/* MAIN CLINIC DETAILS */}
            <div className="xl:col-span-2 p-10 text-gray-700">
              <p className="font-semibold text-2xl text-[#2d3e2f]">Clinic Details</p>
              <h1 className="pt-3 text-4xl font-bold text-[#749260]">{clinic?.name}</h1>
              {/* Doctor Details */}
              <div className="pt-8 flex items-center space-x-3">
                <i className="fa-solid fa-user-md text-[#749260] text-xl"></i>
                <span className="text-lg font-medium text-black">Doctor: <span className="text-[#5c7b4e]">{clinic?.doctor?.userName}</span></span>
              </div>
              {/* Address */}
              <div className="pt-4 flex items-center space-x-3">
                <i className="fa-solid fa-location-dot text-[#749260] text-xl"></i>
                <span className="text-lg font-medium text-black">Address: <span className="text-[#5c7b4e]">{clinic?.address}</span></span>
              </div>
              {clinic?.locationUrl && (
                <div className="pt-6 rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src={clinic.locationUrl}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-[280px] border-0"
                  ></iframe>
                </div>
              )}
              {/* Clinic Contact Info */}
              <div className="pt-4 flex items-center space-x-3">
                <i className="fa-solid fa-phone text-[#749260] text-xl"></i>
                <span className="text-lg font-medium text-black">Phone: <span className="text-[#5c7b4e]">{clinic?.number}</span></span>
              </div>
              <div className="pt-4 flex items-center space-x-3">
                <i className="fa-solid fa-envelope text-[#749260] text-xl"></i>
                <span className="text-lg font-medium text-black">Email: <span className="text-[#5c7b4e]">{clinic?.cLinicEmail}</span></span>
              </div>
              {/* Clinic Details */}
              <div className="pt-8">
                <p className="text-lg font-medium text-black mb-1">About</p>
                <div className="p-4 bg-white rounded-xl shadow text-gray-700">
                  {clinic?.details}
                </div>
              </div>
              {/* Fees */}
              <div className="pt-8">
                <p className="text-lg font-medium text-black mb-2">Consultation Fees</p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><span className="font-medium text-[#749260]">General Consultation:</span> EGP 200</li>
                  <li><span className="font-medium text-[#749260]">Vaccinations:</span> Starting from EGP 150</li>
                  <li><span className="font-medium text-[#749260]">Dental Cleaning:</span> EGP 500</li>
                  <li><span className="font-medium text-[#749260]">Surgical Procedures:</span> Starting from EGP 1,000</li>
                </ul>
                <p className="text-base text-gray-600 mt-2">For more details about our services or to book an appointment, visit our website or contact us directly.</p>
              </div>
            </div>
            {/* SIDEBAR CLINIC INFO */}
            <div className="xl:col-span-1 p-8 flex flex-col gap-4">
              <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#e0e7ef]">
                <h2 className="text-2xl font-bold text-[#2d3e2f] mb-5 border-b pb-2">Clinic Info</h2>
                <div className="mb-4">
                  <p className="text-lg font-medium text-black mb-1">Opening Hours</p>
                  <p className="text-base text-gray-700 flex items-center"><i className="fa-regular fa-clock mr-2 text-[#749260]" />9:00 AM - 6:00 PM <span className="ml-2 text-xs text-gray-500">(Mon - Fri)</span></p>
                </div>
                <div>
                  <p className="text-lg font-medium text-black mb-1">Specializations</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>General Medicine</li>
                    <li>Pediatrics</li>
                    <li>Orthopedics</li>
                    <li>Dental Care</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-3 pt-2">
                {/* Button to Book Appointment */}
                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#749260] to-[#5c7b4e] text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-md hover:scale-[1.03] transition"
                >
                  <i className="fa-solid fa-calendar-plus"></i> Book Appointment
                </button>
                {/* Button to Contact Clinic */}
                <button 
                  onClick={() => navigate(`/Chat/${clinic?.doctor?.id}`)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 text-[#2d3e2f] py-3 px-6 rounded-xl font-semibold text-lg hover:bg-gray-300 shadow"
                >
                  <i className="fa-brands fa-rocketchat"></i> Contact Clinic
                </button>
              </div>
            </div>
          </div>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-[#749260] p-3 rounded-2xl text-white text-center mt-10 w-40 flex items-center justify-center font-medium shadow hover:bg-[#5c7b4e] transition"
          >
            <i className="fa-solid fa-arrow-left mr-2"></i>
            Back
          </button>
        </div>
      </div>
      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
  className="fixed inset-0 backdrop-blur-sm transition-all duration-300"
  onClick={() => setShowModal(false)}
></div>
          <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl border border-[#e0e7ef]">
            <div className="flex justify-between items-center mb-7 border-b pb-3">
              <h2 className="text-3xl font-bold text-[#749260] flex items-center gap-2"><i className="fa-solid fa-calendar-plus"></i> Book Appointment</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-[#749260] bg-gray-100 rounded-full w-9 h-9 flex justify-center items-center transition"
                title="Close"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Pet's Name <span className="text-[#749260]">*</span></label>
                  <input
                    type="text"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#e0e7ef] rounded-xl outline-[#749260] focus:ring-2 ring-[#749260]/20 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Pet Type <span className="text-[#749260]">*</span></label>
                  <select
                    name="petType"
                    value={formData.petType}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#e0e7ef] rounded-xl outline-[#749260] focus:ring-2 ring-[#749260]/20 transition"
                    required
                  >
                    <option value="">Select pet type</option>
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                    <option value="bird">Bird</option>
                    <option value="rabbit">Rabbit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Breed</label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#e0e7ef] rounded-xl outline-[#749260] focus:ring-2 ring-[#749260]/20 transition"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">Reason for Visit</label>
                  <select
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-[#e0e7ef] rounded-xl outline-[#749260] focus:ring-2 ring-[#749260]/20 transition"
                  >
                    <option value="">Select a reason</option>
                    <option value="checkup">Regular Checkup</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="sickness">Sickness</option>
                    <option value="injury">Injury</option>
                    <option value="grooming">Grooming</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Appointment Date <span className="text-[#749260]">*</span></label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-[#e0e7ef] rounded-xl outline-[#749260] focus:ring-2 ring-[#749260]/20 transition"
                  required
                />
              </div>
              {selectedDate && (
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2 font-medium">Available Time Slots <span className="text-[#749260]">*</span></label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {availableSlots.length > 0 ? (
                      availableSlots.map(slot => (
                        <button
                          key={slot.slotId}
                          type="button"
                          onClick={() => setSelectedTime(slot.slotId.toString())}
                          className={`p-3 rounded-xl font-medium border-2 transition text-lg ${
                            selectedTime === slot.slotId.toString() 
                              ? 'bg-gradient-to-r from-[#749260] to-[#5c7b4e] text-white border-[#749260] scale-105'
                              : 'bg-[#f1f5f8] text-[#2d3e2f] border-[#e0e7ef] hover:bg-white hover:border-[#749260]'
                          }`}
                        >
                          {formatTimeDisplay(slot.startTime)} - {formatTimeDisplay(slot.endTime)}
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-500 col-span-full text-center">No available slots for this date</p>
                    )}
                  </div>
                </div>
              )}
              <div className="mb-8">
                <label className="block text-gray-700 mb-2 font-medium">Additional Notes</label>
                <textarea
                  name="patientNotes"
                  value={formData.patientNotes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-[#e0e7ef] rounded-xl outline-[#749260] focus:ring-2 ring-[#749260]/20 transition resize-none"
                  placeholder="Let us know anything important about your pet..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 bg-gradient-to-r from-[#749260] to-[#5c7b4e] text-white rounded-xl font-semibold hover:scale-105 transition"
                  disabled={!selectedTime}
                >
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}