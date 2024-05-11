import React from "react";
import { useState } from "react";
import Toggle from "./Toggle";
import { useRef, useEffect } from "react";
import axios from "../../api/axios";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ handleCloseModal }) => {
  const { setAuth } = useContext(AuthContext);
  const [adminSelected, setAdminSelected] = useState(true);
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const LOGIN_URL = adminSelected ? "/auth/admin" : "/auth/checker";
  const navigate = useNavigate();

  const handleToggle = () => {
    setAdminSelected(!adminSelected);
    console.log(adminSelected);
  };

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, adminSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUser("");
      setPwd("");
      setAuth(
        adminSelected
          ? { admin: true, checker: false }
          : { admin: false, checker: true }
      );
      navigate(adminSelected ? "/admin" : "/checker");
      handleCloseModal();
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        console.log(err);
        setErrMsg("Login Failed");
      }
    }
  };
  return (
    <div className="flex bg-white rounded-lg shadow-lg  overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover"
        style={{
          backgroundImage: adminSelected
            ? "url(images/admin.avif)"
            : "url(images/checker.jpg)",
        }}
      ></div>
      <div
        className={`w-full lg:w-1/2 ${errMsg ? "pt-2 pb-8 pl-8 pr-8" : "p-8"}`}
      >
        {errMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-1 py-1 rounded relative w-full mb-2">
            {errMsg}
          </div>
        )}
        <Toggle onToggle={handleToggle} />
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            User Name
          </label>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="text"
            required={true}
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
          </div>
          <input
            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
            type="password"
            required={true}
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
          />
        </div>
        <div className="mt-8">
          <button
            className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
