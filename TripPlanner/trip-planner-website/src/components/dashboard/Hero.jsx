import React,{ useState }  from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import backgroundImage from "@/assets/travel4.png";
import goa from "@/assets/Goa.jpg";
import manali from "@/assets/Manali.jpg";
import kerala from "@/assets/kerala.jpg";
import Udaipur from "@/assets/udaipur.jpg";
import Andaman from "@/assets/Andaman.jpg";
import Lehdakh from "@/assets/Lehdakh.jpg";
import { FaMapMarkerAlt, FaPlane, FaClipboardList, FaSuitcase, FaCamera } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaApple, FaGooglePlay } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion"; 
import { useNavigate } from "react-router-dom";


const trendingDestinations = [
  {
    name: "Goa",
    image: goa,
    description: "Enjoy the sun, sand, and nightlife of Goa.",
    price: "₹15,000 - ₹50,000",
    rating: "⭐⭐⭐⭐⭐ (4.8)",
    path: '/goa'
  },
  {
    name: "Manali",
    image: manali,
    description: "A perfect winter escape in the Himalayas.",
    price: "₹10,000 - ₹40,000",
    rating: "⭐⭐⭐⭐ (4.6)",
    path: '/manali'
  },
  {
    name: "Kerala",
    image: kerala,
    description: "Experience backwaters and lush greenery.",
    price: "₹12,000 - ₹45,000",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    path: '/kerala'
  },
  {
    name: "Udaipur",
    image: Udaipur,
    description: "Explore forts and royal heritage in Udaipur.",
    price: "₹8,000 - ₹35,000",
    rating: "⭐⭐⭐⭐ (4.5)",
    path: '/udaipur'
  },
  {
    name: "Andaman Islands",
    image: Andaman,
    description: "Pristine beaches and scuba diving paradise.",
    price: "₹20,000 - ₹70,000",
    rating: "⭐⭐⭐⭐⭐ (4.7)",
    path: '/andamanislands'
  },
  {
    name: "Leh Ladakh",
    image: Lehdakh,
    description: "A breathtaking road trip adventure.",
    price: "₹25,000 - ₹80,000",
    rating: "⭐⭐⭐⭐⭐ (4.9)",
    path: '/ladakh'
  },
];

const steps = [
  { id: 1, title: 'Choose a Destination', icon: <FaMapMarkerAlt />, description: 'Pick your dream location and start planning!', color: 'bg-blue-500' },
  { id: 2, title: 'Book Flights & Hotels', icon: <FaPlane />, description: 'Find the best deals and book your stay.', color: 'bg-green-500' },
  { id: 3, title: 'Plan Activities', icon: <FaClipboardList />, description: 'Make an itinerary for must-visit places.', color: 'bg-purple-500' },
  { id: 4, title: 'Pack Smart', icon: <FaSuitcase />, description: 'Pack essentials to travel hassle-free.', color: 'bg-yellow-500' },
  { id: 5, title: 'Enjoy & Share Memories', icon: <FaCamera />, description: 'Capture and share your best moments.', color: 'bg-red-500' }
];

const stepColors = ["#FFA69E", "#84DCC6", "#A29BFE", "#FFB6B9", "#FFD166"];



export const Hero = () => {

  const [destination, setDestination] = useState("");  // Added state for destination
  const [tripDate, setTripDate] = useState("");  // Added state for tripDate
  const navigate = useNavigate();

  
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0'); // Ensure 2 digits
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};


const handleStartPlanning = () => {
  const formattedDate = formatDate(tripDate);  // Format the date
  navigate("/create-trip", { state: { destination, tripDate: formattedDate } });
};


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <>
     {/* Hero Section */}
<div
  className="flex flex-col items-center justify-center px-6 md:px-20 gap-10 relative pt-20"
  style={{
    height: "100vh",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: "#0A2540",
  }}
