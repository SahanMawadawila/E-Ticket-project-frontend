import React from "react";
import { HashLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <HashLoader color="#158ecd" size={150} />
    </div>
  );
};

export default Loading;
