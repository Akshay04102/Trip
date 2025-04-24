import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../goa/Goa.module.css";
import heroImage from "./Kerala-Tourism.webp";
import alleppey from "./alleppey.jpg";
import munnar from "./tea-gardens-munnar.webp";
import kovalam from "./Samudra-Beach-Kovalam-unsplash-scaled.jpg";
import appam from "./Appam-4-1.jpg";
import sadya from "./onam-sadya.webp";
import karimeen from "./ghnohbrdfj.jpg";
import banana_fry from "./banana.webp";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";

const Kerala = () => {
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
    const destination = "Kerala"; // Declare the destination
    navigate("/create-trip", { state: { destination } }); // Use navigate to go to the new page
  };

  return (
    <div>
      <Navbar />

      <div className={styles.goaContainer}>
        <div className={styles.heroSection}>
          <img
            src={heroImage}
            alt="Kerala Backwaters"
            className={styles.heroImage}
          />
          <h1 className={styles.heroText}>KERALA</h1>
        </div>

        <div className={styles.goaContainer}>
          <h1 className={styles.title}>Kerala: God's Own Country</h1>
          <p className={styles.intro}>
            Welcome to Kerala, a land where nature's beauty unfolds in its full
            glory. From misty hill stations to serene backwaters, Kerala offers
            an experience unlike any other.
          </p>

          <section>
            <h2>Backwaters & Houseboats</h2>
            <p>
              Kerala's backwaters are an intricate network of lakes, canals, and
              rivers that offer a mesmerizing experience. Cruising on a
              traditional houseboat in Alleppey or Kumarakom is the best way to
              soak in the tranquil beauty of the region.
            </p>
          </section>

          <section>
            <h2>Misty Hill Stations</h2>
            <p>
              Munnar, Wayanad, and Thekkady are some of the most beautiful hill
              stations in Kerala. These places are adorned with lush tea
              gardens, rolling hills, and refreshing waterfalls, making them
              perfect for a peaceful retreat.
            </p>
          </section>

          <section>
            <h2>Exotic Wildlife</h2>
            <p>
              The state is home to diverse flora and fauna, with sanctuaries
              like Periyar Wildlife Sanctuary, Eravikulam National Park, and
              Wayanad Wildlife Sanctuary offering opportunities to witness
              elephants, tigers, and exotic bird species in their natural
              habitat.
            </p>
          </section>

          <section>
            <h2>Golden Beaches</h2>
            <p>
              Kerala boasts stunning beaches such as Kovalam, Varkala, and
              Marari. Whether you seek adventure sports or just want to relax by
              the Arabian Sea, these beaches have something for everyone.
            </p>
          </section>
        </div>

        <div className={styles.sliderSection}>
          <h2>Top Destinations in Kerala</h2>
          <Slider {...sliderSettings}>
            <div className={styles.slideItem}>
              <img src={alleppey} alt="Alleppey Backwaters" />
              <p>Alleppey Backwaters</p>
            </div>
            <div className={styles.slideItem}>
              <img src={munnar} alt="Munnar" />
              <p>Munnar</p>
            </div>
            <div className={styles.slideItem}>
              <img src={kovalam} alt="Kovalam Beach" />
              <p>Kovalam Beach</p>
            </div>
          </Slider>
        </div>

        <div className={styles.factsContainer}>
          <div className={styles.factsTitle}>
            Fascinating Facts About Kerala
          </div>
          <div className={styles.factsContent}>
            <ul>
              <li>🌴 Kerala has the highest literacy rate in India.</li>
              <li>
                🐘 It is home to the famous annual Thrissur Pooram festival.
              </li>
              <li>🛶 Kerala's backwaters stretch over 900 km.</li>
              <li>🥥 The state is known as the "Land of Coconuts."</li>
              <li>
                🌿 Ayurveda originated in Kerala and is still widely practiced.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.dishesSection}>
          <h2 className={styles.dishesTitle}>Top Dishes in Kerala</h2>
          <div className={styles.dishesContainer}>
            <div className={styles.dishItem}>
              <img src={appam} alt="Appam with Stew" />
              <p>Appam with Stew</p>
            </div>
            <div className={styles.dishItem}>
              <img src={sadya} alt="Kerala Sadya" />
              <p>Traditional Kerala Sadya</p>
            </div>
            <div className={styles.dishItem}>
              <img src={karimeen} alt="Karimeen Pollichathu" />
              <p>Karimeen Pollichathu</p>
            </div>
            <div className={styles.dishItem}>
              <img src={banana_fry} alt="Banana Fry" />
              <p>Banana Fry</p>
            </div>
          </div>
        </div>

        <div className={styles.planTripContainer}>
          <button
            className={styles.planTripButton}
            onClick={handleStartPlanning}
          >
            Plan Your Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default Kerala;
