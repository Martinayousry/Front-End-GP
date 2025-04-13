import Navbar from "../components/Navbar/Navbar";
import React from "react";
import Card from "../components/Card";
import HeroSlider from "../components/HeroSlider";
import ClinicCard from "../components/ClinicCard";
import ClinicDetails from "./ClinicDetails";
import PetProfile from "./PetProfile";
import Navigator from "../components/Navigator";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <div className="bg-white">
        <div className="">
          <div className="flex justify-center pt-15">
            <HeroSlider />
          </div>
          <Navigator />
        </div>
       
      </div>
      <div className="w-full px-4 py-8 max-w-7xl mx-auto">
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

        {/* Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16 mt-25">
          <div className="relative">
            <img
              src="/images/experience.png"
              alt="Dog main"
              className="rounded-lg w-full"
            />
          </div>
          <div>
            <p className="text-green-700 text-md uppercase font-semibold ">
              Shelter's Vision
            </p>
            <p className="text-5xl font-bold mb-4 tex">
              Innovative Care for Every Animal
            </p>
            <p className="text-gray-700 mb-4 p-5">
              Our Shelter enables you to request animals and uses smart
              technology to detect if an animal is pregnant, ensuring optimal
              care and efficient matching.
            </p>
            <button className="bg-green-700 text-white px-4 py-2 rounded shadow hover:bg-green-800">
              Read More
            </button>
          </div>
        </div>

        {/* Core Services */}
        <div className="text-center mb-12 mt-20">
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
        </div>
      </div>
      
    </>
  );
}
