import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import QRScanner from "./QRScanner";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loading from "../ui/Loading";
import BookingsTable from "./BookingsTable";
import { toast } from "react-toastify";

const VerifyBookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [wantToFetch, setWantToFetch] = useState(false);
  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/booking/${id}`);
        setBookings(response.data);
      } catch (err) {
        setError(err.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [wantToFetch]);

  /*  const handleVerifyBooking = useCallback(
    (bookingId) => {
      const actualBooking = bookings.find(
        (booking) => booking._id === bookingId
      );
      setBookings(


    }
    ,[])  */

  useEffect(() => {
    if (scanResult) {
      const verifyBooking = async () => {
        try {
          const response = await axios.patch(`/booking/${id}`, {
            bookingId: scanResult,
          });
          setWantToFetch(!wantToFetch);
          toast.success("Booking verified successfully");
        } catch (err) {
          toast.error("Something went wrong");
        }
      };
      verifyBooking();
    }
  }, [scanResult]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }
  if (bookings.length === 0) {
    return <p className="text-center text-2xl">No bookings found</p>;
  }

  return (
    <>
      <QRScanner scanResult={scanResult} setScanResult={setScanResult} />
      <BookingsTable bookings={bookings} />
    </>
  );
};

export default VerifyBookings;
