import "./Hero.css";
import heroImage from "../assets/hero.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

function Hero() {

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 700,
      once: true,
    });

    setTimeout(() => {
      AOS.refresh();
    }, 100);

  }, []);

  return (
    <section className="hero">

      <img
        src={heroImage}
        alt="Travel"
        className="hero-image"
        onLoad={() => AOS.refresh()}
      />

      <div className="overlay"></div>

      <div className="hero-content">

        <h1
          data-aos="fade-down"
          data-aos-delay="0"
        >
          Explore The World With ExploreX
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Plan smarter, travel better and create unforgettable memories.
        </p>

        <button
          className="hero-btn"
          data-aos="zoom-in"
          data-aos-delay="200"
          onClick={() => navigate("/destinations")}
        >
          Explore Destinations
        </button>

      </div>

    </section>
  );
}

export default Hero;