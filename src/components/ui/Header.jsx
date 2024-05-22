import SignInModal from "../signIn/SignInModal";
import React from "react";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";

const Header = () => {
  const { auth } = useContext(AuthContext);
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
      {auth.admin ? (
        <div className="flex flex-col justify-center items-center mr-3">
          <p
            className="text-base font-bold rounded-md m-0"
            style={{ color: "#063970" }}
          >
            Admin
          </p>
          <AdminPanelSettingsIcon style={{ color: "#063970" }} />
        </div>
      ) : auth.checker ? (
        <div className="flex flex-col justify-center items-center mr-3">
          <p
            className="text-base font-bold rounded-md m-0"
            style={{ color: "#063970" }}
          >
            Checker
          </p>
          <PersonIcon style={{ color: "#063970" }} />
        </div>
      ) : (
        <SignInModal />
      )}
    </div>
  );
};

export default Header;
