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
import Error from "./Error";

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

  if (!responseData) {
    return <Error />;
  }
  responseData.days = getDays(responseData.selectedDays);
  const slideStyle =
    "md:w-96 md:h-96 w-[calc(100vw-25px)] h-[calc(100vw-25px)]";
  const imageStyle =
    "object-cover h-full w-full object-center rounded-md shadow-2xl ";

  return (
    <div className="text-xs md:text-base mx-auto md:p-6 shadow-2xl md:w-full w-[96%] ">
      <div className="bg-blue-900 text-white text-center py-0.6 md:py-2 rounded-t-lg mb-2">
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
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
                    {input.from}
                  </p>
                </div>

                <div>
                  <p className="text-gray-600 mb-0 ">Date:</p>
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
                    {date.format("YYYY-MM-DD")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0 ">Departure Time:</p>
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
                    {responseData.searchedDepartureTime}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img src="../../images/arrow.png" alt="" />
                <div>
                  <p className="text-gray-600 mt-3 mb-0">Duration</p>
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
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
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
                    {input.to}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0 ">Date :</p>
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
                    {responseData.searchedArrivalTime <
                    responseData.searchedDepartureTime
                      ? dayjs(date).add(1, "day").format("YYYY-MM-DD")
                      : date.format("YYYY-MM-DD")}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-0 ">Arrival time :</p>
                  <p className="text-gray-900 font-semibold mb-2 md:mb-4">
                    {responseData.searchedArrivalTime}
                  </p>
                </div>
              </div>
            </div>
            <CollapsibleCard title="Card Title 1">
              <Typography>
                <div className="flex flex-row xl:justify-evenly flex-wrap justify-start gap-4 text-xs md:text-base">
                  <div>
                    <p className="text-gray-600 mb-0 ml-2 md:ml-0">Company :</p>
                    <p className="text-gray-900 font-semibold mb-0 ml-2 md:ml-0">
                      {responseData.busName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0 ml-2 md:ml-0">
                      Number Plate :
                    </p>
                    <p className="text-gray-900 ml-2 md:ml-0 font-semibold mb-0 ">
                      {responseData.numberPlate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0 ml-2 md:ml-0">Days :</p>
                    <p className="text-gray-900 ml-2 md:ml-0 font-semibold mb-0 ">
                      {responseData.days}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-0 ml-2 md:ml-0">
                      Capacity :
                    </p>
                    <p className="text-gray-900 ml-2 md:ml-0 font-semibold mb-0 ">
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
            className="font-bold text-xl pr-4 pt-0 pb-0 pl-2 mb-0"
            style={{ color: "#063970" }}
          >
            Rs. {formatNumber(responseData.thisBusPrice)}
          </p>
        </div>
      </div>
      <hr />
      <div className="bg-green-500 text-white text-center py-0.6 md:py-2  mb-2">
        <h2 className="text-xl font-bold">Seats</h2>
      </div>
      <SeatArrangementForUser
        seats={responseData.seats}
        toggleSeatSelection={toggleSeatSelection}
        selectedSeats={selectedSeats}
      />
      {selectedSeats.length > 0 && (
        <div className="flex justify-end items-end mt-4">
          <p
            className="font-bold text-xl pr-4 pt-0 pb-0 pl-2 mb-0"
            style={{ color: "#063970" }}
          >
            Total : Rs.{" "}
            {formatNumber(responseData.thisBusPrice * selectedSeats.length)}
          </p>
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
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
