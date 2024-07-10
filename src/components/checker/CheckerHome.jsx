import React from "react";
import QRScanner from "./QRScannar";
import { useState, useEffect } from "react";
import CheckerSidebar from "./CheckerSidebar";
import BusFeedForChecker from "./BusFeedForChecker";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import axios from "../../api/axios";

const CheckerHome = () => {
  const [search, setSearch] = useState("");
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchCheckerCompanyBuses = async () => {
      try {
        const response = await axios.post("/authBuses", {
          company: auth.checkerCompany,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCheckerCompanyBuses();
  }, [auth.checkerCompany]);

  return (
    <div className="flex md:justify-items-start flex-col md:flex-row">
      <div>
        <CheckerSidebar search={search} setSearch={setSearch} />
      </div>
      <BusFeedForChecker />
    </div>
  );
};

export default CheckerHome;
