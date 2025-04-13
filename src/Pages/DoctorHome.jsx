import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

export default function DoctorHome() {
  return (
    <>
      <div className="bg-white">
        <div className="flex justify-center pt-15">
          <HeroSlider />
        </div>
      </div>
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Request and Care",
            text: "Easily request a pet and use our smart technology to check if a dog is pregnant, ensuring the best care for all animals.",
          },
          {
            title: "Smart Adoption",
            text: "Request animals directly and utilize our advanced system to determine if an animal is pregnant, helping us provide tailored care.",
          },
          {
            title: "Innovative Pet Care",
            text: "Request your new pet and benefit from our smart technology that can detect pregnancy in dogs, enhancing our care and adoption process.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="h-60 border border-gray-400 p-6 rounded-xl text-center shadow-sm hover:shadow-[#4d653e]  transition-all"
          >
            <div className="w-12 h-12 bg-[#749260] rounded-full mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-[#666666] text-sm">{item.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}
{
  /* <div className="bg-white min-h-screen py-10 px-5 md:px-20">
<h1 className="text-3xl font-semibold text-[#749260] mb-8">Doctor Dashboard</h1>


<Card className="mb-6 shadow-lg rounded-2xl border border-[#d9e8c8]">
  <CardContent className="p-6">
    <h2 className="text-xl font-medium text-[#3b3b3b] mb-2">Your Clinic</h2>
    <p className="text-gray-600 mb-4">Manage and edit your clinic's information</p>
    <Link to="/edit-clinic">
      <Button className="bg-[#749260] hover:bg-[#5f7c4e] text-white">Edit Clinic Info</Button>
    </Link>
  </CardContent>
</Card>


<Card className="mb-6 shadow-lg rounded-2xl border border-[#d9e8c8]">
  <CardContent className="p-6">
    <h2 className="text-xl font-medium text-[#3b3b3b] mb-2">Appointments</h2>
    <p className="text-gray-600 mb-4">View and manage your upcoming appointments</p>
    <Link to="/appointments">
      <Button className="bg-[#749260] hover:bg-[#5f7c4e] text-white">Go to Appointments</Button>
    </Link>
  </CardContent>
</Card>


<Card className="mb-6 shadow-lg rounded-2xl border border-[#d9e8c8]">
  <CardContent className="p-6">
    <h2 className="text-xl font-medium text-[#3b3b3b] mb-2">Available Time Slots</h2>
    <p className="text-gray-600 mb-4">Set or update your available appointment times</p>
    <Link to="/schedule">
      <Button className="bg-[#749260] hover:bg-[#5f7c4e] text-white">Manage Schedule</Button>
    </Link>
  </CardContent>
</Card>


<Card className="mb-6 shadow-lg rounded-2xl border border-[#d9e8c8]">
  <CardContent className="p-6">
    <h2 className="text-xl font-medium text-[#3b3b3b] mb-2">Doctor Profile</h2>
    <p className="text-gray-600 mb-4">Edit your personal and medical information</p>
    <Link to="/edit-profile">
      <Button className="bg-[#749260] hover:bg-[#5f7c4e] text-white">Edit Profile</Button>
    </Link>
  </CardContent>
</Card>
</div> */
}
