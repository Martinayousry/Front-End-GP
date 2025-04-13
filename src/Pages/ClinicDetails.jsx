import React, { useEffect, useState } from "react";
import ClinicCard from "../components/ClinicCard";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export default function ClinicDetails() {
  const { id } = useParams(); 
  const [clinic, setClinic] = useState(null);
  const { token } = useAuth();


  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const res = await axios.get(`/api/Clinic/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        setClinic(res.data);
      } catch (err) {
        console.error("Error fetching clinic:", err);
      }
    };

    fetchClinic();
  }, [id,token]);
  return (
    <>
      <div className="bg-white mt-15">
        <div className="w-full  p-1 grid place-items-center">
          <div className="w-[85%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 rounded-2xl ">
          <div className="lg:col-span-2 p-8 text-gray-700">
        <p className="font-medium text-xl text-black">Details</p>
        <h1 className="pt-3 text-3xl font-semibold">{clinic?.name}</h1>

        {/* Doctor Details */}
        <div className="pt-6">
          <p className="text-lg font-medium text-black">Doctor:</p>
          <p className="text-lg text-gray-700">{clinic?.doctor?.userName}</p>
        </div>

        {/* Address */}
        <div className="pt-3">
          <p className="text-lg font-medium text-black">Address:</p>
          <p className="text-lg text-gray-700">{clinic?.address}</p>
        </div>

        {/* Clinic Contact Info */}
        <div className="pt-3">
          <p className="text-lg font-medium text-black">Phone:</p>
          <p className="text-lg text-gray-700">{clinic?.number}</p>
        </div>

        <div className="pt-3">
          <p className="text-lg font-medium text-black">Email:</p>
          <p className="text-lg text-gray-700">{clinic?.cLinicEmail}</p>
        </div>

        {/* Clinic Details */}
        <div className="pt-6">
          <p className="text-lg font-medium text-black">Details:</p>
          <p className="text-lg text-gray-700">{clinic?.details}</p>
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
            <div className=" flex justify-center my-7 m-2">
              <img src="/images/care.png" className="rounded-3xl"></img>
            </div>
          </div>
          <ClinicCard />
        </div>
      
        <button onClick={()=>Navigate(-1)} className="bg-[#749260E5] p-3 rounded-2xl text-white text-center mt-7 max-sm:w-[40%] max-md:w-[30%] lg:w-[20%] xl:w-[15%]  ms-20 flex items-center justify-center">
  <i className="fa-solid fa-arrow-left mr-2"></i>
  Back
</button>

      </div>
    </>
  );
}
// import React, { useEffect, useState } from "react";
// import ClinicCard from "../components/ClinicCard";
// import { Navigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function ClinicDetails() {
//   const { id } = useParams(); 
//   const [clinic, setClinic] = useState(null);

//   useEffect(() => {
//     const fetchClinic = async () => {
//       try {
//         const res = await axios.get(`/api/Clinic/${id}`); 
//         setClinic(res.data);
//       } catch (err) {
//         console.error("Error fetching clinic:", err);
//       }
//     };

//     fetchClinic();
//   }, [id]);
//   return (
//     <>
//       <div className="bg-white mt-15">
//         <div className="w-full  p-1 grid place-items-center">
//           <div className="w-[85%] grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 rounded-2xl ">
//             <div className="  lg:col-span-2  p-8 text-gray-700">
//               <h1 className="font-medium text-2xl text-black">Details</h1>
//               <div className="pt-3">
//                {clinic?.address}
//               </div>
//               <div className="pt-3">
//                 Fees:
//                 <br />
//                 General Consultation: EGP 200
//                 <br />
//                 Vaccinations: Starting from EGP 150
//                 <br />
//                 Dental Cleaning: EGP 500
//                 <br />
//                 Surgical Procedures: Starting from EGP 1,000 For more details
//                 about our services or to book an appointment, visit our website
//                 or contact us directly
//               </div>
//             </div>
//             <div className=" flex justify-center my-7 m-2">
//               <img src="/images/care.png" className="rounded-3xl"></img>
//             </div>
//           </div>
//           <ClinicCard />
//         </div>
      
//         <button onClick={()=>Navigate(-1)} className="bg-[#749260E5] p-3 rounded-2xl text-white text-center mt-7 max-sm:w-[40%] max-md:w-[30%] lg:w-[20%] xl:w-[15%]  ms-20 flex items-center justify-center">
//   <i className="fa-solid fa-arrow-left mr-2"></i>
//   Back
// </button>

//       </div>
//     </>
//   );
// }

