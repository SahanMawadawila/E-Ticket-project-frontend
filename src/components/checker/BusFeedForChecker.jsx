import React from "react";
import CheckerBus from "./CheckerBus";

const BusFeedForChecker = () => {
  return (
    <div className="flex-grow">
      <div className="flex flex-col pl-0 md:p-3 rounded-m gap-2">
        <CheckerBus />
        <CheckerBus />
      </div>
    </div>
  );
};

export default BusFeedForChecker;
