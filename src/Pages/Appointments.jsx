import React from "react";

export default function MyAppointments({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return <div className="text-center text-gray-500">No appointments found.</div>;
  }

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-semibold mb-6 text-[#2d3e2f] text-center">My Appointments</h3>
      <div className="space-y-6">
        {appointments.map((appointment, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-white p-6 rounded-xl shadow-lg border border-gray-200"
          >
            <div className="flex flex-col gap-2 text-[#2d3e2f]">
              <div className="text-lg font-medium">{appointment.patientName}</div>
              <div className="text-sm text-gray-600">{appointment.reason || "General Checkup"}</div>
              <div className="text-sm text-gray-500">{appointment.date} at {appointment.time}</div>
            </div>

            {/* Status Badge */}
            <div className="flex flex-col items-center justify-center">
              <span
                className={`text-white text-xs py-1 px-3 rounded-full ${
                  appointment.status === "Confirmed"
                    ? "bg-[#4CAF50]"
                    : appointment.status === "Pending"
                    ? "bg-[#FF9800]"
                    : "bg-[#F44336]"
                }`}
              >
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
