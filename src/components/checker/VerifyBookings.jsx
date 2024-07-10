import React from "react";
import { useParams } from "react-router-dom";
import QRScanner from "./QRScanner";
import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loading from "../ui/Loading";
import BookingsTable from "./BookingsTable";

const VerifyBookings = () => {
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <>
      <QRScanner />
      <BookingsTable bookings={bookings} />
    </>
  );
};

export default VerifyBookings;
