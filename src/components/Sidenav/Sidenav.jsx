import React from "react";
import "./Sidenav.css";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="side-nav">
      <div className="flex flex-row items-center justify-center gap-2 pb-10">
        <img src="/images/feet.png" alt="" className="" />
        <img src="/images/The pet.png"/>
      </div>
      <ul>
        <li>
          <Link to="/admin/pets">Pets </Link>
          
        </li>
        <li>
          <Link to="/admin/adoption-request">Adoption Requests</Link>
        </li>
        <li>
          <Link to="/admin/doctors">Doctors</Link>
        </li>
        <li>
          <Link to="/admin/create-admin">Create New Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;