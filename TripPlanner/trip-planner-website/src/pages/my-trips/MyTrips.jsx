import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { MyTripCard } from "@/components/user-trip/MyTripCard";
import { fetchUserTrips } from "../../service/apiService";

export const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    try {
      const trips = await fetchUserTrips(user.email);
      setUserTrips(Object.values(trips || {}));
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  useEffect(() => {
    getUserTrips();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-2xl">My Trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {userTrips?.length > 0
            ? userTrips.map((item, index) => (
                <MyTripCard key={index} item={item} index={index} />
              ))
            : [1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="h-[250px] w-full bg-slate-200 animate-pulse rounded-md"
                ></div>
              ))}
        </div>
      </div>
    </div>
  );
};
