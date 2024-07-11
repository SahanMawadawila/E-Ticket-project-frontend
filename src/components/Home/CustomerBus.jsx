// BusScheduleCard.js

import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import SlideShow from "../ui/SlideShow";
import { baseURL } from "../../api/axios";
import subtractTime from "../../utils/subtractTime";
import dayjs from "dayjs";
import CollapsibleCard from "./CollapseCard";
import { Typography } from "@mui/material";
import formatNumber from "../../utils/formatNumber";
import getDays from "../../utils/getDays";
import SeatArrangementForUser from "./SeatArrangementForUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerBus = () => {
  const { searchResults, input, date } = useContext(DataContext);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const toggleSeatSelection = (seatNumber, bookable, availabilityBoolean) => {
    if (!bookable || !availabilityBoolean) {
      return;
    }
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };
  const navigate = useNavigate();
  const { id } = useParams();
  const responseData = searchResults.find((result) => result._id === id);
  responseData.days = getDays(responseData.selectedDays);
  const slideStyle = "w-96 h-96";
  const imageStyle =
    "object-cover h-full w-full object-center rounded-md shadow-2xl";

  return (
    <div className=" mx-auto p-6 shadow-2xl max-w-[100vw] ">
      <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg mb-2">
        <h2 className="text-xl font-bold self-center">
          {`Route # ${responseData.routeNumber} ${responseData.busFrom.city} - ${responseData.busTo.city}`}
        </h2>
      </div>
      <div className=" border-gray-200 border-2 p-2 rounded-md ">
        <div className="flex flex-col md:flex-row items-center  gap-5 ">
          <div>
            <SlideShow
              baseURL={baseURL}
              slides={responseData.imagesURLs}
              slideStyle={slideStyle}
              imageStyle={imageStyle}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full justify-evenly">
              <div className="flex flex-col justify-center ">
                <div>
                  <p className="text-gray-600 mb-0 ">Departure From :</p>
                  <p className="text-gray-900 font-semibold ">{input.from}</p>
                </div>

                <div>
                  <p className="text-gray-600 mb-0 ">Date:</p>
                  <p className="text-gray-900 font-semibold ">
                    {date.format("YYYY-MM-DD")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0 ">Departure Time:</p>
                  <p className="text-gray-900 font-semibold ">
                    {responseData.searchedDepartureTime}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img src="../../images/arrow.png" alt="" />
                <div>
                  <p className="text-gray-600 mt-3 mb-0">Duration</p>
                  <p className="text-gray-900 font-semibold ">
                    {subtractTime(
                      responseData.searchedDepartureTime,
                      responseData.searchedArrivalTime
                    )}
                    &nbsp;hrs
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div>
                  <p className="text-gray-600 mb-0 ">Arrival To :</p>
                  <p className="text-gray-900 font-semibold ">{input.to}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0 ">Date :</p>
                  <p className="text-gray-900 font-semibold ">
                    {responseData.searchedArrivalTime <
                    responseData.searchedDepartureTime
                      ? dayjs(date).add(1, "day").format("YYYY-MM-DD")
                      : date.format("YYYY-MM-DD")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0 ">Arrival time :</p>
                  <p className="text-gray-900 font-semibold ">
                    {responseData.searchedArrivalTime}
                  </p>
                </div>
              </div>
            </div>
            <CollapsibleCard title="Card Title 1">
              <Typography>
                <div className="flex flex-row justify-evenly">
                  <div>
                    <p className="text-gray-600 mb-0 ">Bus/Company :</p>
                    <p className="text-gray-900 font-semibold ">
                      {responseData.busName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0 ">Number Plate :</p>
                    <p className="text-gray-900 font-semibold ">
                      {responseData.numberPlate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0 ">Days :</p>
                    <p className="text-gray-900 font-semibold ">
                      {responseData.days}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0 ">Capacity :</p>
                    <p className="text-gray-900 font-semibold ">
                      {responseData.capacity}
                    </p>
                  </div>
                </div>
              </Typography>
            </CollapsibleCard>
          </div>
        </div>
        <div className="flex justify-end items-center">
          <img src="../../images/visaCard.png" alt="" className="w-10 h-10" />
          <img src="../../images/masterCard.png" alt="" className="w-10 h-10" />
          <p
            className="font-bold text-xl pr-4 pt-0 pb-0 pl-2"
            style={{ color: "#063970" }}
          >
            Rs. {formatNumber(responseData.thisBusPrice)}
          </p>
        </div>
      </div>
      <hr />
      <div className="bg-green-600 text-white text-center py-2  mb-2">
        <h2 className="text-xl font-bold">Seats</h2>
      </div>
      <SeatArrangementForUser
        seats={responseData.seats}
        toggleSeatSelection={toggleSeatSelection}
        selectedSeats={selectedSeats}
      />
      {selectedSeats.length > 0 && (
        <div className="flex justify-end items-center mt-4">
          <p
            className="font-bold text-xl pr-4 pt-0 pb-0 pl-2"
            style={{ color: "#063970" }}
          >
            Total : Rs.{" "}
            {formatNumber(responseData.thisBusPrice * selectedSeats.length)}
          </p>
          <button
            className="bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600"
            onClick={() =>
              navigate(`/${id}/booking/${selectedSeats.join(",")}`)
            }
          >
            Book Now
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerBus;
