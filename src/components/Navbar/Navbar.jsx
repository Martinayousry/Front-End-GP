// import { useState, useEffect, useRef } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../../src/Context/AuthContext";
// import "./Navbar.css";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isAdoptionOpen, setIsAdoptionOpen] = useState(false);
//   const [isDetectOpen, setIsDetectOpen] = useState(false);
//   const [isPetsOpen, setIsPetsOpen] = useState(false);
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   // Refs for dropdown containers
//   const adoptionRef = useRef(null);
//   const detectRef = useRef(null);
//   const petsRef = useRef(null);
//   const profileRef = useRef(null);

//   const getFirstLetter = (name) => name?.charAt(0).toUpperCase() || "?";

//   // Close dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (adoptionRef.current && !adoptionRef.current.contains(event.target)) {
//         setIsAdoptionOpen(false);
//       }
//       if (detectRef.current && !detectRef.current.contains(event.target)) {
//         setIsDetectOpen(false);
//       }
//       if (petsRef.current && !petsRef.current.contains(event.target)) {
//         setIsPetsOpen(false);
//       }
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Close dropdown when a NavLink is clicked
//   const closeAllDropdowns = () => {
//     setIsAdoptionOpen(false);
//     setIsDetectOpen(false);
//     setIsPetsOpen(false);
//     setIsOpen(false);
//     setMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b-2 border-[#74926080]">
//       <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//         {/* Logo - Far Left */}
//         <Link to="/" className="flex items-center">
//           <img src="/images/feet.png" className="h-10" alt="Logo" />
//           <img src="/images/The pet.png" className="h-10 ml-2" alt="The Pet" />
//         </Link>

//         {/* Right Section - Icons (Cart, Chat, Profile) */}
//         <div className="flex items-center space-x-4 md:order-2">
//           {/* Chat Icon */}
//           <NavLink 
//             to="/RecentChats" 
//             className="text-black hover:text-[#749260] p-2 transition-colors duration-200"
//             onClick={closeAllDropdowns}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
//             </svg>
//           </NavLink>

//           {/* Cart Icon */}
//           <NavLink 
//             to="/my-cart" 
//             className="text-black hover:text-[#749260] p-2 transition-colors duration-200"
//             onClick={closeAllDropdowns}
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//             </svg>
//           </NavLink>

//           {/* User Profile */}
//           {user ? (
//             <div className="relative" ref={profileRef}>
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center space-x-2 focus:outline-none"
//               >
//                 <div className="w-10 h-10 rounded-full bg-[#749260] text-white text-lg font-bold flex items-center justify-center">
//                   {getFirstLetter(user.userName)}
//                 </div>
//                 <span className="hidden md:inline text-black">Hello, {user.userName}</span>
//               </button>

