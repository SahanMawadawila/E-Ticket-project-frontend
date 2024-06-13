import React from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../ui/ConfirmModal";
import { useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

function Sidebar({ search, setSearch }) {
  const [show, setShow] = useState(false);
  const [wantToLogout, setWantToLogout] = useState(false);
  const handleClose = () => setShow(false);
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (wantToLogout) {
      setAuth({ admin: false, checker: false });
      setWantToLogout(false);
      navigate("/");
    }
  }, [wantToLogout]);
  return (
    <div className="md:h-full md:pr-8">
      <div className="flex md:flex-col justify-items-start gap-2 pt-2 pb-6 ">
        <input
          type="search"
          placeholder="Search a bus"
          className="border-2 border-gray-300 rounded-md p-2 m-2 
          hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-600 focus
          "
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="flex items-center space-x-4 bg-sky-600 hover:bg-gradient-to-r from-sky-600 to-cyan-400 px-3 py-3 hover: text-white"
          onClick={() => navigate("/admin/add-bus")}
        >
          <AddIcon />
          <p className="font-bold hidden md:inline-block">Add Bus</p>
        </button>

        <button
          className="flex items-center space-x-4  bg-sky-600 hover:bg-gradient-to-r from-sky-600 to-cyan-400 px-3 py-3 hover: text-white"
          onClick={() => navigate("/admin/add-checker")}
        >
          <PersonAddIcon />
          <p className="font-bold hidden md:inline-block">Add Checker</p>
        </button>
        <button
          className="flex items-center space-x-4  bg-sky-600  hover:bg-gradient-to-r from-sky-600 to-cyan-400 px-3 py-3 hover: text-white"
          onClick={() => setShow(true)}
        >
          <LogoutIcon />
          <p className="font-bold hidden md:inline-block">Log Out</p>
        </button>
      </div>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleYes={() => setWantToLogout(true)}
      >
        Do you want to log out?
      </ConfirmModal>
    </div>
  );
}

export default Sidebar;
