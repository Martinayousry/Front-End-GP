// 
import React from "react";
import { MdOutlineLocationOn, MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";

const Volunteering = () => {
  return (
    <div className="mt-20 bg-white px-6 py-12 max-w-7xl mx-auto rounded-lg shadow-md">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Section - About Us */}
        <div>
          <h1 className="text-3xl font-bold text-green-800 border-b border-gray-300 pb-4 mb-6">
            About Us
          </h1>
          <p className="text-gray-700 space-y-4 leading-relaxed">
            <span>
              Welcome to <strong>PetsyZone</strong>, where compassion meets innovation!
              We provide a safe and loving environment for animals in need — rescuing,
              rehabilitating, and rehoming them into caring families.
            </span>
            <br />
            <span>
              Our tech-driven approach includes tools like health monitoring, pregnancy detection,
              and smart adoption matching to improve animal welfare.
            </span>
            <br />
            <span>
              We also empower communities through education and collaboration with local organizations.
              Whether you adopt, foster, volunteer, or donate — you're part of our mission.
            </span>
            <br />
            <span>Together, we can transform lives — one paw at a time.</span>
          </p>

          {/* Contact Info */}
          <div className="mt-10 space-y-4">
            <div className="flex items-start gap-3">
              <MdOutlineLocationOn size={24} className="text-green-700 mt-1" />
              <span className="text-gray-700">
                1195 Corniche El Nile Street, Cairo. Tower (D), 4th Floor, Apt 41, Arcadia Administrative Towers.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <MdOutlineLocalPhone size={24} className="text-green-700 mt-1" />
              <span className="text-gray-700">+202 25769361</span>
            </div>
            <div className="flex items-start gap-3">
              <AiOutlineGlobal size={24} className="text-green-700 mt-1" />
              <span className="text-gray-700">petsyzoneclinic.com</span>
            </div>
            <div className="flex items-start gap-3">
              <MdOutlineMail size={24} className="text-green-700 mt-1" />
              <span className="text-gray-700">info@petsyzoneclinic.com</span>
            </div>
          </div>
        </div>

        {/* Right Section - Form */}
        <div>
          <h1 className="text-3xl font-bold text-green-800 mb-8">Join Us Now!</h1>
          <form className="space-y-6">
            <div>
              <label className="block font-medium mb-1">Name</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Age</label>
              <input
                type="number"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="male" required />
                  <span>Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" value="female" required />
                  <span>Female</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block font-medium mb-1">Government</label>
              <input
                type="text"
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your governorate"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Why do you want to join us?</label>
              <textarea
                required
                rows="4"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your answer..."
              />
            </div>
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-800 text-white font-medium px-6 py-3 rounded flex items-center gap-2 transition"
            >
              Submit <IoMdArrowForward />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteering;
