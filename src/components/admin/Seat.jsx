import React from "react";
import EventSeatIcon from "@mui/icons-material/EventSeat";

const Seat = ({ backgroundColor, children }) => {
  return (
    <div
      className="flex flex-col items-center justify-center border-2 
    border-black rounded-md md:w-20 md:h-20 w-10 h-10 "
      style={{ backgroundColor }}
    >
      <p className="md:text-base text-xs font-bold text-white text-center m-0">
        {" "}
        {children}
      </p>
      <div>
        <EventSeatIcon className="text-white" />
      </div>
    </div>
  );
};

export default Seat;
