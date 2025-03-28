// src/services/apiService.js

import axios from "axios";

// Function to fetch autocomplete suggestions
export const fetchAutocomplete = async (query) => {
  try {
    const response = await axios.get(
      `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${query}&key=${
        import.meta.env.VITE_GOMAPS_API_KEY
      }`
    );
    return response.data.predictions; // Return the predictions array
  } catch (error) {
    console.error("Error fetching data from GoMaps Pro:", error);
    throw error; // You can handle errors here or throw for further handling in the component
  }
};

// Function to generate a trip
export const generateTrip = async (tripData) => {
  try {
    const sanitizedData = JSON.parse(JSON.stringify(tripData));
    console.log("sanitized data:", sanitizedData);
    const response = await axios.post(
      "http://127.0.0.1:8000/generate-trip", // Flask server URL
      sanitizedData
    );
    return response.data; // Return response data
  } catch (error) {
    console.error("Error generating trip:", error);
    throw error; // Handle the error or propagate it
  }
};

// Function to store user's email in Firebase Realtime Database
export const storeUserEmail = async (email) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/store-user-email",
      { email }
    );
    console.log("Email stored successfully:", response.data);
  } catch (error) {
    console.error("Error storing email:", error);
    throw error;
  }
};

// Function to fetch all trips for a user
export const fetchUserTrips = async (email) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/get-trips?email=${email}`
    );
    return response.data.trips;
  } catch (error) {
    console.error("Error fetching user trips:", error);
    throw error;
  }
};

const getUsertrips = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    navigate("/");
    return;
  }

  try {
    console.log("Fetching trips for:", user.email);
    const trips = await fetchUserTrips(user.email);
    console.log("Fetched Trips:", trips);
    setUserTrips(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
};
