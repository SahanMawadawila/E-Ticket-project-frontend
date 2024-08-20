import React from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import subtractTime from "../../utils/subtractTime";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import formatNumber from "../../utils/formatNumber";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const BookingForm = () => {
  const REGEX_TEL = /^\d{10}$/; // Matches exactly 10 digits
  const REGEX_ID = /^\d+(v)?$/; // Matches any number of digits, optionally followed by 'v'
  const { id, selectedSeats } = useParams();
  const { searchResults, input, date } = useContext(DataContext);
  const responseData = searchResults.find((result) => result._id === id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: "",
    email: "",
    phone: "",
  });
  const [idError, setIdError] = useState(false);
  const [idFocus, setIdFocus] = useState(false);

  const [phoneError, setPhoneError] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [submitError, setSubmitError] = useState(true);

  //new code start
  const makePayment = async (e) => {
    e.preventDefault();
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );
    const booking = {
      ...formData,
      busId: id,
      seats: selectedSeats,
      date: date.format("YYYY-MM-DD"),
      ...input,
      departureTime: responseData.searchedDepartureTime,
      arrivalTime: responseData.searchedArrivalTime,
      arrivalDate:
        responseData.searchedArrivalTime < responseData.searchedDepartureTime
          ? dayjs(date).add(1, "day").format("YYYY-MM-DD")
          : date.format("YYYY-MM-DD"),
      numberPlate: responseData.numberPlate,
      busName: responseData.busName,
      duration: subtractTime(
        responseData.searchedDepartureTime,
        responseData.searchedArrivalTime
      ),
      busFrom: responseData.busFrom.city,
      busTo: responseData.busTo.city,
      routeNumber: responseData.routeNumber,
      price: responseData.thisBusPrice * selectedSeats.split(",").length,
      busDepartureTime: responseData.busFrom.departureTime,
    };
    try {
      const response = await axios.post("/booking", booking);
      const session = await response.data;
      const result = stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (REGEX_ID.test(formData.id)) {
      setIdError(false);
    } else {
      setIdError(true);
    }
  }, [formData.id]);

  useEffect(() => {
    if (REGEX_TEL.test(formData.phone)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  }, [formData.phone]);

  useEffect(() => {
    if (!idError && !phoneError && formData.email !== "") {
      setSubmitError(false);
    } else {
      setSubmitError(true);
    }
  }, [idError, phoneError, formData.email]);

  return (
    <div className=" md:max-w-[90vw] mx-auto p-6 shadow-2xl max-w-[100vw]">
      <form>
        <p className="text-center bg-orange-500 text-white font-bold rounded-md ">
          Booking Form
        </p>
        <p className="text-gray-600 font-semibold" style={{ width: "150px" }}>
          Details
        </p>
        <div className="flex flex-wrap justify-between gap-8 md:gap-0">
          <div className="flex flex-col justify-center ">
            <div>
              <p className="text-gray-600 mb-0 ">Departure From :</p>
              <p className="text-gray-900 font-semibold ">{input.from}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Date :</p>
              <p className="text-gray-900 font-semibold ">
                {date.format("YYYY-MM-DD")}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">
                {`Departure Time `} <br />
                {`from ${input.from} :`}
              </p>
              <p className="text-gray-900 font-semibold ">
                {responseData.searchedDepartureTime}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <img src="../../images/arrow.png" alt="" />
            <div>
              <p className="text-gray-600 mt-3 mb-0">Duration</p>
              <p className="text-gray-900 font-semibold ">
                {subtractTime(
                  responseData.searchedDepartureTime,
                  responseData.searchedArrivalTime
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div>
              <p className="text-gray-600 mb-0 ">Arrival To :</p>
              <p className="text-gray-900 font-semibold ">{input.to}</p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Date :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.searchedArrivalTime <
                responseData.searchedDepartureTime
                  ? dayjs(date).add(1, "day").format("YYYY-MM-DD")
                  : date.format("YYYY-MM-DD")}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">
                {" "}
                {`Arrival Time `} <br /> {`to ${input.to} :`}
              </p>
              <p className="text-gray-900 font-semibold ">
                {responseData.searchedArrivalTime}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div>
              <p className="text-gray-600 mb-0 ">Route Number :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.routeNumber}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Bus From :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busFrom.city}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Bus to :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busTo.city}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div>
              <p className="text-gray-600 mb-0 ">Bus/Company :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.busName}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-0 ">Number Plate :</p>
              <p className="text-gray-900 font-semibold ">
                {responseData.numberPlate}
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-0 ">Selected seats :</p>
              <p className="text-gray-900 font-semibold ">{selectedSeats}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-600 font-semibold" style={{ width: "150px" }}>
          User Info :
        </p>
        <div className="flex flex-wrap justify-between w-full  ">
          <div className="w-full md:w-auto">
            {idFocus && idError && (
              <p className="text-red-500 mb-0 w-full ">Invalid ID</p>
            )}
            <p className="text-gray-600 mb-0 ">ID :</p>
            <input
              type="text"
              className="border border-gray-300 rounded-md p-1 w-full md:w-[250px] "
              required
              placeholder="2001908308023"
              onChange={(e) => {
                setFormData({ ...formData, id: e.target.value });
              }}
              value={formData.id}
              onFocus={() => setIdFocus(true)}
              onBlur={() => setIdFocus(false)}
            />
          </div>

          <div className="w-full md:w-auto">
            <p className="text-gray-600 mb-0 ">Email :</p>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-1 w-full md:w-[250px]"
              required
              placeholder="sahan123@gmail.com"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              value={formData.email}
            />
          </div>

          <div className="w-full md:w-auto">
            {phoneFocus && phoneError && (
              <p className="text-red-500 mb-0 w-full ">Invalid phone number</p>
            )}
            <p className="text-gray-600 mb-0 w-full ">Phone :</p>
            <input
              type="tel"
              className="border border-gray-300 rounded-md p-1 w-full md:w-[250px]"
              required
              placeholder="0771234567"
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
              value={formData.phone}
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
          </div>
        </div>
        <div className="flex justify-between items-end">
          <div className="flex">
            <img src="../../images/visaCard.png" alt="" className="w-10 h-10" />
            <img
              src="../../images/masterCard.png"
              alt=""
              className="w-10 h-10"
            />
            <p className="font-bold text-xl " style={{ color: "#063970" }}>
              &nbsp; Rs.{" "}
              {formatNumber(
                responseData.thisBusPrice * selectedSeats.split(",").length
              )}
            </p>
          </div>
          <button
            className="bg-orange-500 text-white p-2 rounded-md mt-4"
            disabled={submitError}
            onClick={/*handleSubmit*/ makePayment}
          >
            Book Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
