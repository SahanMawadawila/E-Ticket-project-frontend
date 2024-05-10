import React from "react";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Button } from "@mui/material";

//date picker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";

const SearchBar = () => {
  const [date, setDate] = useState(dayjs());
  return (
    <div className="flex-col shadow-2xl max-w-[50vw] mx-auto p-6">
      <p className="text-center  bg-cyan-600 text-white font-bold rounded-md ">
        Online Seat Reservation
      </p>
      <div className="flex flex-wrap items-center justify-between  mt-5">
        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
          <DepartureBoardIcon />
          <input
            type="text"
            placeholder="From"
            className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
          />
        </div>
        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
          <DirectionsBusIcon />
          <input
            type="text"
            placeholder="To"
            className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
          />
        </div>
        <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
            />
          </LocalizationProvider>
        </div>

        <Button variant="contained">Search</Button>
      </div>
    </div>
  );
};

export default SearchBar;
