import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Flights.css";
import flights from "../data/flight";

function Flights() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const [showDateHint, setShowDateHint] = useState(false);
  const dateInputRef = useRef(null);

  const today = new Date().toISOString().split("T")[0];

  const filteredFlights = flights.filter((flight) =>
    flight.to.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (date) => {
    if (!date) return "Select travel date";

    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleBookFlight = (flight) => {
    // First check travel date
    if (!travelDate) {
      setShowDateHint(true);

      dateInputRef.current?.focus();

      setTimeout(() => {
        setShowDateHint(false);
      }, 4000);

      return;
    }

    // Check if user is logged in
    const savedUser = localStorage.getItem("explorexUser");

    if (!savedUser) {
      // Save flight booking information temporarily
      // and send user to Login
      navigate("/login", {
        state: {
          returnTo: "/flight-booking",
          bookingData: {
            flight: flight,
            selectedDate: travelDate,
          },
        },
      });

      return;
    }

    // User is already logged in
    navigate("/flight-booking", {
      state: {
        flight: flight,
        selectedDate: travelDate,
      },
    });
  };

  return (
    <div className="flights-page">

      <h1>Search Flights</h1>

      <p className="flights-subtitle">
        Find the best flights for your journey.
      </p>

      {/* SEARCH AREA */}

      <div className="flight-search-area">

        <input
          type="text"
          placeholder="Search Destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div
          className={`date-box ${
            showDateHint ? "date-highlight" : ""
          }`}
        >

          {showDateHint && (
            <div className="date-hint">
              <span className="hint-arrow">↑</span>
              <span>Please select your travel date here</span>
            </div>
          )}

          <label htmlFor="travel-date">
            Travel Date
          </label>

          <input
            ref={dateInputRef}
            id="travel-date"
            type="date"
            value={travelDate}
            min={today}
            onChange={(e) => {
              setTravelDate(e.target.value);
              setShowDateHint(false);
            }}
          />

        </div>

      </div>

      {/* SELECTED DATE */}

      {travelDate && (
        <p className="selected-date">
          ✈️ Flights available for{" "}
          <strong>{formatDate(travelDate)}</strong>
        </p>
      )}

      {/* FLIGHT CARDS */}

      <div className="flight-grid">

        {filteredFlights.map((flight) => (

          <div
            className="flight-card"
            key={flight.id}
          >

            <div className="airline-name">

              <span className="airplane-icon">
                ✈️
              </span>

              <h2>{flight.airline}</h2>

            </div>

            <div className="flight-route">

              <div className="airport">

                <strong>{flight.from}</strong>

                <small>
                  {flight.departureTime}
                </small>

              </div>

              <div className="route-line">
                <span>✈</span>
              </div>

              <div className="airport">

                <strong>{flight.to}</strong>

                <small>
                  {flight.arrivalTime}
                </small>

              </div>

            </div>

            <div className="flight-info">

              <p>
                <b>📅 Date:</b>{" "}
                {travelDate
                  ? formatDate(travelDate)
                  : "Select date above"}
              </p>

              <p>
                <b>⏱ Duration:</b>{" "}
                {flight.duration}
              </p>

            </div>

            <div className="flight-bottom">

              <h3>{flight.price}</h3>

              <button
                onClick={() => handleBookFlight(flight)}
              >
                {travelDate
                  ? "Book Flight"
                  : "Select Date First"}
              </button>

            </div>

          </div>

        ))}

      </div>

      {filteredFlights.length === 0 && (
        <p className="no-flights">
          No flights found for this destination.
        </p>
      )}

    </div>
  );
}

export default Flights;