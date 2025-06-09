import React, { useState, useEffect } from "react";
import { useAuth } from "../Context/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function MyAppointments() {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [loading, setLoading] = useState({
    clinics: true,
    appointments: false
  });

  // Fetch clinics when component mounts
  useEffect(() => {
    const fetchClinics = async () => {
      try {
        setLoading(prev => ({ ...prev, clinics: true }));
        const res = await fetch("/api/Clinic/MyClinics", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch clinics");

        const data = await res.json();
        setClinics(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching clinics:", err);
      } finally {
        setLoading(prev => ({ ...prev, clinics: false }));
      }
    };

    if (token) fetchClinics();
  }, [token]);

  // Fetch appointments when selected clinic changes
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedClinic) {
        setAppointments([]);
        setFilteredAppointments([]);
        return;
      }

      try {
        setLoading(prev => ({ ...prev, appointments: true }));
        const res = await fetch(`/api/Appointment/clinic/${selectedClinic}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        let data = await res.json();
        if (!Array.isArray(data)) {
          data = data ? [data] : [];
        }

        const transformedAppointments = data.map(appt => ({
          ...appt,
          appointmentDate: new Date(appt.appointmentDate),
          formattedDate: new Date(appt.appointmentDate).toLocaleDateString(),
          timeRange: `${appt.slot?.startTime || 'Unknown'} - ${appt.slot?.endTime || ''}`
        }));

        setAppointments(transformedAppointments);
        setFilteredAppointments(transformedAppointments);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching appointments:", err);
        setAppointments([]);
        setFilteredAppointments([]);
      } finally {
        setLoading(prev => ({ ...prev, appointments: false }));
      }
    };

    if (token) fetchAppointments();
  }, [selectedClinic, token]);

  // Filter appointments by date
  useEffect(() => {
    if (!selectedDate) {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(appt => {
        return (
          appt.appointmentDate.getDate() === selectedDate.getDate() &&
          appt.appointmentDate.getMonth() === selectedDate.getMonth() &&
          appt.appointmentDate.getFullYear() === selectedDate.getFullYear()
        );
      });
      setFilteredAppointments(filtered);
    }
  }, [selectedDate, appointments]);

  if (loading.clinics) {
    return <div className="text-center text-gray-500">Loading clinics...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="ml-[25%] p-6 w-[75%]">
      <h3 className="text-2xl font-semibold mb-6 text-[#2d3e2f]">My Appointments</h3>
      
      {/* Clinic Selection and Date Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <label htmlFor="clinic-select" className="block text-sm font-medium text-[#2d3e2f] mb-2">
            Select Clinic
          </label>
          <select
            id="clinic-select"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#749260] focus:border-[#749260]"
            value={selectedClinic || ""}
            onChange={(e) => setSelectedClinic(e.target.value ? parseInt(e.target.value) : null)}
          >
            <option value="">-- Select a clinic --</option>
            {clinics.map((clinic) => (
              <option key={clinic.clinicId} value={clinic.clinicId}>
                {clinic.name} - {clinic.address}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-[#2d3e2f] mb-2">
            Filter by Date
          </label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#749260] focus:border-[#749260]"
            placeholderText="Select date to filter"
            isClearable
          />
        </div>
      </div>

      {loading.appointments && (
        <div className="text-center text-gray-500">Loading appointments...</div>
      )}

     {!loading.appointments && selectedClinic && (
  <div className="space-y-4">
    {filteredAppointments.length === 0 ? (
      <div className="text-center text-gray-500 py-8">
        {selectedDate ? "No appointments found for selected date" : "No appointments found for this clinic"}
      </div>
    ) : (
      filteredAppointments.map((appointment) => (
        <div
          key={appointment.appointmentId}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Owner Information */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-[#2d3e2f] border-b pb-2">Owner Information</h4>
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">{appointment.user.userName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Phone:</span>
                <p className="font-medium">
                  {appointment.user.phoneNumber || 'Not provided'}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Email:</span>
                <p className="font-medium">{appointment.user.email}</p>
              </div>
            </div>

            {/* Pet Information */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-[#2d3e2f] border-b pb-2">Pet Information</h4>
              <div>
                <span className="text-sm text-gray-500">Name:</span>
                <p className="font-medium">{appointment.petName}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Type:</span>
                <p className="font-medium capitalize">{appointment.petType}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Breed:</span>
                <p className="font-medium capitalize">{appointment.breed}</p>
              </div>
            </div>

            {/* Appointment Details */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg text-[#2d3e2f] border-b pb-2">Appointment Details</h4>
              <div>
                <span className="text-sm text-gray-500">Date & Time:</span>
                <p className="font-medium">
                  {appointment.formattedDate} at {appointment.timeRange}
                </p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Reason:</span>
                <p className="font-medium">{appointment.reasonForVisit}</p>
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
    )}
  </div>
)}
    </div>
  );
}