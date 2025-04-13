import React from "react";
import "./Footer.css";
import * as Icons from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <p className="font-bold text-lg">
          Society for the Protection of Animal Rights Egypt (SPARE)
        </p>
        <div className="inline-flex">
          <img src="./image.png" alt="" className="" />
          <div className="px-20 py-7">
            <p className="font-bold text-lg">Site Map</p>
            <div className="flex flex-row gap-15 py-7">
              <div className="flex flex-col gap-5">
                <span>Home</span> <span>Service</span> <span>Lost & Found</span>{" "}
                <span>Clinics</span>
              </div>
              <div className="flex flex-col gap-5">
                <span>Pets for adoption</span> <span>Volunteering</span>{" "}
                <span>Add pet profile</span> <span>Pet marriage</span>
              </div>
              <div className="flex flex-col gap-5">
                <span>Donations</span> <span>Online consultant</span>{" "}
                <span>Help</span> <span>Contact Us</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b-2 pb-7 ">
          <div className="relative inline-block p-4">
            <Icons.MdOutlineLocationOn
              size={30}
              className="absolute top-5 left-0 "
            />
            <span className="inline-flex relative  pl-7 pr-30">
              Society for the Protection of Animal Rights in Egypt (SPARE){" "}
              <br />
              Zawyet Abou Mosalam Rd., Shoubramant, Sakkara, Giza, <br />
              beside Shoubramant Preparatory School for Girls.
            </span>
          </div>{" "}
          <br />
          <div className="relative inline-block p-4">
            <Icons.MdOutlineLocalPhone
              size={30}
              className="absolute top-4 left-0 "
            />
            <span className="inline-flex relative  pl-7 pr-30">
              377 09055 (202+)
            </span>
          </div>{" "}
          <br />
          <div className="relative inline-block p-4">
            <Icons.MdOutlineMail size={30} className="absolute top-4 left-0 " />
            <span className="inline-flex relative  pl-7 pr-30 ">
              animal.protection.eg@gmail.com
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-between py-7">
          <div className="flex flex-row  gap-4">
            <FaFacebookF /> <FaLinkedin />
            <FaYoutube />
          </div>
          <div className="flex flex-row justify-between gap-5">
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
