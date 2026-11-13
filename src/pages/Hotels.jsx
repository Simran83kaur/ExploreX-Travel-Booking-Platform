import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hotels from "../data/hotels";
import "./Hotels.css";

function Hotels() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const filteredHotels = hotels.filter((hotel) =>
    hotel.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleBooking = (hotel) => {
    // Check if user is logged in
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("explorexUser");

    // If user is not logged in, send them to Login
    if (!savedUser) {
      navigate("/login", {
        state: {
          returnTo: "/hotel-booking",
          bookingData: {
            hotel: hotel,
          },
        },
      });

      return;
    }

    // User is logged in, continue to hotel booking
    navigate("/hotel-booking", {
      state: {
        hotel: hotel,
      },
    });
  };

  return (
    <div className="hotel-page">

      <h1>Find Hotels</h1>

      <p>Book the best hotels for your vacation.</p>

      <input
        type="text"
        placeholder="Search Location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="hotel-grid">

        {filteredHotels.map((hotel) => (

          <div
            className="hotel-card"
            key={hotel.id}
          >

            <h2>
              {hotel.name}
            </h2>

            <h3>
              {hotel.location}
            </h3>

            <p className="hotel-stars">
              {hotel.stars}
            </p>

            <p>
              {hotel.room}
            </p>

            <h2>
              {hotel.price}
            </h2>

            <button
              onClick={() => handleBooking(hotel)}
            >
              Book Hotel
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Hotels;