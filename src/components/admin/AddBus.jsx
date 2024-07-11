import React from "react";
import { useState, useEffect, useRef } from "react";
import ImageUploader from "../ui/ImageUploader";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import RouteTable from "./RouteTable";
import WeekdaySelector from "../ui/weekDaySelector";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Autocomplete, TextField } from "@mui/material";

const AddBus = () => {
  const REGEX_NUMBER = /^[\d/]+$/;
  const REGEX_ALLOCATED_SEATS = /^\d+$/;
  const REGEX_CITY = /^[A-Za-z ]+$/;
  const REGISTER_URL = "/bus";
  const REGEX_NUMBERPLATE = /^[A-Z]{2,3}-\d{4}$/;

  const { setBusView, cities } = useContext(DataContext);
  setBusView(true);

  const [routeNumberError, setRouteNumberError] = useState(true);
  const [routeNumberFocus, setRouteNumberFocus] = useState(false);

  const [allocatedSeatsError, setAllocatedSeatsError] = useState(true);
  const [allocatedSeatsFocus, setAllocatedSeatsFocus] = useState(false);

  const [StartCityError, setStartCityError] = useState(true);
  const [StartCityFocus, setStartCityFocus] = useState(false);

  const [EndCityError, setEndCityError] = useState(true);
  const [EndCityFocus, setEndCityFocus] = useState(false);

  const [numberPlateError, setNumberPlateError] = useState(true);
  const [numberPlateFocus, setNumberPlateFocus] = useState(false);

  const [cityError, setCityError] = useState(true);
  const [cityFocus, setCityFocus] = useState(false);

  const [haltsError, setHaltsError] = useState(false);
  const [haltsFocus, setHaltsFocus] = useState(false);

  const [minHaltsError, setMinHaltsError] = useState(false);
  const [minHaltsFocus, setMinHaltsFocus] = useState(false);

  const [images, setImages] = useState([]);

  const [oneRowOfTable, setOneRowOfTable] = useState({
    city: "",
    halts: 0,
    arrivalTime: "",
    departureTime: "",
  });

  const [table, setTable] = useState([]);
  const names = ["weekdays", "saturday", "sunday"];
  const [selectedDays, setSelectedDays] = useState([]);

  const pushBusToTable = async (e) => {
    e.preventDefault();
    setTable([...table, oneRowOfTable]);
    setOneRowOfTable({
      city: "",
      halts: 0,
      arrivalTime: oneRowOfTable.arrivalTime,
      departureTime: oneRowOfTable.departureTime,
    });
  };

  const deleteLastRow = (e) => {
    e.preventDefault();
    setTable(table.slice(0, table.length - 1));
  };

  const [bus, setBus] = useState({
    routeNumber: "",
    busName: "",
    capacity: 54,
    noOfAlocatedSeats: 10,
    BusFrom: {
      city: "",
      departureTime: "",
    },
    BusTo: {
      city: "",
      arrivalTime: "",
    },
    numberPlate: "",
    minHalts: 80,
  });

  const [submitErr, setSubmitErr] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [pushErr, setPushErr] = useState(true);

  const errRef = useRef();

  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("routeNumber", bus.routeNumber);
      formData.append("busName", bus.busName);
      formData.append("capacity", bus.capacity);
      formData.append("noOfAlocatedSeats", bus.noOfAlocatedSeats);
      formData.append("BusFrom", JSON.stringify(bus.BusFrom));
      formData.append("BusTo", JSON.stringify(bus.BusTo));
      formData.append("numberPlate", bus.numberPlate);
      formData.append("minHalts", bus.minHalts);
      formData.append(
        "selectedDays",
        JSON.stringify({
          weekDays: selectedDays.includes("weekdays") ? true : false,
          saturday: selectedDays.includes("saturday") ? true : false,
          sunday: selectedDays.includes("sunday") ? true : false,
        })
      );
      formData.append("table", JSON.stringify(table));

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const response = await axios.post(REGISTER_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBus({
        routeNumber: "",
        busName: "",
        capacity: 54,
        noOfAlocatedSeats: 10,
        BusFrom: {
          city: "",
          departureTime: "",
        },
        BusTo: {
          city: "",
          arrivalTime: "",
        },
        numberPlate: "",
        minHalts: 80,
      });
      setImages([]);
      navigate("/admin");
      alert("Bus Added Successfully");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Fields");
      } else if (err.response?.status === 500) {
        setErrMsg("Server Error");
      } else if (err.response?.status === 413) {
        setErrMsg(
          "Image sizes are too large. maximum allowed size for all images is 5MB"
        );
      } else {
        setErrMsg("Failed to Add Bus");
      }
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setRouteNumberError(!REGEX_NUMBER.test(bus.routeNumber));
  }, [bus.routeNumber]);

  useEffect(() => {
    setAllocatedSeatsError(!REGEX_ALLOCATED_SEATS.test(bus.noOfAlocatedSeats));
    if (bus.noOfAlocatedSeats > bus.capacity) {
      setAllocatedSeatsError(true);
    }
    // if the allocated seats is less than 10 not allowed
    else if (bus.noOfAlocatedSeats < 10) {
      setAllocatedSeatsError(true);
    }
  }, [bus.noOfAlocatedSeats, bus.capacity]);

  useEffect(() => {
    setStartCityError(!REGEX_CITY.test(bus.BusFrom.city));
  }, [bus.BusFrom.city]);

  useEffect(() => {
    setEndCityError(!REGEX_CITY.test(bus.BusTo.city));
  }, [bus.BusTo.city]);

  useEffect(() => {
    setNumberPlateError(!REGEX_NUMBERPLATE.test(bus.numberPlate));
  }, [bus.numberPlate]);

  useEffect(() => {
    if (
      !routeNumberError &&
      !allocatedSeatsError &&
      !StartCityError &&
      !EndCityError &&
      !numberPlateError &&
      images.length > 0 &&
      table.length > 0 &&
      selectedDays.length > 0
    ) {
      setSubmitErr(false);
    } else {
      setSubmitErr(true);
    }
  }, [
    routeNumberError,
    allocatedSeatsError,
    StartCityError,
    EndCityError,
    numberPlateError,
    images,
    table,
    selectedDays,
  ]);

  useEffect(() => {
    setCityError(!REGEX_CITY.test(oneRowOfTable.city));
  }, [oneRowOfTable.city]);

  useEffect(() => {
    setHaltsError(!REGEX_ALLOCATED_SEATS.test(oneRowOfTable.halts));
    if (oneRowOfTable.halts < 0 || oneRowOfTable.halts > 350) {
      setHaltsError(true);
    }
  }, [oneRowOfTable.halts]);

  useEffect(() => {
    setMinHaltsError(!REGEX_ALLOCATED_SEATS.test(bus.minHalts));
    if (bus.minHalts < 0 || bus.minHalts > 350) {
      setMinHaltsError(true);
    }
  }, [bus.minHalts]);

  useEffect(() => {
    setErrMsg("");
  }, [bus]);

  useEffect(() => {
    if (
      oneRowOfTable.city &&
      oneRowOfTable.halts &&
      oneRowOfTable.arrivalTime &&
      oneRowOfTable.departureTime &&
      !cityError &&
      !haltsError
    ) {
      setPushErr(false);
    } else {
      setPushErr(true);
    }
  }, [oneRowOfTable, cityError, haltsError]);

  return (
    <div className=" md:max-w-[90vw] mx-auto p-6 shadow-2xl max-w-[100vw]">
      <form>
        <div className="flex flex-col">
          <p className="text-center  bg-cyan-600 text-white font-bold rounded-md ">
            Add Bus
          </p>
          <div>
            <p className="text-red-500 text-center" ref={errRef}>
              {errMsg}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-col w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 pr-1 pb-1 pt-1">Route Number:</label>
              {routeNumberError && routeNumberFocus && (
                <p className="text-red-500 ml-2">Route number is invalid</p>
              )}
              <input
                type="text"
                placeholder="400/1"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setBus({ ...bus, routeNumber: e.target.value });
                }}
                value={bus.routeNumber}
                onFocus={() => setRouteNumberFocus(true)}
                onBlur={() => setRouteNumberFocus(false)}
              />
            </div>

            <div className="flex flex-col w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 p-1">Bus or Company Name:</label>
              <input
                type="text"
                placeholder="SLTB"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setBus({ ...bus, busName: e.target.value });
                }}
                value={bus.busName}
              />
            </div>

            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 p-1">Capacity:</label>
              <select
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setBus({ ...bus, capacity: e.target.value });
                }}
                value={bus.capacity}
              >
                <option value="54">54</option>
                <option value="59">59</option>
              </select>
            </div>

            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 pr-1 pb-1 pt-1">
                No of Allocated Seats:
              </label>
              {allocatedSeatsError && allocatedSeatsFocus && (
                <p className="text-red-500 ml-2">Allocated seats are invalid</p>
              )}
              <input
                type="number"
                placeholder="No of Alocated Seats"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setBus({ ...bus, noOfAlocatedSeats: e.target.value });
                }}
                value={bus.noOfAlocatedSeats}
                onFocus={() => setAllocatedSeatsFocus(true)}
                onBlur={() => setAllocatedSeatsFocus(false)}
              />
            </div>

            <div className="flex flex-col">
              <label className="ml-2 pr-1 pt-1 pb-1">
                Departure Location & Time:
              </label>
              {StartCityError && StartCityFocus && (
                <p className="text-red-500 ml-2">City is invalid</p>
              )}
              <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
                <input
                  type="text"
                  placeholder="Colombo"
                  className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                  onChange={(e) => {
                    setBus({
                      ...bus,
                      BusFrom: { ...bus.BusFrom, city: e.target.value },
                    });
                  }}
                  value={bus.BusFrom.city}
                  onFocus={() => setStartCityFocus(true)}
                  onBlur={() => setStartCityFocus(false)}
                />
                <input
                  type="time"
                  placeholder="Departure Time"
                  className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                  onChange={(e) => {
                    setBus({
                      ...bus,
                      BusFrom: {
                        ...bus.BusFrom,
                        departureTime: e.target.value,
                      },
                    });
                  }}
                  value={bus.BusFrom.departureTime}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="ml-2 pr-1 pt-1 pb-1">
                Arrival Location & Time:
              </label>
              {EndCityError && EndCityFocus && (
                <p className="text-red-500 ml-2">City is invalid</p>
              )}
              <div className="flex items-center w-full md:w-auto mb-2 md:mb-0">
                <input
                  type="text"
                  placeholder="Matara"
                  className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                  onChange={(e) => {
                    setBus({
                      ...bus,
                      BusTo: { ...bus.BusTo, city: e.target.value },
                    });
                  }}
                  value={bus.BusTo.city}
                  onFocus={() => setEndCityFocus(true)}
                  onBlur={() => setEndCityFocus(false)}
                />
                <input
                  type="time"
                  placeholder="Arrival Time"
                  className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                  onChange={(e) => {
                    setBus({
                      ...bus,
                      BusTo: {
                        ...bus.BusTo,
                        arrivalTime: e.target.value,
                      },
                    });
                  }}
                  value={bus.BusTo.arrivalTime}
                />
              </div>
            </div>

            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 p-1">Select Days:</label>
              <WeekdaySelector
                names={names}
                personName={selectedDays}
                setPersonName={setSelectedDays}
              />
            </div>

            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 p-1">Number Plate:</label>
              {numberPlateError && numberPlateFocus && (
                <p className="text-red-500 ml-2">Number Plate is invalid</p>
              )}
              <input
                type="text"
                placeholder="NB-2456"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setBus({ ...bus, numberPlate: e.target.value });
                }}
                value={bus.numberPlate}
                onFocus={() => setNumberPlateFocus(true)}
                onBlur={() => setNumberPlateFocus(false)}
              />
            </div>
            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              {minHaltsError && minHaltsFocus && (
                <p className="text-red-500 ml-2">Min Halts is invalid</p>
              )}
              <label className="ml-2 p-1">Min Halts Allowed:</label>
              <input
                type="number"
                placeholder="80"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setBus({ ...bus, minHalts: e.target.value });
                }}
                value={bus.minHalts}
                onFocus={() => setMinHaltsFocus(true)}
                onBlur={() => setMinHaltsFocus(false)}
                max={350}
              />
            </div>
          </div>
          <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
            <label className="ml-2 p-1">Upload Image:</label>
            <ImageUploader setImages={setImages} />
          </div>

          <hr />
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              {cityError && cityFocus && (
                <p className="text-red-500 ml-2">City is invalid</p>
              )}
              <label className="ml-2 p-1">City:</label>
              {/* <input
                type="text"
                placeholder="City"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setOneRowOfTable({
                    ...oneRowOfTable,
                    city: e.target.value.toLowerCase(),
                  });
                }}
                value={oneRowOfTable.city}
                onFocus={() => setCityFocus(true)}
                onBlur={() => setCityFocus(false)}
              /> */}
              <Autocomplete
                freeSolo
                sx={{ minWidth: 200, flexGrow: 1 }}
                options={cities}
                onChange={(event, newValue) => {
                  // Handle selection from dropdown
                  setOneRowOfTable({
                    ...oneRowOfTable,
                    city: newValue ? newValue.toLowerCase() : "",
                  });
                }}
                onInputChange={(event, newInputValue) => {
                  setOneRowOfTable({
                    ...oneRowOfTable,
                    city: newInputValue ? newInputValue.toLowerCase() : "",
                  });
                }}
                value={oneRowOfTable.city}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      minWidth: 200,
                      flexGrow: 1,
                    }}
                    {...params}
                  />
                )}
              />
            </div>
            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              {haltsError && haltsFocus && (
                <p className="text-red-500 ml-2">Halts are invalid</p>
              )}
              <label className="ml-2 p-1">Halts:</label>
              <input
                type="number"
                placeholder="Halts"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setOneRowOfTable({ ...oneRowOfTable, halts: e.target.value });
                }}
                value={oneRowOfTable.halts}
                onFocus={() => setHaltsFocus(true)}
                onBlur={() => setHaltsFocus(false)}
              />
            </div>
            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 p-1">Arrival Time:</label>
              <input
                type="time"
                placeholder="Arrival Time"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setOneRowOfTable({
                    ...oneRowOfTable,
                    arrivalTime: e.target.value,
                  });
                }}
                value={oneRowOfTable.arrivalTime}
              />
            </div>
            <div className="flex flex-col  w-full md:w-auto mb-2 md:mb-0">
              <label className="ml-2 p-1">Departure Time:</label>
              <input
                type="time"
                placeholder="Departure Time"
                className="border-2 border-gray-300 rounded-md p-2 flex-grow ml-2"
                onChange={(e) => {
                  setOneRowOfTable({
                    ...oneRowOfTable,
                    departureTime: e.target.value,
                  });
                }}
                value={oneRowOfTable.departureTime}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className=" bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            onClick={pushBusToTable}
            disabled={pushErr}
          >
            Push
          </button>
        </div>
        <hr />
        <div className="m-2.75">
          <RouteTable table={table} />
        </div>
        <div className="flex justify-end mt-2">
          <button
            className=" bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600"
            onClick={deleteLastRow}
            disabled={table.length === 0}
          >
            Delete Last
          </button>
        </div>
        <hr />
        <div className="flex justify-start">
          <button
            className={`bg-cyan-500 text-white font-bold py-2 px-4 rounded hover:bg-cyan-600 ${
              submitErr ? "cursor-not-allowed bg-gray-400" : ""
            }`}
            disabled={submitErr}
            onClick={handleClick}
          >
            {" "}
            Add Bus
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBus;
