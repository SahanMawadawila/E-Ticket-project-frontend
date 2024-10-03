import React from "react";
import Seat from "./Seat";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const SeatArrangementForUser = ({
  seats,
  toggleSeatSelection,
  selectedSeats,
}) => {
  let seats_3 = seats.slice(-6); // Get the last 5 seats
  let seats_2 = seats.slice(-9, -6); // Get the 3 seats before the last 5 seats
  let seats_1 = seats.slice(0, -9);

  return (
    <>
      <div className="flex flex-col ">
        <div className="flex">
          <div style={{ flex: 2 }} className="bg-stone-500">
            <div className="grid grid-cols-2 gap-1  justify-items-center pt-1 pb-1">
              {seats_1.map((seat, index) => {
                if (seat.seatNumber % 5 === 1 || seat.seatNumber % 5 === 2) {
                  return (
                    <Seat
                      key={index}
                      availabilityBoolean={seat.availabilityBoolean}
                      seatNumber={seat.seatNumber}
                      toggleSeatSelection={toggleSeatSelection}
                      selectedSeats={selectedSeats}
                    >
                      {seat.seatNumber}
                    </Seat>
                  );
                }
                return null;
              })}
            </div>
          </div>
          <div style={{ flex: 1 }} className="bg-stone-600 pt-1 pb-1"></div>
          <div style={{ flex: 3 }} className="bg-stone-500">
            <div className="grid grid-cols-3 gap-1 pt-1 pb-1 justify-items-center">
              {seats_1.map((seat, index) => {
                if (
                  seat.seatNumber % 5 === 3 ||
                  seat.seatNumber % 5 === 4 ||
                  seat.seatNumber % 5 === 0
                ) {
                  return (
                    <Seat
                      key={index}
                      availabilityBoolean={seat.availabilityBoolean}
                      seatNumber={seat.seatNumber}
                      toggleSeatSelection={toggleSeatSelection}
                      selectedSeats={selectedSeats}
                    >
                      {seat.seatNumber}
                    </Seat>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
        <div className="bg-cyan-600 flex">
          <div style={{ flex: 3 }} className="bg-stone-600"></div>
          <div style={{ flex: 3 }} className="bg-stone-500">
            <div className="grid grid-cols-3 gap-1 justify-items-center pt-1">
              {seats_2.map((seat, index) => (
                <Seat
                  key={index}
                  availabilityBoolean={seat.availabilityBoolean}
                  seatNumber={seat.seatNumber}
                  toggleSeatSelection={toggleSeatSelection}
                  selectedSeats={selectedSeats}
                >
                  {seat.seatNumber}
                </Seat>
              ))}
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-6 bg-stone-500 justify-items-center pt-1 pb-1">
          {seats_3.map((seat, index) => (
            <Seat
              key={index}
              availabilityBoolean={seat.availabilityBoolean}
              seatNumber={seat.seatNumber}
              toggleSeatSelection={toggleSeatSelection}
              selectedSeats={selectedSeats}
            >
              {seat.seatNumber}
            </Seat>
          ))}
        </div>
      </div>
      <div className="flex justify-between flex-wrap mt-3">
        <div className="flex items-center gap-1">
          <div className="bg-gray-800 flex items-center justify-center border-2 rounded-md md:w-20 md:h-20 w-10 h-10">
            <div>
              <EventSeatIcon className="text-white" />
            </div>
          </div>
          <p className="md:text-base text-xs font-bold text-gray-600 text-center m-0">
            Not Available
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-red-500 flex items-center justify-center border-2 rounded-md md:w-20 md:h-20 w-10 h-10">
            <div>
              <EventSeatIcon className="text-white" />
            </div>
          </div>
          <p className="md:text-base text-xs font-bold text-gray-600 text-center m-0">
            Booked
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-indigo-600 flex items-center justify-center border-2 rounded-md md:w-20 md:h-20 w-10 h-10">
            <div>
              <EventSeatIcon className="text-white" />
            </div>
          </div>
          <p className="md:text-base text-xs font-bold text-gray-600 text-center m-0">
            Processing
          </p>
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-green-500 flex items-center justify-center border-2 rounded-md md:w-20 md:h-20 w-10 h-10">
            <div>
              <EventSeatIcon className="text-white" />
            </div>
          </div>
          <p className="md:text-base text-xs font-bold text-gray-600 text-center m-0">
            Available
          </p>
        </div>
      </div>
    </>
  );
};

export default SeatArrangementForUser;
