import React from "react";
import Sidebar from "./sidebar";

import axios from "../../api/axios";
import { useEffect, useState } from "react";

import Loading from "../ui/Loading";
import Feed from "../ui/Feed";
import CheckerFeed from "./CheckerFeed";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const AdminHome = () => {
  const [buses, setBuses] = useState([]);
  const [noContent, setNoContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);
  const { busView } = useContext(DataContext);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const response = await axios.get("/bus");
        setLoading(false);
        if (response.status === 204) setNoContent(true);
        setBuses(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBuses();
  }, []);

  useEffect(() => {
    if (buses.length === 0) {
      setNoContent(true);
      return;
    }
    setNoContent(false);
    setFilteredBuses(
      buses.filter(
        (bus) =>
          bus.numberPlate.toLowerCase().includes(search.toLowerCase()) ||
          bus.routeNumber.includes(search) ||
          bus.busFrom.city.toLowerCase().includes(search.toLowerCase()) ||
          bus.busTo.city.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, buses]);

  if (loading) return <Loading />;
  return (
    <>
      <div className="flex md:justify-items-start flex-col md:flex-row">
        <div>
          <Sidebar search={search} setSearch={setSearch} />
        </div>
        {busView ? (
          <Feed buses={filteredBuses} noContent={noContent} />
        ) : (
          <CheckerFeed />
        )}
      </div>
    </>
  );
};

export default AdminHome;
