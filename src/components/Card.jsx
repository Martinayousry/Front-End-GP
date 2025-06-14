// import React from "react";
// import { Link } from "react-router-dom";

// export default function Card({
//   id,
//   title,
//   description,
//   gender,
//   photoUrls,
//   type,
// }) {
//   const profileRoute =
//     type === "pet" ? `/pet-profile/${id}` : `/animal-profile/${id}`;
//   return (
//     <>
//       <div className="card w-[280px] h-[280px] bg-[#F9FAFB] flex items-center justify-center align-middle me-4  ">
//         <Link to={profileRoute}>
//           <div className="card-info flex-col w-[232px] h-[208px] ease-in-out delay-100 hover:cursor-pointer hover:scale-105 transition-transform">
//             <div className="grid place-items-center pb-5">
//               <img
//                 src={photoUrls?.[0] || "/images/placeholder.jpg"}
//                 className="rounded-full w-[80px] h-[80px] object-cover"
//                 alt={name}
//               />
//             </div>

//             <div className="text-center">
//               <p className="font-medium text-black">{title}</p>
//               <p className="text-[#6941C6] mb-2">{gender}</p>
//               <p className="text-[#667085]">
//                 {description || "No description available."}
//               </p>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </>
//   );
// }
import React from "react";
import { Link } from "react-router-dom";

export default function Card({
  id,
  title,
  description,
  gender,
  photoUrls,
  type,
}) {
  const profileRoute =
    type === "pet" ? `/pet-profile/${id}` : `/animal-profile/${id}`;
  return (
    <>
      <div className="card w-[320px] h-[340px] bg-[#F9FAFB] flex items-center justify-center align-middle me-4">
        <Link to={profileRoute}>
          <div className="card-info flex-col w-[280px] h-[300px] ease-in-out delay-100 hover:cursor-pointer hover:scale-105 transition-transform">
            <div className="grid place-items-center pb-5">
              <img
                src={photoUrls?.[0] || "/images/placeholder.jpg"}
                className="rounded-full w-[100px] h-[100px] object-cover"
                alt={title}
              />
            </div>

            <div className="text-center">
              <p className="font-medium text-black text-lg">{title}</p>
              <p className="text-[#6941C6] mb-2 text-md">{gender}</p>
              <p className="text-[#667085] text-sm h-[120px] overflow-y-auto px-2">
                {description || "No description available."}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}