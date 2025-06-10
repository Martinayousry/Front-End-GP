import { useAuth } from "@/Context/AuthContext";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

export default function RootLayout() {
  const { user } = useAuth();
  const location = useLocation();

  const hidePaths = [
    "/login",
    "/signup",
    "/doctor-signup",
    "/admin",
    "/doctor",
  ];

  const shouldHideLayout = hidePaths.some((path) =>
    location.pathname.startsWith(path)
  );

 // RootLayout.jsx

return (
  <div className="app-container">
    <ScrollToTop />
    {!shouldHideLayout && <Navbar />}
    <main className="flex-fill">
      <Outlet />
    </main>
    {!shouldHideLayout && <Footer />}
  </div>
);

}
