import React, { useEffect } from "react";
import DepartureBoardIcon from "@mui/icons-material/DepartureBoard";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import { Button } from "@mui/material";
import axios from "../../api/axios";

//date picker
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import dayjs from "dayjs";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { Autocomplete, TextField } from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";

const SearchBar = ({
  setNoContent,
  setSearching,
  input,
  setInput,
  setError,
  error,
  setDate,
  date,
  setSearchResults,
}) => {
  const { cities } = useContext(DataContext);
  const [searchDisabled, setSearchDisabled] = useState(true);

  useEffect(() => {
    if (input.from !== "" && input.to !== "") {
      setSearchDisabled(false);
    } else {
      setSearchDisabled(true);
    }
  }, [input]);

  const handleSearch = async () => {
    setNoContent(false);
    setSearching(true);
    setSearchResults([]);

    const previousDaySearch = {
      from: input.from,
      to: input.to,
      date: dayjs(date).subtract(1, "day").format(),
      isToday: false,
    };
    const search = {
      from: input.from,
      to: input.to,
      date: dayjs(date).format(),
      isToday: true,
    };

    try {
      const [previousResponse, response] = await Promise.all([
        axios.post("/search", previousDaySearch),
        axios.post("/search", search),
      ]);
      console.log(previousResponse);
      console.log(response);

      if (response.status === 204 && previousResponse.status === 204) {
        setNoContent(true);
      } else {
        setSearchResults([...previousResponse.data, ...response.data]);
      }
    } catch (err) {
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
      }
      setNoContent(true);
      console.log(err);
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    setError("");
  }, [input, date]);

  return (
    <div className="flex-col  shadow-2xl md:max-w-[75vw] lg:max-w-[50vw] mx-w-[100vw] mx-auto p-6">
      {error && <p className="text-red-500 text-center">{error}</p>}
      <p className="text-center  bg-cyan-600 text-white font-bold rounded-md ">
        Online Seat Reservation
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex md:flex-row flex-col md:justify-between gap-3 md:gap-0">
          <div className="flex items-center">
            <DepartureBoardIcon />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={
                cities.length > 0 ? cities : ["colombo", "kandy", "galle"]
              }
              sx={{ width: 200, flexGrow: 1 }}
              renderInput={(params) => <TextField {...params} label="From" />}
              onInputChange={(event, newValue) => {
                setInput({ ...input, from: newValue });
              }}
            />
          </div>
          <div className="flex items-center">
            <DirectionsBusIcon />
            <Autocomplete
              disablePortal
              id="combo-box-demo2"
              options={
                cities.length > 0 ? cities : ["colombo", "kandy", "galle"]
              }
              sx={{ width: 200, flexGrow: 1 }}
              renderInput={(params) => <TextField {...params} label="To" />}
              onInputChange={(event, newValue) => {
                setInput({ ...input, to: newValue });
              }}
            />
          </div>
        </div>
        <div className="flex items-center">
          <DateRangeIcon />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              maxDate={dayjs().add(3, "day")}
              sx={{ width: 200, flexGrow: 1 }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex justify-end">
          <Button
            variant="contained"
            disabled={searchDisabled}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
