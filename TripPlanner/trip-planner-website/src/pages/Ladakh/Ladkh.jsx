import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../goa/Goa.module.css";
import heroImage from "./leh-hero.jpg";
import pangongLake from "./pangong-lake.jpg";
import magneticHill from "./magnetic-hill.webp";
import nubraValley from "./nubra-valley.jpg";
import thukpa from "./thukpa.jpg";
import momos from "./momos.jpg";
import butterTea from "./butter-tea.webp";
import skyu from "./skyu.jpg";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";

const LehLadakh = () => {
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
    const destination = "Ladakh"; // Declare the destination
    navigate("/create-trip", { state: { destination } }); // Use navigate to go to the new page
  };

  return (
    <div>
      <Navbar />

      <div className={styles.goaContainer}>
        <div className={styles.heroSection}>
          <img src={heroImage} alt="Leh Ladakh" className={styles.heroImage} />
          <h1 className={styles.heroText}>LEH LADAKH</h1>
        </div>

        <div className={styles.goaContainer}>
          <h1 className={styles.title}>Leh Ladakh: The Land of High Passes</h1>
          <p className={styles.intro}>
            Nestled in the northernmost part of India, Leh Ladakh is a land of
            surreal landscapes, breathtaking vistas, and a culture steeped in
            Tibetan and Buddhist traditions. It is a paradise for adventure
            seekers, nature lovers, and spiritual wanderers alike.
          </p>

          <section>
            <h2>Unmatched Natural Beauty</h2>
            <p>
              Ladakh’s rugged terrain, snow-capped peaks, and deep valleys
              create a surreal, otherworldly experience. The stunning blue
              waters of Pangong Lake reflect the sky so vividly that it feels
              like a dream. The magnetic charm of Nubra Valley, with its vast
              sand dunes and double-humped Bactrian camels, offers an unexpected
              contrast to the rocky landscape.
            </p>
          </section>

          <section>
            <h2>Adventure at Every Turn</h2>
            <p>
              From the world's highest motorable roads like Khardung La to
              thrilling river rafting on the Zanskar River, Ladakh is an
              adventure enthusiast’s dream. Trekking through the Markha Valley
              or cycling through the barren mountain passes offers an adrenaline
              rush like no other.
            </p>
          </section>

          <section>
            <h2>A Spiritual Haven</h2>
            <p>
              Ladakh is home to some of the most ancient and revered monasteries
              in the world. The Thiksey Monastery, resembling Tibet’s Potala
              Palace, and the peaceful Hemis Monastery provide a glimpse into
              Buddhist traditions and teachings. The chants of monks, fluttering
              prayer flags, and sacred stupas create an atmosphere of serenity
              and spirituality.
            </p>
          </section>

          <section>
            <h2>Unique Culture and Traditions</h2>
            <p>
              The Ladakhi people have preserved their rich Tibetan heritage
              through their language, attire, and customs. Festivals like Hemis
              Festival and Losar (Tibetan New Year) bring the region to life
              with vibrant masked dances, traditional music, and deep-rooted
              rituals.
            </p>
          </section>
        </div>

        <div className={styles.sliderSection}>
          <h2>Top Destinations in Leh Ladakh</h2>
          <Slider {...sliderSettings}>
            <div className={styles.slideItem}>
              <img src={pangongLake} alt="Pangong Lake" />
              <p>Pangong Lake</p>
            </div>
            <div className={styles.slideItem}>
              <img src={magneticHill} alt="Magnetic Hill" />
              <p>Magnetic Hill</p>
            </div>
            <div className={styles.slideItem}>
              <img src={nubraValley} alt="Nubra Valley" />
              <p>Nubra Valley</p>
            </div>
          </Slider>
        </div>

        <div className={styles.factsContainer}>
          <div className={styles.factsTitle}>
            Fascinating Facts About Leh Ladakh
          </div>
          <div className={styles.factsContent}>
            <ul>
              <li>
                🏔️ Leh Ladakh is home to the highest motorable road in the
                world, Umling La Pass (19,024 ft).
              </li>
              <li>
                🙏 It has one of the world's oldest and most significant
                Buddhist monasteries.
              </li>
              <li>
                🛣️ Magnetic Hill defies gravity, making vehicles appear to roll
                uphill.
              </li>
              <li>
                🐪 Nubra Valley is the only place in India where you can find
                Bactrian (double-humped) camels.
              </li>
              <li>
                🌌 Ladakh offers some of the clearest night skies, perfect for
                stargazing and astrophotography.
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.dishesSection}>
          <h2 className={styles.dishesTitle}>Top Dishes in Leh Ladakh</h2>
          <div className={styles.dishesContainer}>
            <div className={styles.dishItem}>
              <img src={thukpa} alt="Thukpa" />
              <p>Thukpa (Traditional Noodle Soup)</p>
            </div>
            <div className={styles.dishItem}>
              <img src={momos} alt="Momos" />
              <p>Momos (Steamed Dumplings)</p>
            </div>
            <div className={styles.dishItem}>
              <img src={butterTea} alt="Butter Tea" />
              <p>Butter Tea (Salty Yak Butter Tea)</p>
            </div>
            <div className={styles.dishItem}>
              <img src={skyu} alt="Skyu" />
              <p>Skyu (Ladakhi Pasta Dish)</p>
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

export default LehLadakh;
