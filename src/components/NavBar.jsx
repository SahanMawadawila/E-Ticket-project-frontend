import SignUp from "./SignUp";
import React from "react";

const NavBar = () => {
  return (
    <div className=" p-1 pr-5 pl-5 p flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="images/favIcon.png"
          alt="Company logo"
          className="w-12 h-12"
        />
        <h1
          className="ml-3 text-3xl font-bold italic"
          style={{ fontFamily: "DM Serif Display", color: "#063970" }}
        >
          ESeats.lk
        </h1>
      </div>
      <SignUp />
    </div>
  );
};

export default NavBar;