>
  {/* Glassmorphic Card */}
  <div className="bg-white/40 backdrop-blur-xl p-10 rounded-3xl shadow-2xl flex flex-col items-center space-y-8 w-full md:w-3/4 lg:w-2/3">

    {/* Main Heading */}
    <h1 className="text-5xl font-extrabold text-center text-[#0A2540] leading-tight">
      Plan Your <span className="text-[#FF6B6B]">Dream Trip</span> ✈️
    </h1>

    {/* New Subheading */}
    <p className="text-gray-800 text-lg text-center font-medium max-w-2xl">
      ✨ Say goodbye to travel stress! Get personalized itineraries, exclusive deals, and AI-powered suggestions—all in one place. 🚀
    </p>

    {/* Expanded Form Section */}
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
      <input 
        type="text" 
        placeholder="🌍 Where do you want to go?" 
        className="w-full px-5 py-4 rounded-lg border-none text-gray-900 shadow-md focus:ring-2 focus:ring-blue-600"
        onChange={(e) => setDestination(e.target.value)}
      />
      <input 
        type="date" 
        className="w-full px-5 py-4 rounded-lg border-none text-gray-900 shadow-md focus:ring-2 focus:ring-blue-600"
        onChange={(e) => setTripDate(e.target.value)}
      />
      <Button 
        className="w-full px-6 py-7 bg-[#1A73E8] hover:bg-[#0F5CC3] text-white font-semibold rounded-lg shadow-lg transition-all"
        onClick={handleStartPlanning}
      >
        Start Planning 🚀
      </Button>
    </div>

    {/* CTA Button */}
    {/* <Link to="/create-trip">
      <Button className="px-8 py-4 bg-[#FF6B6B] hover:bg-[#E04F4F] text-white font-bold rounded-lg shadow-xl">
        Get Started
      </Button>
    </Link> */}
    <br/>
    <br/>
  </div>
</div>


{/* Trending Destinations Section */}
<div className="my-20 px-10 relative">
  <h2 className="text-5xl font-extrabold text-center mb-8 text-[#0A2540] animate-fadeIn">
    ✨ Explore <span className="text-[#FF6B6B]">Trending Destinations</span> ✨
  </h2>

  <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
    Discover the most loved travel spots around the world, handpicked for an unforgettable journey! 🌍✈️
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {trendingDestinations.map((place, index) => {
      const navigate = useNavigate(); // Initialize navigate for each card

      return (
        <motion.div 
          key={index} 
          className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-xl transition-all transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate(place.path)} // Navigate to the path on click
        >
          {/* Destination Image */}
          <img 
            src={place.image} 
            alt={place.name} 
            className="w-full h-80 object-cover rounded-3xl"
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
          
          {/* Destination Info */}
          <div className="absolute bottom-6 left-6 text-white flex flex-col">
            <h3 className="font-bold text-3xl">{place.name}</h3>
            <p className="text-sm text-gray-300">{place.description}</p>
          </div>

          {/* Price & Rating - Positioned at Opposite End */}
          <div className="absolute top-6 right-6 text-right text-white">
            <p className="bg-black/60 text-sm px-3 py-1 rounded-lg shadow-md">
              {place.price}
            </p>
            <p className="mt-2 text-yellow-400 font-semibold">{place.rating}</p>
          </div>

          {/* Hover Button */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
          >
            <button className="px-6 py-2 bg-[#FF6B6B] hover:bg-[#E04F4F] text-white font-semibold rounded-lg shadow-lg transition-all">
              Discover More ➡️
            </button>
          </motion.div>
        </motion.div>
      );
    })}
  </div>
</div>

{/* Why Travel With Us - Premium & Aesthetic Section */}
<div className="relative my-20 px-10 py-16 bg-gradient-to-r from-[#1A1A2E] to-[#16213E] shadow-xl rounded-3xl">
  {/* Soft Floating Glow Effect */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,107,107,0.15),_transparent)]"></div>

  {/* Heading */}
  <h2 className="text-5xl font-extrabold text-center mb-8 text-white animate-fadeIn">
    Why <span className="text-[#FF6B6B]">Travel With Us?</span>
  </h2>

  <p className="text-center text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
    We redefine travel with seamless bookings, premium deals, and top-notch security for your perfect trip.
  </p>

  {/* Features Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
    {[
      { icon: "✈️", title: "Hassle-Free Bookings", desc: "Plan your trip in minutes with our seamless platform." },
      { icon: "💰", title: "Exclusive Discounts", desc: "Unlock the best prices on flights, hotels, and tours." },
      { icon: "🔒", title: "100% Secure Payments", desc: "Your transactions are protected with high-end encryption." },
      { icon: "🌍", title: "Global Destinations", desc: "Explore breathtaking locations worldwide with ease." },
    ].map((item, index) => (
      <div 
        key={index} 
        className="relative flex flex-col items-center text-center p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-[0_4px_30px_rgba(255,107,107,0.3)] border border-white/20 group hover:scale-105 transition-all duration-300"
      >
        {/* Neon Glow & Floating Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,107,107,0.1),_transparent)] opacity-20 group-hover:opacity-40 transition-all rounded-3xl"></div>

        {/* Animated Icon with Glow */}
        <div className="text-6xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
          {item.icon}
        </div>

        {/* Title & Description */}
        <h3 className="font-bold text-2xl mt-4 text-white group-hover:text-[#FF6B6B] transition-all">
          {item.title}
        </h3>
        <p className="text-gray-300 mt-2 group-hover:text-gray-200 transition-all">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</div>



