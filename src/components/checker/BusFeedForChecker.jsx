import React from "react";
import CheckerBus from "./CheckerBus";

const BusFeedForChecker = ({ buses }) => {
  return (
    <div className="flex-grow">
      <div className="flex flex-col pl-0 md:p-3 rounded-m gap-2">
        {buses.map((bus) => (
          <CheckerBus key={bus._id} bus={bus} />
        ))}
      </div>
    </div>
  );
};

export default BusFeedForChecker;
