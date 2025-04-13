import { NavLink} from "react-router-dom";
import React from "react";
import './Navigator.css'

export default function Navigator() {
  return (
    <div>
      <div>
        <ul className="text-[#959595] grid grid-cols-3 md:grid-cols-4 lg:flex lg:justify-around p-5 ">
          <li>
            <NavLink to={"/lost"}>Lost&Found</NavLink>
          </li>
          <li>
            <NavLink to={"/clinics"}>Clinics</NavLink>
          </li>
          <li>
            <NavLink to={"/volunteering"}>Volunteering</NavLink>
          </li>
          <li>
            <NavLink to={"/adoption"}>Pets for adopt</NavLink>
          </li>
          <li>
            <NavLink to={"/add-pet-profile"}>Add pet profile</NavLink>
          </li>
          <li>
            <NavLink to={"/pet-marriage"}>Pet marriage</NavLink>
          </li>
          <li>
            <NavLink to={"/donation"}>Donations</NavLink>
          </li>
          <li>
            <NavLink to={"/lost"}>Online consultant</NavLink>
          </li>
          <li>
            <NavLink to={"/my-pets"}>My Pets</NavLink>
          </li>
          {/* <li>
            <NavLink to={"/my-cart"}>My Cart</NavLink>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
