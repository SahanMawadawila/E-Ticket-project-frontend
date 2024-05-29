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
  if (loading) return <Loading />;
  return (
    <div className="flex md:justify-items-start flex-col md:flex-row">
      <div>
        <Sidebar />
      </div>
      <Feed buses={buses} noContent={noContent} />
    </div>
  );
};

export default AdminHome;
