import React from "react";
import Sidebar from "./sidebar";
import Card from "./Card";
import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { baseURL } from "../../api/axios";
import Loading from "../ui/Loading";

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
      <div className="flex-grow">
        <ul
          className="flex 
          flex-col"
          style={{ listStyleType: "none" }}
        >
          {noContent ? (
            <h1>No Buses Found</h1>
          ) : (
            buses.map((bus) => (
              <Card
                busId={bus._id}
                key={bus._id}
                routeNumber={bus.routeNumber}
                busFrom={bus.busFrom}
                busTo={bus.busTo}
                numberPlate={bus.numberPlate}
                busName={bus.busName}
                url={`${baseURL}/bus/${bus.imagesURLs[0]}`}
              />
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
