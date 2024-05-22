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
  console.log(id);
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await axios.get(`/bus/${id}`);
        setResponseData(response.data);
        setLoading(false);
        console.log(response.data);
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
    <div className="md:max-w-[90vw] mx-auto p-6 shadow-2xl max-w-[100vw] ">
      <div className="flex flex-col md:flex-row items-center flex-wrap gap-5 border-gray-200 border-2 p-2 rounded-md">
        <div>
          <SlideShow
            baseURL={baseURL}
            slides={responseData.imagesURLs}
            slideStyle={slideStyle}
            imageStyle={imageStyle}
          />
        </div>
        <div className="flex flex-col gap-1 md:gap-4 justify-start">
          <h1
            className="text-2xl md:text-3xl font-bold 
          bg-gradient-to-r from-sky-600 to-cyan-400 p-2 rounded-md
         text-white"
          >{`${responseData.routeNumber} - ${responseData.busFrom.city} to ${responseData.busTo.city}`}</h1>
          <p className="text:lg md:text-xl font-semibold text-gray-500">
            Bus/Company Name:{" "}
            <span className="text-black">{responseData.busName}</span>
          </p>
          <p className="text:lg md:text-xl font-semibold text-gray-500">
            Number Plate:{" "}
            <span className="text-black">{responseData.numberPlate}</span>
          </p>
          <p className="text:lg md:text-xl font-semibold text-gray-500">
            Capacity:{" "}
            <span className="text-black">{responseData.capacity}</span>
          </p>
          <p className="text:lg md:text-xl font-semibold text-gray-500">
            From :{" "}
            <span className="text-black">{responseData.busFrom.city}</span>{" "}
            <br />
            Departure Time:{" "}
            <span className="text-black">
              {responseData.busFrom.departureTime}
            </span>
          </p>
          <p className="text:lg md:text-xl font-semibold text-gray-500">
            To : <span className="text-black">{responseData.busTo.city}</span>{" "}
            <br />
            Arrival Time:{" "}
            <span className="text-black">{responseData.busTo.arrivalTime}</span>
          </p>
        </div>
      </div>
      <hr />
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
