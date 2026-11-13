import { useLocation, useNavigate } from "react-router-dom";
import "./DestinationDetails.css";

function DestinationDetails() {
  const { state: place } = useLocation();
  const navigate = useNavigate();

  // If destination data is not available
  if (!place) {
    return (
      <div className="destination-details">
        <div className="details-not-found">
          <h2>Destination not found</h2>

          <button
            className="details-back-btn"
            onClick={() => navigate("/destinations")}
          >
            Back to Destinations
          </button>
        </div>
      </div>
    );
  }

  // Default hotel
  const hotel = place.hotel || {
    name: "Ayana Resort Bali",
    stars: "5 Star Hotel",
    room: "Deluxe Room",
    meals: "Breakfast Included",
  };

  // Default flight
  const flight = place.flight || {
    airline: "Singapore Airlines",
    from: "Delhi",
    to: place.name,
    class: "Economy Class",
    time: "10:30 AM",
  };

  // ================= BOOKING HANDLER =================

  function handleBooking() {
    // Check whether the user is logged in
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("explorexUser");

    const bookingData = {
      destination: place.name,
      price: place.price,
      hotel: hotel,
      flight: flight,
    };

    // ================= NOT LOGGED IN =================

    if (!savedUser) {
      navigate("/login", {
        state: {
          returnTo: "/booking",
          bookingData: bookingData,
        },
      });

      return;
    }

    // ================= LOGGED IN =================

    navigate("/booking", {
      state: bookingData,
    });
  }

  return (
    <div className="destination-details">

      {/* ================= HERO ================= */}

      <section className="details-hero">

        <div className="details-hero-image">
          <img
            src={place.image}
            alt={place.name}
          />
        </div>

        <div className="details-hero-content">

          <span className="details-location">
            📍 {place.country}
          </span>

          <h1>{place.name}</h1>

          <p className="details-description">
            {place.description}
          </p>

          {/* QUICK INFORMATION */}

          <div className="details-quick-info">

            <div className="details-info-box">
              <span>⭐</span>

              <strong>
                {place.rating}
              </strong>

              <small>
                Rating
              </small>
            </div>

            <div className="details-info-box">
              <span>🕒</span>

              <strong>
                {place.duration}
              </strong>

              <small>
                Duration
              </small>
            </div>

            <div className="details-info-box">
              <span>☀️</span>

              <strong>
                {place.bestTime}
              </strong>

              <small>
                Best Time
              </small>
            </div>

          </div>

          {/* PRICE + BUTTON */}

          <div className="details-hero-bottom">

            <div className="details-price">

              <small>
                Starting from
              </small>

              <h2>
                {place.price}
              </h2>

            </div>

            <button
              className="details-book-btn"
              onClick={handleBooking}
            >
              Book This Trip
            </button>

          </div>

        </div>

      </section>

      {/* ================= TRIP OVERVIEW ================= */}

      <section className="details-section">

        <div className="details-section-heading">

          <span>01</span>

          <div>
            <h2>
              Trip Overview
            </h2>

            <p>
              Everything you need to know about your trip.
            </p>
          </div>

        </div>

        <div className="details-overview-grid">

          {/* DURATION */}

          <div className="details-overview-card">

            <span>🕒</span>

            <div>
              <small>
                Duration
              </small>

              <strong>
                {place.duration}
              </strong>
            </div>

          </div>

          {/* RATING */}

          <div className="details-overview-card">

            <span>⭐</span>

            <div>
              <small>
                Rating
              </small>

              <strong>
                {place.rating} / 5
              </strong>
            </div>

          </div>

          {/* BEST TIME */}

          <div className="details-overview-card">

            <span>☀️</span>

            <div>
              <small>
                Best Time
              </small>

              <strong>
                {place.bestTime}
              </strong>
            </div>

          </div>

          {/* PRICE */}

          <div className="details-overview-card">

            <span>₹</span>

            <div>
              <small>
                Package Price
              </small>

              <strong>
                {place.price}
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* ================= TOP PLACES ================= */}

      <section className="details-section">

        <div className="details-section-heading">

          <span>02</span>

          <div>
            <h2>
              Top Places to Visit
            </h2>

            <p>
              Popular attractions you can explore in{" "}
              {place.name}.
            </p>
          </div>

        </div>

        <div className="details-places-grid">

          {place.places?.map((item, index) => (

            <div
              className="details-place-card"
              key={index}
            >

              <img
                src={
                  place.gallery?.[index] ||
                  place.image
                }
                alt={item}
              />

              <div className="details-place-overlay">

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                  {item}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================= PACKAGE INCLUDES ================= */}

      <section className="details-section">

        <div className="details-section-heading">

          <span>03</span>

          <div>

            <h2>
              Package Includes
            </h2>

            <p>
              Your package includes these essential travel services.
            </p>

          </div>

        </div>

        <div className="details-includes-grid">

          {/* HOTEL */}

          <div className="details-include-card">

            <div className="details-include-icon">
              🏨
            </div>

            <div>

              <h3>
                Hotel Stay
              </h3>

              <strong>
                {hotel.name}
              </strong>

              <p>
                ⭐ {hotel.stars}
              </p>

              <p>
                {hotel.room}
              </p>

              <p>
                {hotel.meals}
              </p>

            </div>

          </div>

          {/* FLIGHT */}

          <div className="details-include-card">

            <div className="details-include-icon">
              ✈️
            </div>

            <div>

              <h3>
                Flight
              </h3>

              <strong>
                {flight.airline}
              </strong>

              <p>
                {flight.from} → {flight.to}
              </p>

              <p>
                {flight.class}
              </p>

              <p>
                {flight.time}
              </p>

            </div>

          </div>

          {/* SUPPORT */}

          <div className="details-include-card">

            <div className="details-include-icon">
              ✓
            </div>

            <div>

              <h3>
                Travel Support
              </h3>

              <p>
                Assistance throughout your journey.
              </p>

              <p>
                Airport pickup & drop
              </p>

              <p>
                24/7 Travel Assistance
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FINAL BOOKING ================= */}

      <section className="details-final-booking">

        <div>

          <small>
            Ready for your next adventure?
          </small>

          <h2>
            Explore {place.name}
          </h2>

        </div>

        <button
          className="details-final-btn"
          onClick={handleBooking}
        >
          Book This Trip
        </button>

      </section>

    </div>
  );
}

export default DestinationDetails;