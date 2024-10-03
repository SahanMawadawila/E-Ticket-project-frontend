import React from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Button from "@mui/material/Button";

const Seat = ({
  availabilityBoolean,
  children,
  seatNumber,
  toggleSeatSelection,
  selectedSeats,
}) => {
  const backgroundColorSelector = (availabilityBoolean) => {
    if (availabilityBoolean === 0) {
      return "bg-gray-800"; // not bookable
    } else if (availabilityBoolean === 3) {
      return "bg-green-500"; //bookable and available
    } else if (availabilityBoolean === 1) {
      return "bg-red-500"; //bookable but not available
    }
    return "bg-indigo-600"; //bookable but prossesing
  };

  return (
    <Button
      onClick={() => toggleSeatSelection(seatNumber, availabilityBoolean)}
    >
      <div
        className={`flex flex-col items-center justify-center border-2 rounded-md md:w-20 md:h-20 w-10 h-10 ${backgroundColorSelector(
          availabilityBoolean
        )}`}
        style={{
          borderColor: selectedSeats.includes(seatNumber) ? "red" : "black",
        }}
      >
        <p className="md:text-base text-xs font-bold text-white text-center m-0">
          {" "}
          {children}
        </p>
        <div>
          <EventSeatIcon className="text-white" />
        </div>
      </div>
    </Button>
  );
};

export default Seat;
