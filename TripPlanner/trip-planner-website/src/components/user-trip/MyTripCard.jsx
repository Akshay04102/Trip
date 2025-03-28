import React from "react";
import { Link } from "react-router-dom";

export const MyTripCard = ({ item, index }) => {
  const dummyImageUrl =
    "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJpcHN8ZW58MHx8MHx8fDA%3D";

  return (
    <Link to={`/view-trip/${index}`} state={{ trip: item }}>
      <div className="border rounded-lg hover:scale-105 transition-all hover:shadow-md h-[250px]">
        <img
          src={dummyImageUrl}
          className="rounded-t-md object-cover w-full h-[130px]"
          alt="Trip Destination"
        />
        <div className="p-2">
          <h2 className="font-bold text-lg">{item?.destination || "Unknown Destination"}</h2>
          <h2 className="text-sm text-gray-500">
            {item?.number_of_days} Days trip with {item?.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};
