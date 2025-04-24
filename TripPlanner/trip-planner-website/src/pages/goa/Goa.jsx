import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Goa.module.css";
import heroImage from "./hero-image.jpg";
import bagaBeach from "./baga-beach.jpg";
import oldGoa from "./oldgoa.png";
import dudhsagar from "./Dudhsagar.webp";
import fish_curry from "./fish_curry.png";
import bebnica from "./bebnica.jpg";
import pork from "./porkvindaloo.jpg";
import chicken from "./chicken.jpg";
import Navbar from "@/components/common/Navbar";
import { useNavigate } from "react-router-dom";

const Goa = () => {
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
    const destination = "Goa"; // Declare the destination
    navigate("/create-trip", { state: { destination } }); // Use navigate to go to the new page
  };

  return (
    <div>
      <Navbar />

      <div className={styles.goaContainer}>
        <div className={styles.heroSection}>
          <img src={heroImage} alt="Goa Beach" className={styles.heroImage} />
          <h1 className={styles.heroText}>GOA</h1>
        </div>

        <div className={styles.goaContainer}>
          <h1 className={styles.title}>
            Discover India's Coastal Jewel Goa: Where the Sun and Sand Collide
          </h1>
          <p className={styles.intro}>
            Ah, Goa! The very name conjures up images of sun-kissed beaches,
            swaying palm trees, and a laid-back vibe that is as contagious as a
            beachside melody. Let's dive into this coastal paradise and explore
            its magic.
          </p>

          <section>
            <h2>Sun-kissed Beaches</h2>
            <p>
              Goa's coastline stretches across 3,702 kilometers, and it's no
              wonder that the beaches here are the stuff of dreams. From the
              bustling shores of Baga and Calangute to the serene sands of
              Palolem and Agonda, each beach has its unique flavor. Picture
              yourself sipping coconut water under the shade of a palm tree, the
              waves gently lapping at your toes. Bliss, right?
            </p>
          </section>

          <section>
            <h2>Vibrant Festivals</h2>
            <p>
              Goa knows how to celebrate life! Whether it's the colorful
              Carnival, the spiritual Shigmo festival, or the pulsating Sunburn
              music festival, there's always something happening. The air is
              charged with excitement, and locals and tourists alike dance to
              the rhythm of the drums. It's a kaleidoscope of colors, music, and
              joy.
            </p>
          </section>

          <section>
            <h2>Mouth-watering Cuisine</h2>
            <p>
              Prepare your taste buds for a flavor explosion! Goan cuisine is a
              delightful fusion of Indian, Portuguese, and Konkani influences.
              Seafood lovers rejoice—the fish curry rice, prawn balchão, and
              xacuti are legendary. Wash it down with some Feni (a local cashew
              spirit) or a chilled beer. And don't forget the bebinca for
              dessert— a layered cake that's pure indulgence.
            </p>
          </section>

          <section>
            <h2>Rich History</h2>
            <p>
              Goa wears its history proudly. The Portuguese left their mark
              here, evident in the charming churches, cathedrals, and old
              colonial buildings. Step into the{" "}
              <span className={styles.highlight}>Basilica of Bom Jesus</span>,
              where the mortal remains of St. Francis Xavier rest. Explore the
              Fontainhas neighborhood with its narrow lanes and colorful
              houses—it’s like stepping into a European postcard.
            </p>
          </section>

          <section>
            <h2>Susegad: The Art of Relaxation</h2>
            <p>
              Now, let's talk about Susegad. It's more than just a word; it's a
              state of mind. Imagine swinging lazily in a hammock, the sea
              breeze ruffling your hair, and time slowing down. That's Susegad.
              Goans have mastered the art of relaxation—they know how to take
              life easy, enjoy the moment, and let stress drift away like a
              paper boat on the Mandovi River.
            </p>
          </section>

          <section>
            <h2>Adventure Awaits</h2>
            <p>
              For thrill-seekers, Goa offers an adrenaline rush like no other.
              Dive into the Arabian Sea with scuba diving and snorkeling, ride
              the waves while surfing at Morjim Beach, or feel the wind in your
              hair as you jet ski along the coastline. Adventure is always
              around the corner!
            </p>
          </section>

          <section>
            <h2>Nightlife and Entertainment</h2>
            <p>
              As the sun sets, Goa transforms into a vibrant party hub. From
              legendary beach shacks in Anjuna and Baga to high-energy
              nightclubs in Tito’s Lane, the nightlife here is electric. Dance
              the night away to trance beats or sip cocktails under the starlit
              sky—Goa’s nights are as unforgettable as its days.
            </p>
          </section>

          <section>
            <h2>Shopping Extravaganza</h2>
            <p>
              No trip is complete without some shopping, and Goa does not
              disappoint. Explore the flea markets of Anjuna and Mapusa for
              bohemian jewelry, handcrafted souvenirs, and colorful beachwear.
              Don't forget to pick up some aromatic Goan spices and cashew nuts
              before you head home!
            </p>
          </section>
        </div>

        <div className={styles.sliderSection}>
          <h2>Top Destinations in Goa</h2>
          <Slider {...sliderSettings}>
            <div className={styles.slideItem}>
              <img src={bagaBeach} alt="Baga Beach" />
              <p>Baga Beach</p>
            </div>
            <div className={styles.slideItem}>
              <img src={oldGoa} alt="Old Goa" />
              <p>Old Goa</p>
            </div>
            <div className={styles.slideItem}>
              <img src={dudhsagar} alt="Dusagar Waterfalls" />
              <p>Dusagar Waterfalls</p>
            </div>
          </Slider>
        </div>

        {/* Fascinating Facts About Goa (Now placed AFTER Slider Section) */}
        <div className={styles.factsContainer}>
          <div className={styles.factsTitle}>Fascinating Facts About Goa</div>
          <div className={styles.factsContent}>
            <ul>
              <li>
                🏝️ Goa is India’s smallest state by area but has a rich
                Portuguese heritage.
              </li>
              <li>
                🌊 It has over 100 km of stunning coastline with pristine
                beaches.
              </li>
              <li>
                🎭 Goa has a unique mix of Indian and Portuguese cultures.
              </li>
              <li>
                🎶 The state is known for its vibrant nightlife and music
                festivals.
              </li>
              <li>
                🌿 Dudhsagar Falls is one of the tallest waterfalls in India.
              </li>
            </ul>
          </div>
        </div>

        {/* Top Dishes in Goa */}
        <div className={styles.dishesSection}>
          <h2 className={styles.dishesTitle}>Top Dishes in Goa</h2>
          <div className={styles.dishesContainer}>
            <div className={styles.dishItem}>
              <img src={fish_curry} alt="Goan Fish Curry" />
              <p>Goan Fish Curry</p>
            </div>
            <div className={styles.dishItem}>
              <img src={bebnica} alt="Bebinca" />
              <p>Bebinca (Traditional Dessert)</p>
            </div>
            <div className={styles.dishItem}>
              <img src={pork} alt="Pork Vindaloo" />
              <p>Pork Vindaloo</p>
            </div>
            <div className={styles.dishItem}>
              <img src={chicken} alt="Chicken Xacuti" />
              <p>Chicken Xacuti</p>
            </div>
          </div>
        </div>

        {/* Plan Trip Button */}
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

export default Goa;