<div className="relative bg-gradient-to-b from-[#FFFBF5] to-[#FCEADE] py-20 px-10">
  <h2 className="text-5xl font-extrabold text-center mb-10 text-[#333] animate-fadeIn">
    Plan Your <span className="text-[#FF6B6B]">Perfect Trip</span>
  </h2>
  <p className="text-center text-gray-600 text-lg mb-12 max-w-3xl mx-auto">
    Follow these simple steps to make your travel seamless and enjoyable! ✨
  </p>
  
  <div className="relative max-w-4xl mx-auto">
    {/* Vertical Timeline Line */}
    <div className="absolute left-5 top-0 h-full border-l-4 border-dashed border-[#FFB6B9]"></div>

    {steps.map((step, index) => (
      <motion.div 
        key={step.id} 
        className="flex items-center mb-10 relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        {/* Step Icon with New Colors */}
        <div 
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg text-white absolute -left-6 transition-transform hover:scale-110`}
          style={{
            backgroundColor: stepColors[index % stepColors.length], // Cycles through colors
            boxShadow: `0 0 10px ${stepColors[index % stepColors.length]}`,
          }}
        >
          {step.icon}
        </div>

        {/* Step Card */}
        <div className="ml-12 bg-white shadow-xl rounded-2xl p-6 w-full border border-[#FFD2D2] hover:shadow-2xl transition-all">
          <h3 className="text-xl font-semibold text-[#FF6B6B]">{step.title}</h3>
          <p className="text-gray-700 mt-1">{step.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</div>


{/* Feedback Section */}
<div className="bg-gradient-to-b from-white to-blue-50 py-20 px-6 md:px-20">
  <h2 className="text-4xl font-extrabold text-center text-[#0A2540] mb-10">
    What Our Travelers Say 💬
  </h2>
  
  <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    {[
      { name: "Aarav Sharma", review: "An amazing experience! The planning was seamless and stress-free. ✨" },
      { name: "Sanya Mehta", review: "Loved how easy it was to organize my itinerary. Highly recommended! 💕" },
      { name: "Rohan Verma", review: "Great service! Everything was well-organized and effortless. 🌍" }
    ].map((feedback, index) => (
      <div 
        key={index} 
        className="bg-white shadow-lg p-6 rounded-2xl text-center border-l-4 border-[#FF6B6B]"
      >
        <p className="text-gray-700 italic">"{feedback.review}"</p>
        <h4 className="mt-4 text-[#0A2540] font-semibold">{feedback.name}</h4>
      </div>
    ))}
  </div>
</div>

<div className="bg-gradient-to-b from-blue-100 to-white py-16 px-10 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-[#0A2540]">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-3xl font-extrabold">TravelEase ✈️</h2>
          <p className="text-gray-600 mt-3 text-sm">
            Your journey, our priority. Explore the world with ease and comfort.
          </p>
          <p className="text-gray-500 text-xs mt-2">Contact: support@travelease.com</p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          {["Home", "Destinations", "About Us", "Blog", "Contact"].map((link) => (
            <a key={link} href="#" className="block text-gray-600 hover:text-[#FF6B6B] transition">
              {link}
            </a>
          ))}
        </div>

        {/* Social Media */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
          <div className="flex space-x-4">
            {[{ icon: FaFacebook, color: "#1877F2" }, { icon: FaTwitter, color: "#1DA1F2" }, { icon: FaInstagram, color: "#E4405F" }, { icon: FaLinkedin, color: "#0077B5" }].map((social, index) => (
              <a key={index} href="#" className="text-gray-500 hover:text-[#FF6B6B] transition">
                <social.icon className="text-2xl" style={{ color: social.color }} />
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter & App Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">Subscribe</h3>
          <div className="flex">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 w-full border rounded-l-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            <button className="bg-[#FF6B6B] px-4 py-2 rounded-r-lg text-white font-semibold hover:bg-[#E04F4F] transition">Join</button>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800">Get Our App</h3>
          <div className="flex space-x-2">
            <a href="#" className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition">
              <FaApple className="text-xl mr-2" /> iOS
            </a>
            <a href="#" className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-500 transition">
              <FaGooglePlay className="text-xl mr-2" /> Android
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 mt-10"></div>

      {/* Copyright Text */}
      <div className="mt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} TravelEase. All rights reserved.
      </div>
    </div>

    </>
  );
};