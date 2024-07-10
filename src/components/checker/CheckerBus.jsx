import React from "react";

const CheckerBus = () => {
  return (
    <div>
      <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg mb-2">
        <h2 className="text-xl font-bold">Route #02</h2>
      </div>
      <div className="flex justify-between">
        <img src="../../images/busPhoto.png" alt="" className="h-24 w-auto" />
        <div className="flex flex-col justify-center ">
          <div>
            <p className="text-gray-600 mb-0 ">Departure From :</p>
            <p className="text-gray-900 font-semibold ">Colombo</p>
          </div>

          <div>
            <p className="text-gray-600 mb-0 ">Date :</p>
            <p className="text-gray-900 font-semibold ">2022-02-02</p>
          </div>

          <div>
            <p className="text-gray-600 mb-0 ">Departure Time:</p>

            <p className="text-gray-900 font-semibold ">05:00 PM</p>
          </div>
        </div>

        <div className="flex flex-col justify-center ">
          <div>
            <p className="text-gray-600 mb-0 ">Departure From :</p>
            <p className="text-gray-900 font-semibold ">Colombo</p>
          </div>

          <div>
            <p className="text-gray-600 mb-0 ">Date :</p>
            <p className="text-gray-900 font-semibold ">2022-02-02</p>
          </div>

          <div>
            <p className="text-gray-600 mb-0 ">Departure Time:</p>

            <p className="text-gray-900 font-semibold ">05:00 PM</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
          Check
        </button>
      </div>

      <div className="mt-2 bg-orange-500 py-2 rounded-b-lg"></div>
    </div>
  );
};

export default CheckerBus;
