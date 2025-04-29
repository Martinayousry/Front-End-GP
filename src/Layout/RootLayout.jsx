import { useAuth } from "@/Context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const { user } = useAuth();

  const hideNavbar = user?.roles?.includes("Doctor") || user?.roles?.includes("Admin");

  return (
      <div>
      {!hideNavbar && <Navbar />} {/* Only show Navbar if not doctor or admin */}
      <Outlet />
    </div>
  );
}
