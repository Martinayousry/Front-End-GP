import React from "react";
import "./Volunteering.css";
import "react-icons/md";
import * as Icons from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdArrowForward } from "react-icons/io";

const Volunteering = () => {
  return (
   <div className="mt-15">
      <div className="volunteer grid grid-cols-2">
        <div className="pl-25 pt-10 pr-10">
          <h1 className="font-bold text-2xl border-b-1 border-gray-400 pb-4">
            About Us
          </h1>
          <p className="py-7 pr-10">
            Welcome to [Shelter Name], where compassion meets innovation! <br />
            At [Shelter Name], we are dedicated to providing a safe and loving
            environment for animals in need. Our mission is to rescue,
            rehabilitate, and rehome abandoned and stray animals, ensuring they
            find the caring families they deserve. <br />
            What sets us apart is our use of cutting-edge technology to enhance
            animal welfare. Our smart features include advanced health
            monitoring, such as detecting pregnancy in dogs, and tools that help
            us match potential adopters with the perfect furry companion. <br />
            In addition to adoption services, we empower our community through
            education and support. From hosting workshops on responsible pet
            ownership to collaborating with local organizations, we aim to make
            a lasting impact on animal welfare. <br />
            Whether you’re looking to adopt, foster, volunteer, or donate, you
            are an essential part of our mission to create a brighter future for
            animals. Together, we can transform lives—one paw at a time. <br />
            Join us on this journey of hope, love, and care.
          </p>
          <div className="relative inline-block p-4">
            <Icons.MdOutlineLocationOn
              size={30}
              className="absolute top-5 left-0 "
            />
            <span className="inline-flex relative text-lg pl-5 pr-30">
              1195 Corniche El Nile Street, Cairo. The administration office is
              situated in Tower (D), 4th Floor, Apartment 41, Arcadia
              Administrative Towers, Corniche El Nile Street, Cairo.
            </span>
          </div>
          <div className="relative inline-block p-4">
            <Icons.MdOutlineLocalPhone
              size={30}
              className="absolute top-5 left-0 "
            />
            <span className="inline-flex relative text-lg pl-5 pr-30">
              {" "}
              25769361 (202+){" "}
            </span>
          </div>
          <div className="relative inline-block p-4">
            <AiOutlineGlobal size={30} className="absolute top-5 left-0 " />
            <span className="inline-flex relative text-lg pl-5 pr-30">
              {" "}
              petsyzoneclinic.com
            </span>
          </div>
          <div className="relative inline-block p-4">
            <Icons.MdOutlineMail size={30} className="absolute top-5 left-0 " />
            <span className="inline-flex relative text-lg pl-5 pr-30">
              {" "}
              info@petsyzoneclinic.com
            </span>
          </div>
        </div>
        <div className="right  col-span-1 pl-15 pt-10 pr-10">
          <h1 className="font-bold text-2xl pb-10">Join Us Now!</h1>
          <form>
            <div className="mb-5">
              <label>Name</label> <br />
              <input
                type="text"
                required
                className="input-field"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mb-5">
              <label>Age</label> <br />
              <input
                type="number"
                required
                className="input-field"
                placeholder="Enter your age"
              />
            </div>
            <div className="mb-5">
              <label>Gender</label> <br />
              <input type="radio" id="male" name="gender" value="male" />
              <label htmlFor="male" className="m-3">
                Male
              </label>
              <input type="radio" id="female" name="gender" value="female" />
              <label htmlFor="female" className="m-3">
                Female
              </label>
            </div>
            <div className="mb-5">
              <label>Government</label> <br />
              <input
                type="text"
                required
                className="input-field"
                placeholder="Enter your government"
              />
            </div>
            <div className="mb-5">
              <label>Why do you want to join us?</label> <br />
              <input
                type="text"
                required
                className="input-field size-40"
                placeholder="Write your answer ...."
              />
            </div>
            <button
              type="submit"
              className="submit-button inline-flex items-center justify-center px-4 py-2 my-20 ml-80"
            >
              Submit
              <IoMdArrowForward className="text-2xl ml-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Volunteering;
