import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../goa/Goa.module.css";
import heroImage from "./AndamanIslands.jpg";
import radhanagarBeach from "./radhanagar-beach.jpg";
import cellularJail from "./cellular-jail.jpeg";
import rossIsland from "./ross-island.jpg";
import seafoodPlatter from "./seafood-platter.jpg";
import coconutPrawnCurry from "./coconut-prawn-curry.webp";
import lobster from "./lobster.jpg";
import fishTikka from "./fish-tikka.jpg";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";

const AndamanIslands = () => {
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
    const destination = "Andaman Islands"; // Declare the destination
    navigate("/create-trip", { state: { destination } }); // Use navigate to go to the new page
  };

  return (
    <div>
      <Navbar />

      <div className={styles.goaContainer}>
        <div className={styles.heroSection}>
          <img
            src={heroImage}
            alt="Andaman Islands"
            className={styles.heroImage}
          />
          <h1 className={styles.heroText}>ANDAMAN ISLANDS</h1>
        </div>

        <div className={styles.goaContainer}>
          <h1 className={styles.title}>
            Discover the Breathtaking Beauty of the Andaman Islands
          </h1>
          <p className={styles.intro}>
            The Andaman Islands are an untouched paradise nestled in the Bay of
            Bengal, boasting pristine beaches, turquoise waters, and lush
            rainforests. Whether you're a nature lover, an adventure enthusiast,
            or someone seeking peace and tranquility, the Andamans offer an
            unforgettable experience.
          </p>

          <section>
            <h2>Stunning Beaches</h2>
            <p>
              The Andaman Islands are home to some of the most beautiful beaches
              in the world. Radhanagar Beach on Havelock Island is a
              breathtaking stretch of white sand lined with lush greenery. Its
              crystal-clear waters and mesmerizing sunsets make it one of Asia’s
              most picturesque beaches.
            </p>
          </section>

          <section>
            <h2>Adventure and Water Sports</h2>
            <p>
              If you crave adventure, the Andaman Islands offer world-class
              scuba diving, snorkeling, and jet skiing. The vibrant coral reefs
              at Havelock and Neil Island are home to exotic marine life, making
              them perfect for underwater exploration.
            </p>
          </section>

          <section>
            <h2>Historical Significance</h2>
            <p>
              The Andamans have a rich and painful history, most notably at the
              infamous Cellular Jail in Port Blair. Built by the British in the
              19th century, this jail was used to exile Indian freedom fighters.
              Today, it stands as a museum, a solemn reminder of India's
              struggle for independence.
            </p>
          </section>

          <section>
            <h2>Enchanting Islands</h2>
            <p>
              Apart from Havelock Island, the Andamans are home to several
              mesmerizing islands. Ross Island, once a British administrative
              hub, is now a beautiful ruin overtaken by nature. Neil Island,
              known for its laid-back charm and crystal-clear waters, is perfect
              for those looking for a peaceful retreat.
            </p>
          </section>

          <section>
            <h2>Unique Flora and Fauna</h2>
            <p>
              The islands are a biodiversity hotspot, home to rare species of
              birds, vibrant coral reefs, and lush mangrove forests. You may
              spot exotic birds like the Andaman Woodpecker or witness
              bioluminescent plankton lighting up the ocean waves at night.
            </p>
          </section>
        </div>

        <div className={styles.sliderSection}>
          <h2>Top Destinations in Andaman</h2>
          <Slider {...sliderSettings}>
            <div className={styles.slideItem}>
              <img src={radhanagarBeach} alt="Radhanagar Beach" />
              <p>Radhanagar Beach</p>
            </div>
            <div className={styles.slideItem}>
              <img src={cellularJail} alt="Cellular Jail" />
              <p>Cellular Jail</p>
            </div>
            <div className={styles.slideItem}>
              <img src={rossIsland} alt="Ross Island" />
              <p>Ross Island</p>
            </div>
          </Slider>
        </div>

        <div className={styles.factsContainer}>
          <div className={styles.factsTitle}>
            Fascinating Facts About Andaman
          </div>
          <div className={styles.factsContent}>
            <ul>
              <li>
                🏝️ Andaman consists of over 570 islands, but only 37 are
                inhabited.
              </li>
              <li>
                🐠 The islands have some of the world’s best diving spots,
                teeming with marine life.
              </li>
              <li>
                🔒 The infamous Cellular Jail was known as "Kala Pani" and was a
                major colonial prison.
              </li>
              <li>
                🌿 The indigenous tribes of Andaman, like the Sentinelese,
                remain one of the most isolated groups on Earth.
              </li>
              <li>
                ✨ Bioluminescence can be seen at Havelock Island, making the
                waves glow at night.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.dishesSection}>
          <h2 className={styles.dishesTitle}>Top Dishes in Andaman</h2>
          <div className={styles.dishesContainer}>
            <div className={styles.dishItem}>
              <img src={seafoodPlatter} alt="Seafood Platter" />
              <p>Seafood Platter</p>
            </div>
            <div className={styles.dishItem}>
              <img src={coconutPrawnCurry} alt="Coconut Prawn Curry" />
              <p>Coconut Prawn Curry</p>
            </div>
            <div className={styles.dishItem}>
              <img src={lobster} alt="Grilled Lobster" />
              <p>Grilled Lobster</p>
            </div>
            <div className={styles.dishItem}>
              <img src={fishTikka} alt="Fish Tikka" />
              <p>Fish Tikka</p>
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

export default AndamanIslands;
