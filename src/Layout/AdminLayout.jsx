// src/Layout/AdminLayout.jsx
import React from "react";
import Sidenav from "../components/Sidenav/Sidenav";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidenav />
      <div style={{ marginLeft: "200px", padding: "20px", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
}
