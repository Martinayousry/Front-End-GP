import React, { useEffect, useState } from "react";
import ClinicCard from "../components/ClinicCard";
import { useAuth } from "../Context/AuthContext"; 

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showAppointments, setShowAppointments] = useState(false);
  const [loading, setLoading] = useState(false);
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

        const data = await res.json();
        setClinics(data);
      } catch (err) {
        console.error("Error fetching clinics:", err);
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

      const data = await res.json();
      setAppointments(data);
      setShowAppointments(true);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      alert("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const toggleAppointmentsView = () => {
    if (showAppointments) {
      setShowAppointments(false);
    } else {
      fetchMyAppointments();
    }
  };

  // Function to format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Function to format time for display
  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const [hours, minutes] = timeString.split(':');
    const hourNum = parseInt(hours, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes} ${period}`;
  };

  return (
    <div className="py-10 px-4">
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
          {appointments.length > 0 ? (
            appointments.map((appointment) => (
              <div key={appointment.appointmentId} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#749260]">
                      {appointment.clinic?.name || "N/A"}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-gray-700">
                        <span className="font-medium">Pet Name:</span> {appointment.petName || "N/A"}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Date:</span> {formatDate(appointment.appointmentDate)}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-medium">Time:</span> {formatTime(appointment.slot?.startTime)} - {formatTime(appointment.slot?.endTime)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      {appointment.clinic?.address || "N/A"}
                    </p>
                    <p className="text-gray-700">
                      {appointment.clinic?.number || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">You don't have any appointments yet.</p>
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