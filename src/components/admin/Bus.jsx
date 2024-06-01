import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import { baseURL } from "../../api/axios";
import Loading from "../ui/Loading";
import SlideShow from "../ui/SlideShow";
import RouteTable from "./RouteTable";
import ConfirmModal from "../ui/ConfirmModal";
import { useNavigate } from "react-router-dom";
import SeatArrangement from "./SeatArrangement";

const Bus = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState({});
  const [wantToDeleteTheBus, setWantToDeleteTheBus] = useState(false);
  const slideStyle = "w-96 h-96";
  const imageStyle =
    "object-cover h-full w-full object-center rounded-md shadow-2xl";

  const getDays = (selectedDays) => {
    let days = "";
    for (let key in selectedDays) {
      if (selectedDays[key] === true) {
        if (key === "weekDays") key = "Week Days";
        days += key + "/";
      }
    }
    if (days.charAt(days.length - 1) === "/") {
      days = days.slice(0, -1);
    }
    return days;
  };
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await axios.get(`/bus/${id}`);
        setResponseData(response.data);
        setLoading(false);
        console.log(response.data.selectedDays);
        setResponseData({
          ...response.data,
          days: getDays(response.data.selectedDays),
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchBus();
  }, []);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteBus = () => {
    setWantToDeleteTheBus(true);
    handleClose();
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (wantToDeleteTheBus) {
      const deleteBus = async () => {
        try {
          const response = await axios.delete(`/bus/${id}`);
          alert("Bus has been successfully deleted");
        } catch (err) {
          console.log(err);
        }
      };
      deleteBus();
      setWantToDeleteTheBus(false);
      navigate("/admin");
    }
  }, [wantToDeleteTheBus]);

  if (loading) return <Loading />;
  return (
    <div className=" mx-auto p-6 shadow-2xl max-w-[100vw] ">
      <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg mb-2">
        <h2 className="text-xl font-bold">
          Route # {responseData.routeNumber}
        </h2>
      </div>
      <div className="flex flex-col md:flex-row items-center  gap-5 border-gray-200 border-2 p-2 rounded-md">
        <div>
          <SlideShow
            baseURL={baseURL}
            slides={responseData.imagesURLs}
            slideStyle={slideStyle}
            imageStyle={imageStyle}
          />
        </div>
        <div className="flex flex-row w-full justify-evenly">
          <div className="flex flex-col justify-center ">
            <div>
              <p className="text-gray-600 mb-0 ">Departure From :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busFrom.city}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Departure Time:</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busFrom.departureTime}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Bus/Company :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busName}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-0 ">Capacity :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.capacity}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-0 ">Min Halts Allowed :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.minHalts}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <img src="../../images/arrow.png" alt="" />
            <div>
              <p className="text-gray-600 mt-3 mb-0">Duration</p>
              <p className="text-gray-900 font-semibold ">5hrs</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <p className="text-gray-600 mb-0 ">Arrival To :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busTo.city}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-0 ">Arrival Time</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busTo.arrivalTime}
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
          </div>
        </div>
      </div>
      <hr />
      <div className="bg-green-600 text-white text-center py-2  mb-2">
        <h2 className="text-xl font-bold">Seats</h2>
      </div>
      <SeatArrangement seats={responseData.seats} />
      <hr />

      <RouteTable table={responseData.route} />
      <div className="flex justify-end mt-2">
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600"
          onClick={handleShow}
        >
          Delete
        </button>
      </div>
      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleYes={handleDeleteBus}
      >
        Do you want to delete this bus?
      </ConfirmModal>
    </div>
  );
};

export default Bus;
