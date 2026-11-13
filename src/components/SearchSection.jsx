import "./SearchSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchSection() {

  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travelers, setTravelers] = useState(2);

  function searchTrip() {

  if (
    destination.trim() === "" ||
    checkIn === "" ||
    checkOut === ""
  ) {

    alert("Please fill all search details.");

    return;

  }

  navigate(`/search-results`, {

    state: {

      destination,

      checkIn,

      checkOut,

      travelers,

    },

  });

}

  return (

    <section className="search-section">

      <div className="search-card">

        <div className="field">

          <label>Destination</label>

          <input
            type="text"
            placeholder="📍 Where do you want to go?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

        </div>

        <div className="field">

          <label>Check In</label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />

        </div>

        <div className="field">

          <label>Check Out</label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />

        </div>

        <div className="field">

          <label>Travelers</label>

          <input
            type="number"
            min="1"
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          />

        </div>

        <button
          className="search-btn"
          onClick={searchTrip}
        >
          Search Trip
        </button>

      </div>

    </section>

  );

}

export default SearchSection;