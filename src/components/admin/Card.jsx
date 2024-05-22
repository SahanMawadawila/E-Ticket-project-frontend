import React from "react";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";

const Card = ({
  routeNumber,
  busFrom,
  busTo,
  numberPlate,
  busName,
  url,
  busId,
}) => {
  return (
    <Zoom in={true} style={{ transitionDelay: true ? "100ms" : "0ms" }}>
      <Link to={`/admin/bus/${busId}`} className="no-underline">
        <li className="flex  bg-gray-100 p-2 rounded-md">
          <div>
            <img
              src={url}
              alt="bus"
              className="w-48 h-48 object-cover object-center shadow-2xl"
            />
          </div>

          <div className="flex flex-col justify-between ml-4">
            <div>
              <h1
                className="text-2xl font-bold"
                style={{ color: "#063970" }}
              >{`${routeNumber}  ${busFrom.city} - ${busTo.city}`}</h1>
              <p className="text-gray-600">
                Bus Name/company :
                <span className="text-gray-900">{busName}</span>
              </p>
              <p className="text-gray-600">
                Number Plate :
                <span className="text-gray-900">{numberPlate}</span>
              </p>

              <p className="text-gray-600">
                {`Departure Time from ${busFrom.city} :`}
                <span className="text-gray-900"> {busFrom.departureTime}</span>
              </p>

              <p className="text-gray-600">
                {`Arrival Time at ${busTo.city} :`}
                <span className="text-gray-900"> {busTo.arrivalTime}</span>
              </p>
            </div>
          </div>
        </li>
      </Link>
    </Zoom>
  );
};

export default Card;
