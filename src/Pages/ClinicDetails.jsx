import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

              {/* Fees */}
              <div className="pt-6">
                <p className="text-lg font-medium text-black">Fees:</p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>General Consultation: EGP 200</li>
                  <li>Vaccinations: Starting from EGP 150</li>
                  <li>Dental Cleaning: EGP 500</li>
                  <li>Surgical Procedures: Starting from EGP 1,000</li>
                </ul>
                <p className="text-lg text-gray-700 pt-3">
                  For more details about our services or to book an appointment, visit our website or contact us directly.
                </p>
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
              <div className="pt-6 flex justify-center space-x-4">
                {/* Button to Book Appointment */}
                <button 
                  onClick={() => setShowModal(true)}
                  className="bg-[#749260] text-white py-2 px-6 rounded-xl hover:bg-[#5c7b4e]"
                >
                  Book Appointment
                </button>

                {/* Button to Contact Clinic */}
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
      </div>

      {/* Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
     <div 
  className="fixed inset-0 backdrop-blur-sm"
  onClick={() => setShowModal(false)}
></div>

          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#749260]">Book Appointment</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 mb-2">Pet's Name *</label>
                  <input
                    type="text"
                    name="petName"
                    value={formData.petName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Pet Type *</label>
                  <select
                    name="petType"
                    value={formData.petType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
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
                  <label className="block text-gray-700 mb-2">Breed</label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Reason for Visit</label>
                  <select
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
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

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Appointment Date *</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              {selectedDate && (
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Available Time Slots *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableSlots.length > 0 ? (
                      availableSlots.map(slot => (
                        <button
                          key={slot.slotId}
                          type="button"
                          onClick={() => setSelectedTime(slot.slotId.toString())}
                          className={`p-2 border rounded ${
                            selectedTime === slot.slotId.toString() 
                              ? 'bg-[#749260] text-white' 
                              : 'bg-white hover:bg-gray-100'
                          }`}
                        >
                          {formatTimeDisplay(slot.startTime)} - {formatTimeDisplay(slot.endTime)}
                        </button>
                      ))
                    ) : (
                      <p className="text-gray-500">No available slots for this date</p>
                    )}
                  </div>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  name="patientNotes"
                  value={formData.patientNotes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 border rounded"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#749260] text-white rounded hover:bg-[#5c7b4e]"
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