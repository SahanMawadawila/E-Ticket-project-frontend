import React from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/completebooking");
      alert("Booking has been successfully made");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" md:max-w-[90vw] mx-auto p-6 shadow-2xl max-w-[100vw]">
      <form>
          <h1 className="text-2xl font-semibold mb-4">Important Instructions for Your Bus Booking</h1>

          <ol className="list-decimal list-inside space-y-4">
              <li>The QR code is located in the right side of this PDF document.</li>
              <li>Keep this document secure and do not share your QR code with others.</li>
              <li>Ensure you have this document with you before boarding the bus.</li>
              <li>Present the QR code to the bus staff at check-in for booking verification.</li>
          </ol>

          <p className="mt-4 text-sm text-gray-600">
              If you have any issues with your QR code or need further assistance, please contact our customer support.
          </p>
          <div className="flex justify-center mt-4">
            <button
                className="bg-orange-500 text-white p-2 rounded-md"
                onClick={handleSubmit}
            >
                Send the Ticket to Email
            </button>
        </div>
      </form>
    </div>
  );
};
export default About;