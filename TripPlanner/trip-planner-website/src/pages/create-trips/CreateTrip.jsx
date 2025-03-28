import { Navbar } from "@/components/common/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { selectBudgetOptions, SelectTravelsList } from "@/constants/options";
import React, { useState,useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google"; // Remove if not needed
import { Loading } from "@/components/common/Loading";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { fetchAutocomplete, generateTrip } from "../../service/apiService"; // Importing API service functions
import { debounce } from "lodash"; // Importing lodash for debounce
import { useLocation } from "react-router-dom";

export const CreateTrip = () => {
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null); // Add this state
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);


const location = useLocation();

useEffect(() => {
  if (location.state) {
    handleInputChange("destination", { label: location.state.destination });
    setSelectedDate(location.state.tripDate);
  }
}, [location.state]);


  const handleSelectDate = (date) => {
    const formattedDate = date.toLocaleDateString("en-GB").split("/").join("-"); // Converts to DD-MM-YYYY
    setSelectedDate(formattedDate);
    setCalendarOpen(false);
    handleInputChange("tripDate", formattedDate);
  };

  const [formData, setFormData] = useState({
    location: null,
    destination: null,
    noOfDays: "",
    budget: "",
    traveller: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [autocompleteResults2, setAutocompleteResults2] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Corrected: Removed the extra comma
    }));
  };

  // Debounced autocomplete handler
  const debouncedAutocomplete = useCallback(
    debounce(async (query, setAutocomplete) => {
      if (query.length > 3) {
        try {
          const predictions = await fetchAutocomplete(query); // Call API service
          setAutocomplete(predictions); // Update corresponding autocomplete results
        } catch (error) {
          console.error("Error fetching autocomplete results:", error);
        }
      } else {
        setAutocomplete([]);
      }
    }, 500),
    []
  ); // 500ms debounce

  const handleAddressChange = (event, setValue, setAutocomplete) => {
    const query = event.target.value;
    setValue(query);
    debouncedAutocomplete(query, setAutocomplete);
  };

  const handleSelectPlace = (
    selectedPlace,
    setValue,
    setAutocomplete,
    isDestination = false
  ) => {
    const placeId = selectedPlace.place_id;
    setValue(selectedPlace.structured_formatting.main_text);
    handleInputChange(isDestination ? "destination" : "location", {
      label: selectedPlace.structured_formatting.main_text,
      placeId,
    });
    setAutocomplete([]);
  };

  const handleGenerateTrip = async () => {
    let errorMessage = "";

    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      toast("Please SignIn With Google To create Trip");
      console.log("not login");
      return;
    }

    const parsedUser = JSON.parse(user);
    const userEmail = parsedUser?.email;

    if (formData?.noOfDays > 5 || formData?.noOfDays <= 0) {
      errorMessage = "Number of days should be between 1 and 5.";
    } else {
      if (!formData?.location) errorMessage = "Location is required.";
      else if (!formData?.budget) errorMessage = "Budget is required.";
      else if (!formData?.traveller)
        errorMessage = "Traveller details are required.";
    }

    if (errorMessage) {
      toast(errorMessage);
      return;
    }

    setLoading(true);

    const tripData = {
      source: formData?.location?.label,
      destination: formData?.destination?.label,
      sourcePlaceId: formData?.location?.placeId,
      destinationPlaceId: formData?.destination?.placeId,
      noOfDays: formData?.noOfDays,
      budget: formData?.budget,
      traveller: formData?.traveller,
      tripDate: selectedDate,
      email: userEmail,
    };

    try {
      const response = await generateTrip(tripData);
      console.log("Trip generated successfully:", response);

      // Save trip to context or state
      if (response.data) {
        // Assuming `setTrip` is available in context
        setTrip(response.data);
        navigate("/trip-details", { state: { trip: response.data } });
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("An error occurred while generating the trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
        <h2 className="font-bold text-3xl">
          Tell us your travel preferences ⛱️ 🌴
        </h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>

        <div className="mt-10 flex flex-col gap-10">
          {/* Input Field 1: Location */}
          <div>
            <h2 className="text-xl my-3 font-medium">Where are you now? *</h2>
            <Input
              placeholder="Search for a place"
              value={formData.location?.label || ""}
              onChange={(event) =>
                handleAddressChange(
                  event,
                  (value) => handleInputChange("location", { label: value }),
                  setAutocompleteResults
                )
              }
            />
            {autocompleteResults.length > 0 && (
              <ul className="autocomplete-results">
                {autocompleteResults.map((result, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSelectPlace(
                        result,
                        (value) =>
                          handleInputChange("location", { label: value }),
                        setAutocompleteResults,
                        false
                      )
                    }
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {result.structured_formatting.main_text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Input Field 2: Destination */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              What is the destination of choice? *
            </h2>
            <Input
              placeholder="Search for a place"
              value={formData.destination?.label || ""}
              onChange={(event) =>
                handleAddressChange(
                  event,
                  (value) => handleInputChange("destination", { label: value }),
                  setAutocompleteResults2
                )
              }
            />
            {autocompleteResults2.length > 0 && (
              <ul className="autocomplete-results">
                {autocompleteResults2.map((result, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleSelectPlace(
                        result,
                        (value) =>
                          handleInputChange("destination", { label: value }),
                        setAutocompleteResults2,
                        true
                      )
                    }
                    className="cursor-pointer p-2 hover:bg-gray-200"
                  >
                    {result.structured_formatting.main_text}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Date Picker */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              Select your travel date *
            </h2>
            <div className="relative">
              <Input
                placeholder="Select a date"
                value={selectedDate || ""}
                readOnly
                onClick={() => setCalendarOpen(!calendarOpen)}
              />

              {calendarOpen && (
                <div className="absolute z-10 bg-white shadow-lg p-3 rounded">
                  <Calendar onChange={handleSelectDate} minDate={new Date()} />
                </div>
              )}
            </div>
          </div>

          {/* Number of Days */}
          <div>
            <h2 className="text-xl my-3 font-medium">
              How many days are you planning your trip? *
            </h2>
            <Input
              placeholder="Ex. 3"
              type="number"
              value={formData.noOfDays}
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </div>
        </div>

        {/* Budget Options */}
        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget? *</h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${formData?.budget === item.title && "shadow-lg border-black"}`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Traveller Details */}
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure? *
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                ${
                  formData?.traveller === item.people &&
                  "shadow-lg border-black"
                }`}
                onClick={() => handleInputChange("traveller", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-gray-500 text-sm">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div className="my-10 flex justify-center">
          <Button onClick={handleGenerateTrip} disabled={loading}>
            Generate Trip {loading && <Loading />}
          </Button>
        </div>
      </div>
    </>
  );
};
