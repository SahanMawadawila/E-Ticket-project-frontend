import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Page Not Found</p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Go Back to Home
        </button>
      </div>
    </div>
  );
};

export default Error;
