import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../goa/Goa.module.css";
import heroImage from "./hero-image.jpg";
import solangValley from "./solang-valley-manali.jpg";
import rohtangPass from "./RohtangPass.jpg";
import hadimbaTemple from "./hidimba-temple.jpeg";
import sidu from "./siddhu.jpeg";
import troutFish from "./1685555435_kullu_trout_fish.webp";
import dham from "./dham.webp";
import momos from "./moms.jpg";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";

const Manali = () => {
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
    const destination = "Manali"; // Declare the destination
    navigate("/create-trip", { state: { destination } }); // Use navigate to go to the new page
  };

  return (
    <div>
      <Navbar />

      <div className={styles.goaContainer}>
        <div className={styles.heroSection}>
          <img
            src={heroImage}
            alt="Manali Snowy Peaks"
            className={styles.heroImage}
          />
          <h1 className={styles.heroText}>MANALI</h1>
        </div>

        <div className={styles.goaContainer}>
          <h1 className={styles.title}>
            Experience the Enchanting Beauty of Manali: Where Mountains Whisper
            Tales of Adventure
          </h1>
          <p className={styles.intro}>
            Nestled in the lap of the Himalayas, Manali is a breathtaking
            retreat for nature lovers, thrill-seekers, and wanderers alike. From
            snow-covered peaks to lush green valleys, this hill station offers
            an experience like no other.
          </p>

          <section>
            <h2>The Majestic Mountains</h2>
            <p>
              Manali is surrounded by towering snow-capped peaks, offering a
              picturesque landscape that seems straight out of a fairy tale. The
              mighty Pir Panjal range and the Dhauladhar peaks create a
              mesmerizing backdrop for adventure and relaxation.
            </p>
          </section>

          <section>
            <h2>Adventure Paradise</h2>
            <p>
              If you crave adventure, Manali will not disappoint! From
              paragliding over Solang Valley to skiing in Rohtang Pass, every
              adrenaline junkie finds their thrill here. Trekking, rafting, and
              mountain biking are just a few of the exciting activities to
              explore.
            </p>
          </section>

          <section>
            <h2>Serene Temples & Ancient Culture</h2>
            <p>
              Manali isn’t just about adventure; it’s a spiritual retreat as
              well. The{" "}
              <span className={styles.highlight}>Hadimba Devi Temple</span>,
              dedicated to the goddess Hadimba, is a 16th-century marvel built
              in the middle of a cedar forest. Other must-visit sites include
              the Manu Temple and the mystical Vashisht Hot Springs.
            </p>
          </section>

          <section>
            <h2>Winter Wonderland</h2>
            <p>
              During winter, Manali transforms into a snowy paradise, drawing
              travelers eager to experience the magic of snowfall. Whether it's
              making snowmen, engaging in snowball fights, or enjoying a cozy
              bonfire night, winter in Manali is an unforgettable experience.
            </p>
          </section>

          <section>
            <h2>Local Markets & Shopping</h2>
            <p>
              Manali’s bustling Mall Road is a shopper’s paradise. From handmade
              woolen shawls and Tibetan handicrafts to local Kullu caps, you’ll
              find unique souvenirs to take home. Don’t forget to try the famous
              apple-based products from the region!
            </p>
          </section>

          <section>
            <h2>Cuisine of Manali</h2>
            <p>
              The food in Manali is as delightful as its views. Enjoy a plate of
              piping hot <span className={styles.highlight}>Siddu</span>, taste
              the authentic Himachali{" "}
              <span className={styles.highlight}>Dham</span>, and indulge in
              fresh Trout fish straight from the Beas River. And, of course,
              steaming hot momos are a must!
            </p>
          </section>
        </div>

        <div className={styles.sliderSection}>
          <h2>Top Destinations in Manali</h2>
          <Slider {...sliderSettings}>
            <div className={styles.slideItem}>
              <img src={solangValley} alt="Solang Valley" />
              <p>Solang Valley</p>
            </div>
            <div className={styles.slideItem}>
              <img src={rohtangPass} alt="Rohtang Pass" />
              <p>Rohtang Pass</p>
            </div>
            <div className={styles.slideItem}>
              <img src={hadimbaTemple} alt="Hadimba Temple" />
              <p>Hadimba Temple</p>
            </div>
          </Slider>
        </div>

        <div className={styles.factsContainer}>
          <div className={styles.factsTitle}>
            Fascinating Facts About Manali
          </div>
          <div className={styles.factsContent}>
            <ul>
              <li>🏔️ Manali is named after the sage Manu.</li>
              <li>
                ❄️ Rohtang Pass remains covered in snow for most of the year.
              </li>
              <li>🌲 Apple orchards are a key attraction.</li>
              <li>🕉️ It’s a major hub for Tibetan culture and monasteries.</li>
            </ul>
          </div>
        </div>

        <div className={styles.dishesSection}>
          <h2 className={styles.dishesTitle}>Top Dishes in Manali</h2>
          <div className={styles.dishesContainer}>
            <div className={styles.dishItem}>
              <img src={sidu} alt="Siddu" />
              <p>Siddu (Steamed Wheat Bread)</p>
            </div>
            <div className={styles.dishItem}>
              <img src={troutFish} alt="Trout Fish" />
              <p>Trout Fish</p>
            </div>
            <div className={styles.dishItem}>
              <img src={dham} alt="Dham" />
              <p>Himachali Dham</p>
            </div>
            <div className={styles.dishItem}>
              <img src={momos} alt="Momos" />
              <p>Momos</p>
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

export default Manali;
