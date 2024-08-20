import React from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import Button from "@mui/material/Button";

const Seat = ({
  bookable,
  availabilityBoolean,
  children,
  seatNumber,
  toggleSeatSelection,
  selectedSeats,
}) => {
  const backgroundColorSelector = (isBookable, availabilityBoolean) => {
    if (!isBookable) {
      return "bg-gray-800"; // not bookable
    } else if (availabilityBoolean) {
      return "bg-green-500"; //bookable and available
    }
    return "bg-red-500"; //bookable but not available
  };

  return (
    <Button
      onClick={() =>
        toggleSeatSelection(seatNumber, bookable, availabilityBoolean)
      }
    >
      <div
        className={`flex flex-col items-center justify-center border-2 rounded-md md:w-20 md:h-20 w-10 h-10 ${backgroundColorSelector(
          bookable,
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
