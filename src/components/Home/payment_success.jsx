import React from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { baseURL } from "../../api/axios";
import { useEffect } from "react";

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the session variable is set
    const visitedRequiredPage = sessionStorage.getItem("visitedRequiredPage");
    if (!visitedRequiredPage) {
      // If the session variable is not set, redirect to an error page or show an error message
      navigate("/error");
    }

    // Clear the session variable using cleanup function
    /*  return () => {
      sessionStorage.removeItem("visitedRequiredPage");
    }; */
  }, [navigate]);

  const checkPDFExists = async (url) => {
    try {
      await axios.head(url); //head request similar to get request but only returns headers, That can be used to check if the file exists
      return true;
    } catch (error) {
      return false;
    }
  };
  const handleDownload = async (e) => {
    e.preventDefault();
    const value = sessionStorage.getItem("PDFurl");
    if (value) {
      const url = `${baseURL}/pdf/${value}.pdf`;
      const interval = setInterval(async () => {
        const exists = await checkPDFExists(url);
        if (exists) {
          clearInterval(interval);
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.download = `${value}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          sessionStorage.removeItem("visitedRequiredPage");
          navigate("/");
        }
      }, 1000); // Check every 1 seconds
    }
  };
  return (
    <div className=" md:max-w-[90vw] mx-auto p-6 shadow-2xl max-w-[100vw]">
      <form>
        <h1 className="text-2xl font-semibold mb-4">
          Important Instructions for Your Bus Booking
        </h1>

        <ol className="list-decimal list-inside space-y-4">
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
          <button
            className="bg-orange-500 text-white p-2 rounded-md"
            onClick={handleDownload}
          >
            Download PDF
          </button>
        </div>
      </form>
    </div>
  );
};
export default About;