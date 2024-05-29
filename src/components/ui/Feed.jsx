import React from "react";
import Card from "./Card";
import { baseURL } from "../../api/axios";

const Feed = ({ buses, noContent, input }) => {
  return (
    <div className="flex-grow">
      <ul
        className="flex flex-col pl-0 md:p-3 
      border-2 border-gray-200 rounded-m gap-2
      "
        style={{ listStyleType: "none" }}
      >
        {noContent ? (
          <h1>No Buses Found</h1>
        ) : (
          buses.map((bus) => (
            <Card
              busId={bus._id}
              key={bus._id}
              routeNumber={bus.routeNumber}
              busFrom={bus.busFrom}
              busTo={bus.busTo}
              numberPlate={bus.numberPlate}
              busName={bus.busName}
              input={input}
              searchedDepartureTime={bus.searchedDepartureTime}
              searchedArrivalTime={bus.searchedArrivalTime}
              url={`${baseURL}/bus/${bus.imagesURLs[0]}`}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default Feed;
