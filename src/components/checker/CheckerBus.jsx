import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Zoom } from "@mui/material";

const CheckerBus = ({ bus }) => {
  const navigate = useNavigate();
  return (
    <Zoom in={true}>
      <div>
        <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg mb-2">
          <h2 className="text-xl font-bold">{bus.routeNumber}</h2>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col justify-center">
            <img
              src="../../images/busPhoto.png"
              alt=""
              className="h-24 w-auto pb-2"
            />
            <div>
              <p className="text-gray-600 mb-0 ">No of Bookings:</p>
              <p className="text-gray-900 font-semibold ">{bus.noOfBookings}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-0 ">Have to check:</p>
              <p className="text-gray-900 font-semibold ">{bus.haveToCheck}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center ">
            <div>
              <p className="text-gray-600 mb-0 ">Departure From :</p>
              <p className="text-gray-900 font-semibold ">{bus.busFrom.city}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Date :</p>
              <p className="text-gray-900 font-semibold ">
                {dayjs().format("YYYY-MM-DD")}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Departure Time:</p>

              <p className="text-gray-900 font-semibold ">
                {bus.busFrom.departureTime}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center ">
            <div>
              <p className="text-gray-600 mb-0 ">Departure From :</p>
              <p className="text-gray-900 font-semibold ">{bus.busTo.city}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Date :</p>
              <p className="text-gray-900 font-semibold ">
                {bus.busTo.arrivalTime < bus.busFrom.departureTime
                  ? dayjs().add(1, "day").format("YYYY-MM-DD")
                  : dayjs().format("YYYY-MM-DD")}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Arrival Time:</p>

              <p className="text-gray-900 font-semibold ">
                {bus.busTo.arrivalTime}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
            onClick={() => navigate(`/checker/${bus._id}`)}
          >
            Check
          </button>
        </div>

        <div className="mt-2 bg-orange-500 py-2 rounded-b-lg"></div>
      </div>
    </Zoom>
  );
};

export default CheckerBus;
