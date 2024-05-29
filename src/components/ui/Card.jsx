import React from "react";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";

const Card = ({
  routeNumber,
  busFrom,
  busTo,
  numberPlate,
  busName,
  url,
  busId,
  input,
  searchedDepartureTime,
  searchedArrivalTime,
}) => {
  const { auth } = useContext(AuthContext);
  return (
    <Zoom in={true} style={{ transitionDelay: true ? "100ms" : "0ms" }}>
      <Link
        to={auth.admin ? `/admin/bus/${busId}` : `/${busId}`}
        className="no-underline"
      >
        <li className="flex  bg-gray-100 p-2 rounded-md hover:shadow-lg hover:bg-gray-200 transition duration-300 ease-in-out">
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
                {`Departure Time from ${
                  auth.admin ? busFrom.city : input.from
                } :`}
                <span className="text-gray-900">
                  {" "}
                  {auth.admin ? busFrom.departureTime : searchedDepartureTime}
                </span>
              </p>

              <p className="text-gray-600">
                {`Arrival Time to ${auth.admin ? busTo.city : input.to} :`}
                <span className="text-gray-900">
                  {" "}
                  {auth.admin ? busTo.arrivalTime : searchedArrivalTime}
                </span>
              </p>
            </div>
          </div>
        </li>
      </Link>
    </Zoom>
  );
};

export default Card;
