import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Udaipur.css";
import heroImage from "./Udaipur.jpg";
import cityPalace from "./city_palace.webp";
import lakePichola from "./lake-pichola.jpeg";
import sajjangarh from "./sajjangarh.jpg";
import dalBaati from "./dal-baati.jpg";
import gatteKiSabzi from "./gatte-ki-sabzi.jpg";
import laalMaas from "./laal-maas.jpg";
import ghewar from "./ghewar.png";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";

const Udaipur = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

        const navigate = useNavigate();
        const handleStartPlanning = () => {
          const destination = "Udaipur"; // Declare the destination
          navigate("/create-trip", { state: { destination } }); // Use navigate to go to the new page
        };
      

  return (

            <div>
        
              <Navbar/>
         

    <div className="udaipur-container">
      <div className="hero-section">
        <img src={heroImage} alt="Udaipur" className="hero-image" />
        <h1 className="hero-text">UDAIPUR</h1>
      </div>

      <div className="udaipur-container">
        <h1 className="title">Udaipur: The Venice of the East</h1>
        <p className="intro">
          Udaipur, the crown jewel of Rajasthan, is a city of romance, regal
          charm, and breathtaking landscapes. Surrounded by the Aravalli Hills,
          its pristine lakes and majestic palaces transport you to an era of
          royal splendor.
        </p>

        <section>
          <h2>Majestic Palaces</h2>
          <p>
            The City Palace, a grand spectacle on the banks of Lake Pichola, is
            a testament to Udaipur’s regal history. With its intricate
            balconies, stunning courtyards, and museum filled with royal
            artifacts, it is a must-visit. Sajjangarh, also known as the Monsoon
            Palace, sits atop a hill, offering breathtaking panoramic views of
            the city.
          </p>
        </section>

        <section>
          <h2>Enchanting Lakes</h2>
          <p>
            Udaipur is famous for its beautiful lakes. Lake Pichola, with its
            shimmering waters, houses the famous Lake Palace, a floating
            architectural marvel. Fateh Sagar Lake is another gem, with boat
            rides offering mesmerizing sunset views. The tranquility of these
            lakes provides a perfect escape from the bustling city life.
          </p>
        </section>

        <section>
          <h2>Vibrant Culture and Festivals</h2>
          <p>
            Udaipur comes alive during festivals like the Mewar Festival, where
            women dress in vibrant attire, and the city is adorned with colorful
            decorations. The Shilpgram Festival showcases traditional Rajasthani
            crafts, dance, and music, celebrating the region’s rich cultural
            heritage.
          </p>
        </section>

        <section>
          <h2>Rich Rajasthani Cuisine</h2>
          <p>
            Food lovers will delight in Udaipur’s traditional dishes. Savor the
            iconic Dal Baati Churma, a rustic and flavorful dish. Gatte ki
            Sabzi, a curry made from gram flour dumplings, and the fiery Laal
            Maas, a Rajasthani mutton delicacy, are must-tries. For dessert,
            indulge in Ghewar, a sweet delight soaked in syrup.
          </p>
        </section>
      </div>

      <div className="slider-section">
        <h2>Top Destinations in Udaipur</h2>
        <Slider {...sliderSettings}>
          <div className="slide-item">
            <img src={cityPalace} alt="City Palace" />
            <p>City Palace</p>
          </div>
          <div className="slide-item">
            <img src={lakePichola} alt="Lake Pichola" />
            <p>Lake Pichola</p>
          </div>
          <div className="slide-item">
            <img src={sajjangarh} alt="Sajjangarh" />
            <p>Sajjangarh (Monsoon Palace)</p>
          </div>
        </Slider>
      </div>

      <div className="facts-container">
        <div className="facts-title">Fascinating Facts About Udaipur</div>
        <div className="facts-content">
          <ul>
            <li>
              🏰 Udaipur is known as the "Venice of the East" due to its
              picturesque lakes and palaces.
            </li>
            <li>
              💎 The Lake Palace was once the summer retreat of the Mewar
              dynasty.
            </li>
            <li>
              🎭 The city hosts the World Music Festival, attracting artists
              from across the globe.
            </li>
            <li>
              🎥 Udaipur has been a favorite location for Bollywood and
              Hollywood movies, including James Bond's "Octopussy."
            </li>
          </ul>
        </div>
      </div>

      <div className="dishes-section">
        <h2 className="dishes-title">Top Dishes in Udaipur</h2>
        <div className="dishes-container">
          <div className="dish-item">
            <img src={dalBaati} alt="Dal Baati Churma" />
            <p>Dal Baati Churma</p>
          </div>
          <div className="dish-item">
            <img src={gatteKiSabzi} alt="Gatte ki Sabzi" />
            <p>Gatte ki Sabzi</p>
          </div>
          <div className="dish-item">
            <img src={laalMaas} alt="Laal Maas" />
            <p>Laal Maas</p>
          </div>
          <div className="dish-item">
            <img src={ghewar} alt="Ghewar" />
            <p>Ghewar</p>
          </div>
        </div>
      </div>

      <div className="plan-trip-container">
        <button
          className="plan-trip-button"
          onClick={handleStartPlanning}
        >
          Plan Your Trip
        </button>
      </div>
    </div>
    </div>
  );
};

export default Udaipur;