//               {isOpen && (
//                 <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50">
//                   <div className="px-4 py-3 border-b border-gray-200">
//                     <p className="text-sm text-gray-900">{user.userName}</p>
//                   </div>
//                   <div className="py-1">
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#749260]"
//                       onClick={closeAllDropdowns}
//                     >
//                       My Profile
//                     </Link>
//                     <button
//                       onClick={() => {
//                         logout();
//                         navigate("/login");
//                         closeAllDropdowns();
//                       }}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#749260]"
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ) : (
//             <div className="flex space-x-3">
//               <button
//                 onClick={() => {
//                   navigate("/login");
//                   closeAllDropdowns();
//                 }}
//                 className="text-white bg-[#749260] hover:bg-[#5c8044] rounded-lg text-sm px-4 py-2 transition-colors duration-200"
//               >
//                 Login
//               </button>
//               <button
//                 onClick={() => {
//                   navigate("/signup");
//                   closeAllDropdowns();
//                 }}
//                 className="text-white bg-[#4b6b30] hover:bg-[#3b5825] rounded-lg text-sm px-4 py-2 transition-colors duration-200"
//               >
//                 Sign Up
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="md:hidden p-2 text-black hover:text-[#749260] focus:outline-none"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>

//         {/* Main Navigation */}
//         <div
//           className={`${
//             menuOpen ? "block" : "hidden"
//           } md:flex md:items-center w-full md:w-auto md:order-1`}
//         >
//           <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 text-sm font-medium">
//             <li>
//               <NavLink
//                 to="/"
//                 className="block py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200"
//                 activeClassName="text-[#749260] font-medium"
//                 onClick={closeAllDropdowns}
//               >
//                 Home
//               </NavLink>
//             </li>
            
//             <li>
//               <NavLink
//                 to="/clinics"
//                 className="block py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200"
//                 activeClassName="text-[#749260] font-medium"
//                 onClick={closeAllDropdowns}
//               >
//                 Clinics
//               </NavLink>
//             </li>
            
//             {/* Adoption Dropdown */}
//             <li className="relative" ref={adoptionRef}>
//               <button
//                 onClick={() => setIsAdoptionOpen(!isAdoptionOpen)}
//                 className="flex items-center py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200 w-full md:w-auto"
//               >
//                 Adoption <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
//                 </svg>
//               </button>

//               {isAdoptionOpen && (
//                 <ul className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
//                   <li>
//                     <NavLink
//                       to="/adoption/animal-adopt"
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       Adopt From Shelter
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink 
//                       to="/adoption/pets-adopt" 
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       Adopt From Users
//                     </NavLink>
//                   </li>
//                 </ul>
//               )}
//             </li>
            
//             {/* Pets Dropdown */}
//             <li className="relative" ref={petsRef}>
//               <button
//                 onClick={() => setIsPetsOpen(!isPetsOpen)}
//                 className="flex items-center py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200 w-full md:w-auto"
//               >
//                 Pets <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
//                 </svg>
//               </button>

//               {isPetsOpen && (
//                 <ul className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
//                   <li>
//                     <NavLink
//                       to="/my-pets"
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       My Pets
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/add-pet-profile"
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       Add Pet Profile
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       to="/PetSitter"
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       Request Pet Sitter
//                     </NavLink>
//                   </li>
//                 </ul>
//               )}
//             </li>
            
//             <li>
//               <NavLink
//                 to="/post"
//                 className="block py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200"
//                 activeClassName="text-[#749260] font-medium"
//                 onClick={closeAllDropdowns}
//               >
//                 Lost Pets
//               </NavLink>
//             </li>
            
//             {/* Detect Dropdown */}
//             <li className="relative" ref={detectRef}>
//               <button
//                 onClick={() => setIsDetectOpen(!isDetectOpen)}
//                 className="flex items-center py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200 w-full md:w-auto"
//               >
//                 AI Dog Disease Detection <svg className="w-2.5 h-2.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
//                   <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
//                 </svg>
//               </button>

//               {isDetectOpen && (
//                 <ul className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
//                   <li>
//                     <NavLink
//                       to="/disease-photo"
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       Detect With Photo
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink 
//                       to="/symptom-selector" 
//                       className="block px-4 py-2 text-black hover:bg-gray-100 hover:text-[#749260]"
//                       activeClassName="text-[#749260] font-medium"
//                       onClick={closeAllDropdowns}
//                     >
//                       Detect With Symptoms
//                     </NavLink>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/Context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdoptionOpen, setIsAdoptionOpen] = useState(false);
  const [isDetectOpen, setIsDetectOpen] = useState(false);
  const [isPetsOpen, setIsPetsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adoptionRef = useRef(null);
  const detectRef = useRef(null);
  const petsRef = useRef(null);
  const profileRef = useRef(null);

  const getFirstLetter = (name) => name?.charAt(0).toUpperCase() || "?";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adoptionRef.current && !adoptionRef.current.contains(event.target)) {
        setIsAdoptionOpen(false);
      }
      if (detectRef.current && !detectRef.current.contains(event.target)) {
        setIsDetectOpen(false);
      }
      if (petsRef.current && !petsRef.current.contains(event.target)) {
        setIsPetsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeAllDropdowns = () => {
    setIsAdoptionOpen(false);
    setIsDetectOpen(false);
    setIsPetsOpen(false);
    setIsOpen(false);
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 transition-colors duration-200 ${
      isActive ? "text-[#749260] font-medium" : "text-black"
    } hover:text-[#749260]`;

  const dropdownLinkClass = ({ isActive }) =>
    `block px-4 py-2 transition-colors duration-200 ${
      isActive ? "text-[#749260] font-medium" : "text-black"
    } hover:bg-gray-100 hover:text-[#749260]`;

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b-2 border-[#74926080]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          <img src="/images/feet.png" className="h-10" alt="Logo" />
          <img src="/images/The pet.png" className="h-10 ml-2" alt="The Pet" />
        </Link>

        <div className="flex items-center space-x-4 md:order-2">
          <NavLink to="/RecentChats" className={navLinkClass} onClick={closeAllDropdowns}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </NavLink>

          <NavLink to="/my-cart" className={navLinkClass} onClick={closeAllDropdowns}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </NavLink>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2 focus:outline-none">
                <div className="w-10 h-10 rounded-full bg-[#99bb8d] text-white text-lg font-bold flex items-center justify-center">
                  {getFirstLetter(user.userName)}
                </div>
                <span className="hidden md:inline text-black">Hello, {user.userName}</span>
              </button>
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48 z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm text-gray-900">{user.userName}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#749260]" onClick={closeAllDropdowns}>
                      My Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/login");
                        closeAllDropdowns();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#749260]"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <button onClick={() => { navigate("/login"); closeAllDropdowns(); }} className="text-white bg-[#749260] hover:bg-[#5c8044] rounded-lg text-sm px-4 py-2">
                Login
              </button>
              <button onClick={() => { navigate("/signup"); closeAllDropdowns(); }} className="text-white bg-[#4b6b30] hover:bg-[#3b5825] rounded-lg text-sm px-4 py-2">
                Sign Up
              </button>
            </div>
          )}
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 text-black hover:text-[#749260] focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className={`${menuOpen ? "block" : "hidden"} md:flex md:items-center w-full md:w-auto md:order-1`}>
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0 text-sm font-medium">
            <li><NavLink to="/" className={navLinkClass} onClick={closeAllDropdowns}>Home</NavLink></li>
            <li><NavLink to="/clinics" className={navLinkClass} onClick={closeAllDropdowns}>Clinics</NavLink></li>

            <li className="relative" ref={adoptionRef}>
              <button onClick={() => setIsAdoptionOpen(!isAdoptionOpen)} className="flex items-center py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200 w-full md:w-auto">
                Adoption <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
              </button>
              {isAdoptionOpen && (
                <ul className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <li><NavLink to="/adoption/animal-adopt" className={dropdownLinkClass} onClick={closeAllDropdowns}>Adopt From Shelter</NavLink></li>
                  <li><NavLink to="/adoption/pets-adopt" className={dropdownLinkClass} onClick={closeAllDropdowns}>Adopt From Users</NavLink></li>
                </ul>
              )}
            </li>

            <li className="relative" ref={petsRef}>
              <button onClick={() => setIsPetsOpen(!isPetsOpen)} className="flex items-center py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200 w-full md:w-auto">
                Pets <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
              </button>
              {isPetsOpen && (
                <ul className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <li><NavLink to="/my-pets" className={dropdownLinkClass} onClick={closeAllDropdowns}>My Pets</NavLink></li>
                  <li><NavLink to="/add-pet-profile" className={dropdownLinkClass} onClick={closeAllDropdowns}>Add Pet Profile</NavLink></li>
                  <li><NavLink to="/PetSitter" className={dropdownLinkClass} onClick={closeAllDropdowns}>Request Pet Sitter</NavLink></li>
                </ul>
              )}
            </li>

            <li><NavLink to="/post" className={navLinkClass} onClick={closeAllDropdowns}>Lost Pets</NavLink></li>

            <li className="relative" ref={detectRef}>
              <button onClick={() => setIsDetectOpen(!isDetectOpen)} className="flex items-center py-2 px-3 text-black hover:text-[#749260] transition-colors duration-200 w-full md:w-auto">
                AI Dog Disease Detection <svg className="w-2.5 h-2.5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/></svg>
              </button>
              {isDetectOpen && (
                <ul className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                  <li><NavLink to="/disease-photo" className={dropdownLinkClass} onClick={closeAllDropdowns}>Detect With Photo</NavLink></li>
                  <li><NavLink to="/symptom-selector" className={dropdownLinkClass} onClick={closeAllDropdowns}>Detect With Symptoms</NavLink></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
