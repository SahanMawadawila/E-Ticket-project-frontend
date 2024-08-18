import React from "react";
import { useState, useEffect } from "react";
import CheckerSidebar from "./CheckerSidebar";
import BusFeedForChecker from "./BusFeedForChecker";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import axios from "../../api/axios";
import Loading from "../ui/Loading";

const CheckerHome = () => {
  const [search, setSearch] = useState("");
  const { auth } = useContext(AuthContext);
  const [buses, setBuses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchCheckerCompanyBuses = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/authBuses", {
          company: auth.checkerCompany,
        });
        if (response.data.length !== 0) {
          setBuses(response.data);
        }
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchCheckerCompanyBuses();
  }, [auth.checkerCompany]);

  useEffect(() => {
    const searchResults = buses.filter(
      (bus) =>
        bus.numberPlate.toLowerCase().includes(search.toLowerCase()) ||
        bus.routeNumber.includes(search) ||
        bus.busFrom.city.toLowerCase().includes(search.toLowerCase()) ||
        bus.busTo.city.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(searchResults);
  }, [search, buses]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex md:justify-items-start flex-col md:flex-row">
      <div>
        <CheckerSidebar search={search} setSearch={setSearch} />
      </div>
      <BusFeedForChecker buses={searchResults} />
    </div>
  );
};

export default CheckerHome;
