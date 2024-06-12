import React from "react";
import Sidebar from "./sidebar";

import axios from "../../api/axios";
import { useEffect, useState } from "react";

import Loading from "../ui/Loading";
import Feed from "../ui/Feed";

const AdminHome = () => {
  const [buses, setBuses] = useState([]);
  const [noContent, setNoContent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredBuses, setFilteredBuses] = useState([]);

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
    <div className="flex md:justify-items-start flex-col md:flex-row">
      <div>
        <Sidebar search={search} setSearch={setSearch} />
      </div>
      <Feed buses={filteredBuses} noContent={noContent} />
    </div>
  );
};

export default AdminHome;
