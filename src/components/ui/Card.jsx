import React from "react";
import Zoom from "@mui/material/Zoom";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import dayjs from "dayjs";
import subtractTime from "../../utils/subtractTime";
import formatNumber from "../../utils/formatNumber";

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
  date,
  actualPrice,
  thisBusPrice,
  totalAvailableSeats,
}) => {
  const { auth } = useContext(AuthContext);
  return (
    <Zoom in={true} style={{ transitionDelay: true ? "100ms" : "0ms" }}>
      <Link
        to={auth.admin ? `/admin/bus/${busId}` : `/${busId}`}
        className="no-underline"
      >
        <li className="w-full mx-auto bg-white shadow-lg rounded-lg my-1 ">
          <div className="bg-blue-900 text-white text-center py-0.6 md:py-2 rounded-t-lg mb-2">
            <h2 className="text-xl font-bold">Route # {routeNumber}</h2>
          </div>
          <div className="flex flex-wrap justify-between md:ml-4 mr-4">
            <div>
              <img
                src={url}
                alt="bus"
                className="w-48 h-48 object-cover object-center shadow-2xl hidden md:block "
              />
            </div>
            <div className="flex flex-col justify-center ">
              <div>
                <p className="text-gray-600 mb-0 ">Departure From :</p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {auth.admin ? busFrom.city : input.from}
                </p>
              </div>
              {!auth.admin && (
                <div>
                  <p className="text-gray-600 mb-0 ">Date :</p>
                  <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                    {date.format("YYYY-MM-DD")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-600 mb-0 ">
                  {`Departure Time `} <br />
                  {`from ${auth.admin ? busFrom.city : input.from} :`}
                </p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {auth.admin ? busFrom.departureTime : searchedDepartureTime}
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <img src="images/arrow.png" alt="" />
              <div>
                <p className="text-gray-600 mt-3 mb-0">Duration</p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {subtractTime(
                    auth.admin ? busFrom.departureTime : searchedDepartureTime,
                    auth.admin ? busTo.arrivalTime : searchedArrivalTime
                  )}
                  &nbsp;hrs
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <p className="text-gray-600 mb-0 ">Arrival To :</p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {auth.admin ? busTo.city : input.to}
                </p>
              </div>
              {!auth.admin && (
                <div>
                  <p className="text-gray-600 mb-0 ">Date :</p>
                  <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                    {searchedArrivalTime < searchedDepartureTime
                      ? dayjs(date).add(1, "day").format("YYYY-MM-DD")
                      : date.format("YYYY-MM-DD")}
                  </p>
                </div>
              )}
              <div>
                <p className="text-gray-600 mb-0 ">
                  {" "}
                  {`Arrival Time `} <br />{" "}
                  {`to ${auth.admin ? busTo.city : input.to} :`}
                </p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {auth.admin ? busTo.arrivalTime : searchedArrivalTime}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div>
                <p className="text-gray-600 mb-0 ">Company :</p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {busName}
                </p>
              </div>
              <div>
                <p className="text-gray-600 mb-0 ">Number Plate :</p>
                <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                  {numberPlate}
                </p>
              </div>
              {!auth.admin && (
                <div>
                  <p className="text-gray-600 mb-0 ">
                    Available <br />
                    seats :
                  </p>
                  <p className="text-gray-900 font-semibold mb-1 md:mb-4">
                    {totalAvailableSeats}
                  </p>
                </div>
              )}
            </div>
          </div>
          {!auth.admin && (
            <div className="flex justify-evenly items-end  mr-4">
              <div>
                <div className="text-gray-600 mb-0 inline-block">
                  Normal Ticket Price :{" "}
                </div>
                <div className="text-gray-900 font-semibold inline-block mb-1 md:mb-4">
                  &nbsp;Rs. {formatNumber(actualPrice)}
                </div>
              </div>
              <div>
                <div className="text-gray-600 mb-0 inline-block ">
                  Actual Price :{" "}
                </div>
                <div className="text-gray-900 font-semibold inline-block text-xl mb-1 md:mb-4">
                  &nbsp;Rs. {formatNumber(thisBusPrice)}
                </div>
              </div>
            </div>
          )}

          <div className="mt-2 bg-orange-900 py-1 md:py-2 rounded-b-lg"></div>
        </li>
      </Link>
    </Zoom>
  );
};

export default Card;
