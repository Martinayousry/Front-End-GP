import { NavLink } from "react-router-dom";
import React, { useState } from "react";
import "./Navigator.css";

export default function Navigator() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      <ul className="text-[#959595] grid grid-cols-3 md:grid-cols-4 lg:flex lg:justify-around p-5 relative">
        <li>
          <NavLink to="/clinics">Clinics</NavLink>
        </li>
        <li>
          <NavLink to="/volunteering">Volunteering</NavLink>
        </li>

        {/* Dropdown */}
        <li className="relative">
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="hover:text-black"
          >
            Adoption ▼
          </button>

          {isDropdownOpen && (
            <ul className="absolute bg-white border rounded shadow-md top-full left-0 w-40 mt-2 z-10 text-black">
              <li className="hover:bg-gray-100">
                <NavLink
                  to="/adoption/animal-adopt"
                  className="block px-4 py-2"
                >
                 Adopt From Shelter
                </NavLink>
              </li>
              <li className="hover:bg-gray-100">
                <NavLink to="/adoption/pets-adopt" className="block px-4 py-2">
                  Adopt From Users
                </NavLink>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="#features-section" className="hover:text-black">
            Features
          </a>
        </li>

        <li>
          <NavLink to="/add-pet-profile">Add pet profile</NavLink>
        </li>
        {/* <li>
          <NavLink to="/donation">Donations</NavLink>
        </li> */}
        <li>
          <NavLink to="/my-pets">My Pets</NavLink>
        </li>
        <li>
          <NavLink to={"/my-cart"}>My Cart</NavLink>
        </li>
        <li>
          <NavLink to={"/RecentChats"}>Recent Chats</NavLink>
        </li> <li>
          <NavLink to={"/PetSitter"}>Pet Sitter</NavLink>
        </li>
        <li>
          <NavLink to={"/post"}>Losts Pets</NavLink>
        </li>
      </ul>
    </div>
  );
}
