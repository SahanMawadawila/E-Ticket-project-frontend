import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { baseURL } from "../../api/axios";
import { useEffect } from "react";
//import Error from "./Error";
//import useState from "react";

const About = () => {
  const navigate = useNavigate();
  //const [loading, setLoading] = useState(flase);

  useEffect(() => {
    // Check if the session variable is set
    const visitedRequiredPage = localStorage.getItem("visitedRequiredPage");
    if (!visitedRequiredPage) {
      // If the session variable is not set, redirect to an error page or show an error message
      navigate("/error");
    }

    // Clear the session variable using cleanup function
    /*  return () => {
      sessionStorage.removeItem("visitedRequiredPage");
    }; */
  }, [navigate]);

  const value = localStorage.getItem("PDFurl");
  localStorage.setItem("success", "true");

  return (
    <div className=" md:max-w-[90vw] mx-auto p-6 max-w-[100vw] md:text-base text-xs">
      <form>
        <h1 className="text-2xl font-semibold mb-4">
          Important Instructions for Your Bus Booking
        </h1>

        <ol className="list-decimal list-outside space-y-4">
          <li>
            The QR code is located in the right side of this PDF document.
          </li>
          <li>
            Keep this document secure and do not share your QR code with others.
          </li>
          <li>
            Ensure you have this document with you before boarding the bus.
          </li>
          <li>
            Present the QR code to the bus staff at check-in for booking
            verification.
          </li>
        </ol>

        <p className="mt-4 text-sm text-gray-600">
          If you have any issues with your QR code or need further assistance,
          please contact our customer support.
        </p>
        <div className="flex justify-center mt-4">
          <a
            href={`${baseURL}/pdf/${value}.pdf`}
            target="_blank"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            Download PDF
          </a>
        </div>
      </form>
    </div>
  );
};
export default About;
