import React from "react";
import BookingsTable from "./BookingTable";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import Loading from "../ui/Loading";
import axios from "../../api/axios";
import BookingFrozeTable from "./BookingFrozeTable";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import ConfirmModal from "../ui/ConfirmModal";
import { toast } from "react-toastify";

const BookingDetails = () => {
  const [date, setDate] = useState(dayjs().add(4, "day"));
  const { id } = useParams();
  //console.log(id);
  const fetcher = async () => {
    const [response1, response2] = await Promise.all([
      axios.get(`/booking/admin/${id}`),
      axios.get(`/booking/freeze/${id}`),
    ]);
    return { bookings: response1.data, froze: response2.data };
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const {
    data: swrData,
    isLoading,
    error,
    mutate,
  } = useSWR(`/booking/admin/${id}`, fetcher);
  const handleFreezeADay = async () => {
    try {
      const response = await axios.post(`/booking/freeze/${id}`, {
        date: date.format("YYYY-MM-DD"),
      });

      mutate();

      toast.success(`${response.data.message}`);
    } catch (err) {
      toast.error(`${err.response.data.message}`);
    }

    handleClose();
  };

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-center text-red-500 font-bold text-2xl">
        {error.message}
      </div>
    );
  return (
    <div className=" mx-auto p-6 shadow-2xl max-w-[100vw] ">
      <BookingsTable bookings={swrData.bookings} />

      <p className="text-start text-2xl font-bold text-blue-950 pt-3">
        Booking Froze details:
      </p>
      <BookingFrozeTable bookings={swrData.froze} />
      <p className="text-start text-2xl font-bold text-blue-950 pt-3">
        Freeze a day:
      </p>

      <div className="flex items-center">
        <DateRangeIcon />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disablePast
            value={date}
            onChange={(newValue) => {
              setDate(newValue);
            }}
            minDate={dayjs().add(4, "day")}
            sx={{ width: 200 }}
          />
        </LocalizationProvider>

        <button
          className="bg-blue-900 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded ml-3"
          onClick={handleShow}
        >
          Freeze
        </button>
      </div>

      <ConfirmModal
        show={show}
        handleClose={handleClose}
        handleYes={handleFreezeADay}
      >
        `Are you sure you want to freeze for {date.format("YYYY-MM-DD")} ?`
      </ConfirmModal>
    </div>
  );
};

export default BookingDetails;
