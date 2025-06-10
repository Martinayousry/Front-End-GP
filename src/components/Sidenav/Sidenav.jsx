import React from "react";
import "./Sidenav.css";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";

const Sidenav = () => {
  const { logout } = useAuth();
  const location = useLocation();

  return (
    <aside className="side-nav shadow-2xl">
      <div className="flex flex-col items-center justify-center gap-2 pb-10">
        <img src="/images/feet.png" alt="Pet Paw" className="logo-img" />
        <img src="/images/The pet.png" alt="The Pet" className="logo-title" />
        <p className="side-title">Admin Panel</p>
      </div>
      <ul>
        <li>
          <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
            <i className="fa-solid fa-paw mr-2"></i> Animals
          </Link>
        </li>
        {/* <li>
          <Link to="/admin/adoption-request">
            <i className="fa-solid fa-hand-holding-heart mr-2"></i> Adoption Requests
          </Link>
        </li> */}
        <li>
          <Link to="/admin/doctors" className={location.pathname === "/admin/doctors" ? "active" : ""}>
            <i className="fa-solid fa-user-md mr-2"></i> Doctors
          </Link>
        </li>
        <li>
          <Link to="/admin/PetSitterRequests" className={location.pathname === "/admin/PetSitterRequests" ? "active" : ""}>
            <i className="fa-solid fa-dog mr-2"></i> Pet Sitter Requests
          </Link>
        </li>
        <li>
          <Link to="/admin/ClinicRequests" className={location.pathname === "/admin/ClinicRequests" ? "active" : ""}>
            <i className="fa-solid fa-clinic-medical mr-2"></i> Clinics Requests
          </Link>
        </li>
        <li>
          <Link to="/admin/create-admin" className={location.pathname === "/admin/create-admin" ? "active" : ""}>
            <i className="fa-solid fa-user-plus mr-2"></i> Create New Admin
          </Link>
        </li>
        <li>
          <button
            onClick={logout}
            className="logout-btn"
            aria-label="Logout"
          >
            <i className="fa-solid fa-sign-out-alt mr-2"></i> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidenav;