import React from "react";
import {
  MdOutlineLocationOn,
  MdOutlineLocalPhone,
  MdOutlineMail,
} from "react-icons/md";
import { FaFacebookF, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#3c5033ed] text-white px-6 md:px-24 py-10">
      <div>
        <p className="font-bold text-lg text-center md:text-left">
          Society for the Protection of Animal Rights Egypt (SPARE)
        </p>
        <div className="flex flex-col md:flex-row md:gap-12 mt-8">
          <img
            src="/images/map.png"
            alt="map"
            className="w-full md:w-[490px] h-auto mb-8 md:mb-0"
          />
          <div className="flex-1">
            <p className="font-bold text-lg mb-4">Site Map</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
              <div className="flex flex-col gap-2">
                <span>Home</span>
                <span>Service</span>
                <span>Lost & Found</span>
                <span>Clinics</span>
              </div>
              <div className="flex flex-col gap-2">
                <span>Pets for adoption</span>
                <span>Volunteering</span>
                <span>Add pet profile</span>
                <span>Pet marriage</span>
              </div>
              <div className="flex flex-col gap-2">
                <span>Donations</span>
                <span>Online consultant</span>
                <span>Help</span>
                <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b-2 border-white pb-7">
          <div className="relative inline-block p-4">
            <MdOutlineLocationOn size={30} className="absolute top-5 left-0" />
            <span className="inline-flex relative pl-8 pr-8">
              Society for the Protection of Animal Rights in Egypt (SPARE)
              <br />
              Zawyet Abou Mosalam Rd., Shoubramant, Sakkara, Giza, <br />
              beside Shoubramant Preparatory School for Girls.
            </span>
          </div>
          <br />
          <div className="relative inline-block p-4">
            <MdOutlineLocalPhone size={30} className="absolute top-4 left-0" />
            <span className="inline-flex relative pl-8 pr-8">
              377 09055 (202+)
            </span>
          </div>
          <br />
          <div className="relative inline-block p-4">
            <MdOutlineMail size={30} className="absolute top-4 left-0" />
            <span className="inline-flex relative pl-8 pr-8">
              animal.protection.eg@gmail.com
            </span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center py-7 gap-6">
          <div className="flex flex-row gap-4">
            <FaFacebookF />
            <FaLinkedin />
            <FaYoutube />
          </div>
          <div className="flex flex-row gap-5">
            <span>Publish</span>
            <span>privacy</span>
            <span>Terms</span>
          </div>
          <div>
            <p>© 2024 ARE. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
