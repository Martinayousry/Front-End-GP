// src/Layout/DoctorLayout.jsx
import React from "react";
import DoctorSidenav from "../components/SidenavDoctor";
import { Outlet } from "react-router-dom";

export default function DoctorLayout() {
  return (
    <div style={{ display: "flex" }}>
      <DoctorSidenav />
      <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}
