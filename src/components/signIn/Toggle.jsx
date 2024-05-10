import React, { useState } from "react";

const Toggle = ({ onToggle }) => {
  const [selected, setSelected] = useState(true);

  const toggleSelected = () => {
    setSelected(!selected);
    onToggle();
  };

  return (
    <div className="relative w-full rounded-md border h-10 p-1 bg-gray-200">
      <div className="relative w-full h-full flex items-center">
        <div
          onClick={toggleSelected}
          className="w-full flex justify-center text-gray-400 cursor-pointer"
        >
          <button>Checker</button>
        </div>
        <div
          onClick={toggleSelected}
          className="w-full flex justify-center text-gray-400 cursor-pointer"
        >
          <button>Admin</button>
        </div>
      </div>
      <span
        className={`bg-gray-700 shadow text-sm flex items-center justify-center w-1/2 rounded-full h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute ${
          selected ? "" : "left-1/2 -ml-1 "
        }`}
      ></span>
    </div>
  );
};

export default Toggle;
