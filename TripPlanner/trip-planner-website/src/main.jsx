import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CreateTrip } from "./pages/create-trips/CreateTrip.jsx";
import { Navbar } from "./components/common/Navbar.jsx";
import { Toaster } from "./components/ui/sonner.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ViewTrip } from "./pages/view-trips/ViewTrip.jsx";
import { MyTrips } from "./pages/my-trips/MyTrips.jsx";
import { TripDetails } from "./pages/view-trips/TripDetails.jsx";
import Goa from "./pages/goa/Goa.jsx";
import AndamanIslands from "./pages/AndamanIslands/AndamanIslands.jsx";
import Kerala from "./pages/kerala/Kerala.jsx";
import LehLadakh from "./pages/Ladakh/Ladkh.jsx";
import Manali from "./pages/manali/Manali.jsx";
import Udaipur from "./pages/udaipur/Udaipur.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create-trip",
    element: <CreateTrip />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/my-trips",
    element: <MyTrips />,
  },
  {
    path: "/trip-details",
    element: <TripDetails />,
  },
  {
    path:'/goa',
    element:<Goa/>
  },
  {
    path:'/andamanislands',
    element:<AndamanIslands/>
  },
  {
    path:'/kerala',
    element:<Kerala/>
  },
  {
    path:'/ladakh',
    element:<LehLadakh/>
  },
  {
    path:'/manali',
    element:<Manali/>
  },
  {
    path:'/udaipur',
    element:<Udaipur/>
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_API_KEY}
    >
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
