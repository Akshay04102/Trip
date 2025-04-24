import React, { useState, useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/common/Navbar";

export const TripDetails = () => {
  const location = useLocation();
  const { trip } = location.state || {};
  const [hotels, setHotels] = useState([]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [city, setCity] = useState("");
  const [predictedTransport, setPredictedTransport] = useState("Loading...");

  // Section Refs for scrolling
  const transportRef = useRef(null);
  const hotelRef = useRef(null);
  const placesRef = useRef(null);

  const [activeTab, setActiveTab] = useState("transportation");

  useEffect(() => {
    if (trip) {
      setHotels(trip.hotels || []);
      setNearbyPlaces(trip.nearByPlaces || []);
      setPredictedTransport(trip.predictedMode || "Not Available");
      setCity(trip.destination || "");
    }
  }, [trip]);

  if (!trip) {
    return <p>Loading trip details...</p>;
  }

  // Smooth scrolling to section
  const scrollToSection = (ref, tabName) => {
    setActiveTab(tabName);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Navbar />

      {/* Top Tabs Navigation */}
      <div className="flex justify-center border-b border-gray-200 bg-white sticky top-0 z-10">
        {[
          { name: "Transportation", ref: transportRef },
          { name: "Hotels", ref: hotelRef },
          { name: "Tourist Places", ref: placesRef },
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => scrollToSection(tab.ref, tab.name.toLowerCase())}
            className={`py-3 px-5 text-lg font-semibold ${
              activeTab === tab.name.toLowerCase()
                ? "text-yellow-500 border-b-4 border-yellow-500"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="p-5 sm:px-10 md:px-20 lg:px-40">
        <h2 className="font-bold text-3xl mb-5">Your Trip Details 🌍</h2>
        <p className="text-lg text-gray-600 mb-10">
          Explore your planned trip to {city}. Here are your travel details!
        </p>

        {/* Predicted Mode of Transport */}
        <div className="mb-10 p-5 border rounded-lg bg-gray-100">
          <h3 className="text-xl font-semibold">
            🚗 Predicted Mode of Transport
          </h3>
          <p className="text-lg font-bold mt-2">{predictedTransport}</p>
        </div>

        {/* Transportation Section */}
        <div ref={transportRef} className="mb-10">
          <h3 className="text-2xl font-bold mb-3">
            Available Transport Options 🚆✈️🚌
          </h3>
          {trip.transport_options &&
            Object.entries(trip.transport_options).map(([mode, options]) => (
              <div key={mode} className="mb-5">
                <h4 className="text-xl font-semibold mb-2 capitalize">
                  {mode}
                </h4>
                {options.length === 0 ? (
                  <p>No {mode} available</p> // Message if no transport options are available
                ) : (
                  <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border px-4 py-2 text-center">
                          <span
                            role="img"
                            aria-label="departure"
                            className="inline-block mr-1"
                          >
                            ⏰
                          </span>
                          Departure
                        </th>
                        <th className="border px-4 py-2 text-center">
                          <span
                            role="img"
                            aria-label="duration"
                            className="inline-block mr-1"
                          >
                            ⏳
                          </span>
                          Duration
                        </th>
                        <th className="border px-4 py-2 text-center">
                          <span
                            role="img"
                            aria-label="price"
                            className="inline-block mr-1"
                          >
                            💵
                          </span>
                          Price
                        </th>
                        <th className="border px-4 py-2 text-center">
                          <span
                            role="img"
                            aria-label="date"
                            className="inline-block mr-1"
                          >
                            📅
                          </span>
                          Date
                        </th>
                        <th className="border px-4 py-2 text-center">
                          <span
                            role="img"
                            aria-label="route"
                            className="inline-block mr-1"
                          >
                            📍
                          </span>
                          Route
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {options.map((option, index) => (
                        <tr key={index} className="even:bg-gray-50">
                          <td className="border px-4 py-2 text-center">
                            {option.departure_time || option.departure}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {option.duration}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {option.bus_price ||
                              option.flight_price ||
                              option.train_price}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {option.train_date ||
                              option.flight_date ||
                              option.bus_arrival_date}
                          </td>
                          <td className="border px-4 py-2 text-center">
                            {option.source} → {option.destination}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
        </div>

        {/* Hotel Recommendations */}
        <div ref={hotelRef} className="mb-10">
          <h3 className="text-2xl font-bold mb-3">Recommended Hotels 🏨</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels.length ? (
              hotels.map((hotel, index) => (
                <Card
                  key={index}
                  className="border-foreground/20 p-3 hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={hotel.image_url}
                    className="h-48 w-full object-cover rounded-lg"
                    alt={hotel.name}
                  />
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl font-semibold text-primary/80">
                      {hotel.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700">
                    <p>
                      ⭐ <strong>Rating:</strong> {hotel.rating}
                    </p>
                    <p>
                      📍 <strong>Address:</strong> {hotel.vicinity}
                    </p>
                    <Link
                      to={
                        hotel.googleMapsUri ||
                        `https://www.google.com/maps/search/${hotel.name},${city}`
                      }
                      target="_blank"
                    >
                      <Button className="w-full mt-3">View on Map</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No hotels available.</p>
            )}
          </div>
        </div>

        {/* Nearest Tourist Places */}
        <div ref={placesRef} className="mb-10">
          <h3 className="text-2xl font-bold mb-3">Nearby Tourist Places 📍</h3>
          {nearbyPlaces.length ? (
            Object.entries(
              nearbyPlaces.reduce((acc, place, index) => {
                const day = `Day ${Math.floor(index / 3) + 1}`;
                if (!acc[day]) acc[day] = [];
                acc[day].push(place);
                return acc;
              }, {})
            ).map(([day, places]) => (
              <div key={day} className="mb-5">
                <h4 className="text-xl font-bold mb-2">{day}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {places.map((place, index) => (
                    <Card
                      key={index}
                      className="border-foreground/20 p-3 hover:scale-105 transition-transform duration-300"
                    >
                      <img
                        src={place.image_url}
                        className="h-48 w-full object-cover rounded-lg"
                        alt={place.name}
                      />
                      <CardHeader className="text-center">
                        <CardTitle className="text-xl font-semibold text-primary/80">
                          {place.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-gray-700">
                        <p>
                          ⭐ <strong>Rating:</strong> {place.rating}
                        </p>
                        <p>
                          📍 <strong>Address:</strong> {place.vicinity}
                        </p>
                        <Link
                          to={
                            place.googleMapsUri ||
                            `https://www.google.com/maps/search/${place.name},${city}`
                          }
                          target="_blank"
                        >
                          <Button className="w-full mt-3">View on Map</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No nearby places available.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TripDetails;
