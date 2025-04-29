import React, { useEffect, useState } from "react";
import ClinicCard from "../components/ClinicCard";
import { useAuth } from "../Context/AuthContext"; 

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
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

    if (token) fetchClinics(); // Only fetch if token is available
  }, [token]);

  return (
    <div className="py-10">
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
  );
}
// import React, { useEffect, useState } from "react";
// import ClinicCard from "../components/ClinicCard";

// export default function Clinics() {
//   const [clinics, setClinics] = useState([]);

//   useEffect(() => {
//     const fetchClinics = async () => {
//       try {
//         const res = await fetch("https://your-api-url.com/api/clinics", {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (!res.ok) throw new Error("Failed to fetch clinics");

//         const data = await res.json();
//         setClinics(data);
//       } catch (err) {
//         console.error("Error fetching clinics:", err);
//       }
//     };

//     fetchClinics();
//   }, []);

//   return (
//     <div className="py-10">
//       {clinics.map((clinic, index) => (
//         <ClinicCard
//           key={index}
//           id={clinic.id}
//           name={clinic.name}
//           address={clinic.address}
//           phone={clinic.number}
//           website={clinic.details}
//           email={clinic.cLinicEmail}
//           mapSrc={clinic.locationUrl}
//         />
//       ))}
//     </div>
//   );
// }

