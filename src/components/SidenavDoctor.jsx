import React from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="side-nav">
      <div className="flex flex-row items-center justify-center gap-2 pb-10">
        <img src="./pet.png" alt="" className="" />
        <p>The Pets</p>
      </div>
      <ul>
        <li>
          <Link to="/admin/pets">My Profile <i className="fa-solid fa-user"></i></Link>
        </li>
        <li>
          <Link to="/admin/adoption-request">My clinics  <i className="fa-solid fa-house-chimney-medical"></i></Link>
        </li>
        <li>
          <Link to="/admin/doctors">Appointments <i className="fa-solid fa-calendar-check"></i></Link>
        </li>
        <li>
          <Link to="/admin/create-admin">Add Clinic <i className="fa-solid fa-plus"></i></Link>
        </li>
        <li>
          <Link to="/admin/create-admin">Messages<i className="fa-solid fa-plus"></i></Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;