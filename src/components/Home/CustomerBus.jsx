// BusScheduleCard.js

import React from "react";

const CustomerBus = () => {
  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-lg my-4">
      <div className="bg-blue-500 text-white text-center py-2">
        <h2 className="text-xl font-bold">Route # 32</h2>
      </div>
      <div className="p-4 flex flex-wrap">
        <div className="flex items-center mb-4">
          <img
            src="path_to_bus_image.jpg" // replace with the actual image path
            alt="Bus"
            className="w-24 h-24 object-cover rounded-lg"
          />
          <div className="ml-4">
            <h3 className="text-lg font-semibold">Departure</h3>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Arrival</h3>
          <p className="text-gray-600">KATARAGAMA</p>
          <p className="text-gray-600">2024-05-30</p>
          <p className="text-gray-600">06:00</p>
          <p className="text-gray-600">Duration: 06:00 Hours</p>
        </div>

        <div className="mb-4 flex justify-between">
          <div>
            <h3 className="text-lg font-semibold">Available Seats</h3>
            <p className="text-gray-600">29</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">Depot Name</p>
            <p className="text-gray-600">Rathmalana</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Rs. 1,104.50</p>
            <button className="bg-orange-500 text-white px-4 py-2 rounded-md mt-2">
              Book Seat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerBus;
