import React, { useEffect, useState } from "react";
import axios from "axios";
import RequestTable from "../RequestTable";
import "./Doctors.css";

const Doctors = () => {
  const [requests, setRequests] = useState([]);
  const [accepted, setAccepted] = useState([]);
  const [rejected, setRejected] = useState([]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/Admin/GetRegistarationRequests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching doctor requests:", error);
    }
  };

  const handleStatusChange = async (index, id, type) => {
    try {
      const endpoint =
        type === "accept"
          ? `/api/Admin/AcceptDoctor/${id}`
          : `/api/Admin/RejectDoctor/${id}`;

      await axios.put(endpoint, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const updated = requests[index];
      if (type === "accept") setAccepted([...accepted, updated]);
      else setRejected([...rejected, updated]);

      setRequests(requests.filter((_, i) => i !== index));
    } catch (error) {
      console.error(`Error updating status:`, error);
    }
  };

  const tableFields = [
    { key: "userName", label: "Name" },
    { key: "specialization", label: "Specialization" },
    { key: "medicalId", label: "Medical ID" },
    { key: "number", label: "Phone" },
  ];

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="doctors">
      <p className="font-bold text-2xl border-b-1 border-gray-400 pb-4">Doctors</p>

      <RequestTable
        title="Pending Requests"
        data={requests}
        fields={tableFields}
        showActions={true}
        onAccept={(index, id) => handleStatusChange(index, id, "accept")}
        onReject={(index, id) => handleStatusChange(index, id, "reject")}
      />

      <div className="flex justify-between gap-5 mt-10">
        <RequestTable title="Accepted" data={accepted} fields={tableFields} />
        <RequestTable title="Rejected" data={rejected} fields={tableFields} />
      </div>
    </div>
  );
};

export default Doctors;
