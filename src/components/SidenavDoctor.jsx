// src/components/Sidenav/DoctorSidenav.jsx
import { useAuth } from "@/Context/AuthContext";
import React from "react";
import { Link } from "react-router-dom";
// Import your Sidenav CSS correctly

const DoctorSidenav = () => {
  const { logout } = useAuth();
  return (
    <div className="side-nav">
      <div className="flex flex-row items-center justify-center gap-2 pb-10">
        <img src="/images/feet.png" alt="Pets logo" className="" />
        <p>The Pets</p>
      </div>
      <ul>
        <li>
          <Link to="/doctor/profile">
            My Profile <i className="fa-solid fa-user"></i>
          </Link>
        </li>
        <li>
          <Link to="/doctor/appointments">
            My Appointments <i className="fa-solid fa-calendar-check"></i>
          </Link>
        </li>
        <li>
          <Link to="/doctor/clinics">
            My Clinics <i className="fa-solid fa-house-chimney-medical"></i>
          </Link>
        </li>
        <li>
          <Link to="/doctor/add-clinic">
            Add Clinic <i className="fa-solid fa-house-chimney-medical"></i>
          </Link>
        </li>
        <li>
          <Link to="/RecentChats">
            Messages <i className="fa-solid fa-comments"></i>
          </Link>
        </li>
        <li>
          <Link to="/adoption/animal-adopt">
            Animals <i className="ms-2 fa-solid fa-dog"></i>
          </Link>
        </li>
        <li>
          <Link to="/login">
            <button onClick={logout}>Logout</button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DoctorSidenav;
