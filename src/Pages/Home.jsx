import Navbar from "../components/Navbar/Navbar";
import React from "react";
import Card from "../components/Card";
import HeroSlider from "../components/HeroSlider";
import ClinicCard from "../components/ClinicCard";
import ClinicDetails from "./ClinicDetails";
import PetProfile from "./AnimalPetProfile/PetProfile";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";
import { useAuth } from "@/Context/AuthContext";
import { Navigate,Link } from "react-router-dom";
import { Stethoscope, Image as ImageIcon } from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  if (user?.roles?.includes("Doctor")) {
    return <Navigate to="/doctor" />;
  }

  if (user?.roles?.includes("Admin")) {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <div className="bg-white">
        <div className="">
          <div className="flex justify-center pt-15">
            <HeroSlider />
          </div>
          {/* <Navigator /> */}
        </div>
      </div>
      <div className="w-full px-4 py-8 max-w-7xl mx-auto">
        {/* Top Cards */}
        <div className="text-center mb-12 mt-20">
  <p className="text-2xl font-bold mb-2">What You Can Do</p>
  <p className="text-gray-600 text-sm">Explore our core features designed for pets and pet lovers</p>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-25">
  {[
    {
      title: "Find Vet Clinics And Book Appointments",
      image: "/images/vet-clinic.jpeg",
      desc: "Search and connect with trusted veterinary clinics near you.",
    },
    {
      title: "Add & Manage Pets",
      image: "/images/pet-profile.jpeg",
      desc: "Create detailed profiles for your pets, including medical history.",
    },
    {
      title: "Chat with Owners and Doctors",
      image: "/images/Chat.jpeg",
      desc: "Chat with doctors or fellow pet owners for advice and support.",
    },
    {
      title: "Adopt & Pet Marriage",
      image: "/images/premium_photo-1694819488591-a43907d1c5cc.jpeg",
      desc: "Request adoption or propose a marriage request between pets.",
    },
    {
      title: "Report Lost Pets",
      image: "/images/lost1.jpg",
      desc: "Post lost pet alerts to quickly spread the word and get help.",
    },
    {
      title: "Pet Sitting Request",
      image: "/images/Petsitter.jpeg",
      desc: "Request pet sitters from our animal shelter team for vacations or emergencies.",
    },
    
  ].map((service, idx) => (
    <div key={idx} className="rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <img src={service.image} alt={service.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-green-800 mb-1">{service.title}</h3>
        <p className="text-gray-600 text-sm">{service.desc}</p>
      </div>
    </div>
  ))}
</div>


        {/* Vision Section */}

        <div id="features-section" className="scroll-mt-32 pt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-20 mt-28 px-6">
          {/* Image Section */}
          <div className="relative">
            <img
              src="/images/close-up-veterinarian-taking-care-dog_23-2149100195.avif"
              alt="Dog main"
              className="rounded-2xl w-full shadow-lg"
            />
          </div>

          {/* Text & Features */}
          <div>
            <p className="text-green-700 text-md uppercase font-semibold mb-2">
              Our Features
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Tools to Understand & Care for Your Pet
            </h2>
            <p className="text-gray-700 mb-6 text-lg">
              Discover our innovative tools built for pet owners. Use the{" "}
              <strong>Symptom Selector</strong> to detect signs of illness, and
              explore the <strong>Disease Photo</strong> feature to recognize
              visual symptoms, including <strong>(skin diseases)</strong> .
            </p>

            {/* Features List */}
            <div className="mb-6 space-y-4">
              <div className="flex items-center gap-4">
                <Stethoscope className="text-green-700 w-6 h-6" />
                <span className="font-medium text-gray-800">
                  Symptom Selector
                </span>
              </div>
              <div className="flex items-center gap-4">
                <ImageIcon className="text-green-700 w-6 h-6" />
                <span className="font-medium text-gray-800">
                  Upload a Photo to Detect Skin Disease
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Link
                to="/symptom-selector"
                className="bg-green-700 text-white px-5 py-2 rounded-lg shadow hover:bg-green-800 transition"
              >
                Try Symptom Selector
              </Link>
              <Link
                to="/disease-photo"
                className="border border-green-700 text-green-700 px-5 py-2 rounded-lg shadow hover:bg-green-100 transition"
              >
                Upload a Photo to Detect Skin Disease
              </Link>
            </div>
          </div>
        </div>

        {/* Core Services */}
        {/* <div className="text-center mb-12 mt-20">
          <p className="text-2xl font-bold mb-2">Our Core Services</p>
          <p className="text-gray-600 text-sm">
            Providing Comprehensive Support for Pets and Their Families
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-25">
          {[
            {
              title: "Intensive Care",
              image: "/images/care.jpeg",
              desc: "Our shelter offers advanced medical care, allowing us to monitor, treat, and support pets with critical health needs.",
            },
            {
              title: "Pets Training",
              image: "/images/training.jpeg",
              desc: "We provide comprehensive training programs, allowing pets to learn, adapt, and thrive through structured behavioral and obedience training.",
            },
            {
              title: "Donation",
              image: "/images/donations.jpeg",
              desc: "Our platform facilitates easy contributions, enabling you to support our mission by donating resources and funds to help more animals.",
            },
          ].map((service, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded mb-2">
                  {service.title}
                </span>
                <p className="text-sm text-gray-700">{service.desc}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
}
