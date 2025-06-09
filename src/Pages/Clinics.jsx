import React, { useEffect, useState } from "react";
import ClinicCard from "../components/ClinicCard";
import { useAuth } from "../Context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchClinics = async () => {
      try {
        const res = await fetch("/api/Clinic", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch clinics");

        const responseData = await res.json();
        setClinics(responseData);
      } catch (err) {
        console.error("Error fetching clinics:", err);
        toast.error("Failed to load clinics");
      }
    };

    if (token) fetchClinics();
  }, [token]);

  const fetchMyAppointments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/Appointment/my-appointments", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to fetch appointments");

      const responseData = await res.json();
      const appointmentsData = Array.isArray(responseData) ? responseData : [responseData];
      
      const transformedAppointments = appointmentsData.map(appt => ({
        ...appt,
        appointmentDate: new Date(appt.appointmentDate),
        formattedDate: formatDate(appt.appointmentDate),
        timeRange: `${formatTime(appt.slot?.startTime)} - ${formatTime(appt.slot?.endTime)}`
      }));
      
      setAppointments(transformedAppointments);
      setFilteredAppointments(transformedAppointments);
      setShowAppointments(true);
      toast.success("Appointments loaded successfully");
    } catch (err) {
      console.error("Error fetching appointments:", err);
      toast.error(`Failed to load appointments: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedDate) {
      setFilteredAppointments(appointments);
      return;
    }

    const filtered = appointments.filter(appt => {
      return (
        appt.appointmentDate.getDate() === selectedDate.getDate() &&
        appt.appointmentDate.getMonth() === selectedDate.getMonth() &&
        appt.appointmentDate.getFullYear() === selectedDate.getFullYear()
      );
    });

    setFilteredAppointments(filtered);
  }, [selectedDate, appointments]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  const toggleAppointmentsView = () => {
    if (showAppointments) {
      setShowAppointments(false);
    } else {
      fetchMyAppointments();
    }
  };

  return (
    <div className="py-10 px-4">
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleAppointmentsView}
          className="bg-[#749260] text-white py-2 px-6 rounded-xl hover:bg-[#5c7b4e] transition-colors"
        >
          {showAppointments ? "Show Clinics" : "My Appointments"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Loading...</p>
        </div>
      ) : showAppointments ? (
        <div className="space-y-6">
          {/* Date filter control */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-[#2d3e2f] mb-1">
                  Filter by Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#749260]"
                  placeholderText="Select date to filter"
                  isClearable
                />
              </div>
              {selectedDate && (
                <button
                  onClick={() => setSelectedDate(null)}
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
                >
                  Clear Date Filter
                </button>
              )}
            </div>
          </div>

          {/* Appointments list */}
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <div key={appointment.appointmentId} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Owner Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-[#2d3e2f] border-b pb-2">Owner Information</h4>
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="font-medium">{appointment.user?.userName || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Phone:</span>
                      <p className="font-medium">
                        {appointment.user?.phoneNumber || 'Not provided'}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Email:</span>
                      <p className="font-medium">{appointment.user?.email || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Pet Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-[#2d3e2f] border-b pb-2">Pet Information</h4>
                    <div>
                      <span className="text-sm text-gray-500">Name:</span>
                      <p className="font-medium">{appointment.petName || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Type:</span>
                      <p className="font-medium capitalize">{appointment.petType || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Breed:</span>
                      <p className="font-medium capitalize">{appointment.breed || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Appointment Details */}
                 <div className="space-y-3">
                    <h4 className="font-semibold text-lg text-[#2d3e2f] border-b pb-2">Appointment Details</h4>
                    <div>
                      <span className="text-sm text-gray-500">Date:</span>
                      <p className="font-medium">{appointment.formattedDate}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Time:</span>
                      <p className="font-medium">{appointment.timeRange}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Reason:</span>
                      <p className="font-medium">{appointment.reasonForVisit || 'N/A'}</p>
                    </div> 
                    <div>
                      <span className="text-sm text-gray-500">Notes:</span>
                      <p className="font-medium">
                        {appointment.patientNotes || 'No notes provided'}
                      </p>
                    </div>
                    <div className="mt-2">
                      <span className={`text-white text-xs py-1 px-3 rounded-full ${
                        appointment.status === "Confirmed" ? "bg-[#4CAF50]" :
                        appointment.status === "Pending" ? "bg-[#FF9800]" :
                        "bg-[#F44336]"
                      }`}>
                        {appointment.status || "Scheduled"}
                      </span>
                    </div>
                  </div>
                </div>

                
              </div>
            ))
          ) : (
             <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p className="text-gray-600">
                {appointments.length === 0 
                  ? "You don't have any appointments yet."
                  : "No appointments found for the selected date."}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {clinics.map((clinic, index) => (
            <ClinicCard
              key={index}
              id={clinic.clinicId}
              name={clinic.name}
              address={clinic.address}
              phone={clinic.number}
              details={clinic.details}
              email={clinic.cLinicEmail}
              mapSrc={clinic.locationUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}