import React from "react";
import ConfirmModal from "../ui/ConfirmModal";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CheckerSidebar = ({ search, setSearch }) => {
  const [show, setShow] = useState(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const logoutHandler = () => {
    setShow(false);
    setAuth({ admin: false, checker: false });
    navigate("/");
  };

  return (
    <div className="md:h-full md:pr-8">
      <div className="flex md:flex-col justify-items-start gap-2 pt-2 pb-6 ">
        <input
          type="search"
          placeholder="Search a bus"
          className="border-2 border-gray-300 rounded-md p-2 m-2 
          hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus
          w-full md:w-[200px]
          "
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="flex items-center space-x-4  bg-blue-800 hover:bg-gradient-to-r from-blue-800 to-blue-900 px-3 py-3 hover: text-white"
          onClick={() => setShow(true)}
        >
          <LogoutIcon />
          <p className="font-bold hidden md:inline-block">Log Out</p>
        </button>
      </div>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleYes={logoutHandler}
      >
        Do you want to log out?
      </ConfirmModal>
    </div>
  );
};

export default CheckerSidebar;
