import React from "react";
import Card from "./Card";
import { baseURL } from "../../api/axios";

const Feed = ({ buses, noContent, input, date }) => {
  return (
    <div className="flex-grow">
      <ul
        className="flex flex-col pl-0 md:p-3 
        rounded-m gap-2
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
              url={`${baseURL}/bus/busses/${bus.imagesURLs[0]}`}
              date={date}
              actualPrice={bus.actualPrice}
              thisBusPrice={bus.thisBusPrice}
              totalAvailableSeats={bus.totalAvailableSeats}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default Feed;
