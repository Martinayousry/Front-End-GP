import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/Context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // New state for toggling the mobile menu
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getFirstLetter = (name) => name?.charAt(0).toUpperCase() || "?";

  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b-2 border-[#74926080]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img src="/images/feet.png" className="h-10" alt="Logo" />
          <img src="/images/The pet.png" className="h-10" alt="The Pet" />
        </Link>

        {/* Right section (User, Login, Sign Up) */}
        <div className="flex md:order-2 space-x-3">
          {user ? (
            <div className="relative">
              <div className="flex flex-row justify-center items-center"> 
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-[#749260] text-white text-lg font-bold me-2"
              >
                {getFirstLetter(user.userName)}
              </button>
              <p>hello,{user.userName}</p>
              </div>
              
              {isOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 z-50">
                  <span className="block px-4 py-2 text-gray-700">
                    {user.userName}
                  </span>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>
                  <Link to="/login">
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3">
              <button
                onClick={() => navigate("/login")}
                className="text-white bg-[#749260] hover:bg-[#5c8044] rounded-lg text-sm px-4 py-2"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-white bg-[#4b6b30] hover:bg-[#3b5825] rounded-lg text-sm px-4 py-2"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-[#749260] focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Mobile dropdown menu */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-sm font-medium">
            <li>
              <NavLink
                to="/"
                className="hover:text-green-600 px-4 py-2 block md:inline-block"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/volunteering"
                className="hover:text-blue-700 px-4 py-2 block md:inline-block"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/v"
                className="hover:text-blue-700 px-4 py-2 block md:inline-block"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/do"
                className="hover:text-blue-700 px-4 py-2 block md:inline-block"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
