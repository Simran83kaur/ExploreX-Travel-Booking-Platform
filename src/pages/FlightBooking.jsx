import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./FlightBooking.css";

function FlightBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const flight = state?.flight;

  // Date selected on Flights page
  const initialDate = state?.selectedDate || "";

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [travelers, setTravelers] = useState(1);

  // Travel date
  const [travelDate, setTravelDate] = useState(initialDate);

  const [notification, setNotification] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  // ================= CHECK LOGIN =================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("explorexUser");

    if (!savedUser) {
      navigate("/login", {
        state: {
          returnTo: "/flight-booking",
          bookingData: state,
        },
      });

      return;
    }

    try {
      const user = JSON.parse(savedUser);

      setLoggedInUser(user);

      // Automatically use account information
      setName(user.name || "");
      setEmail(user.email || "");
    } catch (error) {
      console.error("User data error:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("explorexUser");

      navigate("/login");
    }
  }, [navigate, state]);

  // ================= NO FLIGHT =================

  if (!flight) {
    return (
      <div className="flight-booking-page">

        <div className="flight-error-card">

          <h2>Flight Not Found</h2>

          <p>
            Please select a flight before proceeding with the booking.
          </p>

          <button onClick={() => navigate("/flights")}>
            Back to Flights
          </button>

        </div>

      </div>
    );
  }

  // ================= WAIT FOR USER =================

  if (!loggedInUser) {
    return null;
  }

  // ================= PRICE =================

  const numericPrice =
    Number(
      flight.price
        .toString()
        .replace(/[₹,]/g, "")
    ) || 0;

  const totalPrice = numericPrice * travelers;

  // ================= DATE FORMAT =================

  const formatDate = (date) => {
    if (!date) return "Select travel date";

    return new Date(date + "T00:00:00").toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ================= BOOKING =================

  function handleBooking(e) {
    e.preventDefault();

    // Make sure user is still logged in
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("explorexUser");

    if (!savedUser) {
      navigate("/login");
      return;
    }

    let currentUser;

    try {
      currentUser = JSON.parse(savedUser);
    } catch (error) {
      navigate("/login");
      return;
    }

    // Check all required fields
    if (
      !name ||
      !email ||
      !phone ||
      !idNumber ||
      !travelDate
    ) {
      setNotification({
        type: "error",
        message:
          "Please fill in all the required details including travel date.",
      });

      return;
    }

    // Make sure booking belongs to logged-in account
    if (
      email.toLowerCase() !==
      currentUser.email.toLowerCase()
    ) {
      setNotification({
        type: "error",
        message:
          "Booking email must match your logged-in account.",
      });

      setEmail(currentUser.email);

      return;
    }

    const bookingId =
      "FL" + Date.now().toString().slice(-6);

    const booking = {
      id: bookingId,

      name: currentUser.name || name,

      email: currentUser.email,

      phone,
      idNumber,

      destination:
        `${flight.from} → ${flight.to}`,

      price:
        `₹${totalPrice.toLocaleString("en-IN")}`,

      basePrice: flight.price,

      travelers,

      // SAVE SELECTED DATE
      travelDate: travelDate,

      flight: flight.airline,

      bookingType: "Flight",

      flightDetails: {
        from: flight.from,
        to: flight.to,
        date: travelDate,
        duration: flight.duration,
      },
    };

    // Get all existing bookings
    const existingBookings =
      JSON.parse(
        localStorage.getItem("bookings")
      ) || [];

    // Add new booking
    existingBookings.push(booking);

    // Save bookings
    localStorage.setItem(
      "bookings",
      JSON.stringify(existingBookings)
    );

    // Show confirmation
    setConfirmedBooking(booking);

    setNotification({
      type: "success",
      message:
        "Your flight has been successfully booked!",
    });
  }

  // ================= CONFIRMATION PAGE =================

  if (confirmedBooking) {
    return (
      <div className="flight-booking-page">

        <div className="flight-confirmation-card">

          <div className="confirmation-icon">
            ✓
          </div>

          <h1>
            Flight Booking Confirmed!
          </h1>

          <p className="confirmation-message">
            Your flight has been successfully booked.
          </p>

          <div className="booking-id-box">

            <span>Booking ID</span>

            <strong>
              {confirmedBooking.id}
            </strong>

          </div>

          <div className="confirmation-details">

            <div>
              <span>Passenger</span>

              <strong>
                {confirmedBooking.name}
              </strong>
            </div>

            <div>
              <span>Email</span>

              <strong>
                {confirmedBooking.email}
              </strong>
            </div>

            <div>
              <span>Phone</span>

              <strong>
                {confirmedBooking.phone}
              </strong>
            </div>

            <div>
              <span>ID Number</span>

              <strong>
                {confirmedBooking.idNumber}
              </strong>
            </div>

            <div>
              <span>Airline</span>

              <strong>
                {flight.airline}
              </strong>
            </div>

            <div>
              <span>Route</span>

              <strong>
                {flight.from} → {flight.to}
              </strong>
            </div>

            <div>
              <span>Travel Date</span>

              <strong>
                {formatDate(
                  confirmedBooking.travelDate
                )}
              </strong>
            </div>

            <div>
              <span>Duration</span>

              <strong>
                {flight.duration}
              </strong>
            </div>

            <div>
              <span>Travelers</span>

              <strong>
                {confirmedBooking.travelers}
              </strong>
            </div>

            <div>
              <span>Total Amount</span>

              <strong className="confirmation-price">
                {confirmedBooking.price}
              </strong>
            </div>

          </div>

          <div className="confirmation-buttons">

            <button
              className="my-bookings-btn"
              onClick={() =>
                navigate("/my-bookings")
              }
            >
              View My Bookings
            </button>

            <button
              className="back-flights-btn"
              onClick={() =>
                navigate("/flights")
              }
            >
              Book Another Flight
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ================= BOOKING FORM =================

  return (
    <div className="flight-booking-page">

      {/* NOTIFICATION */}

      {notification && (
        <div
          className={`flight-notification ${notification.type}`}
        >

          <span>
            {notification.type === "error"
              ? "⚠️"
              : "✓"}
          </span>

          <span>
            {notification.message}
          </span>

          <button
            onClick={() =>
              setNotification(null)
            }
          >
            ×
          </button>

        </div>
      )}

      <div className="flight-booking-container">

        <h1>
          Book Your Flight
        </h1>

        <p className="flight-booking-subtitle">
          Enter your passenger details to complete
          your flight booking.
        </p>

        {/* FLIGHT DETAILS */}

        <div className="selected-flight">

          <div className="selected-flight-header">

            <h2>
              ✈️ {flight.airline}
            </h2>

            <span>
              Flight #{flight.id}
            </span>

          </div>

          <div className="selected-route">

            <div>

              <small>
                FROM
              </small>

              <strong>
                {flight.from}
              </strong>

            </div>

            <div className="route-arrow">
              ✈️
            </div>

            <div>

              <small>
                TO
              </small>

              <strong>
                {flight.to}
              </strong>

            </div>

          </div>

          <div className="flight-info-row">

            <div>

              <small>
                DURATION
              </small>

              <strong>
                {flight.duration}
              </strong>

            </div>

            <div>

              <small>
                PRICE / TRAVELER
              </small>

              <strong>
                {flight.price}
              </strong>

            </div>

          </div>

        </div>

        {/* PASSENGER FORM */}

        <form onSubmit={handleBooking}>

          <h2 className="form-title">
            Passenger Details
          </h2>

          <div className="form-grid">

            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name *
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email *
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                readOnly
              />

            </div>

            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number *
              </label>

              <input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />

            </div>

            {/* ID */}

            <div className="form-group">

              <label>
                ID / Passport Number *
              </label>

              <input
                type="text"
                placeholder="Enter ID or passport number"
                value={idNumber}
                onChange={(e) =>
                  setIdNumber(e.target.value)
                }
              />

            </div>

            {/* TRAVEL DATE */}

            <div className="form-group">

              <label>
                Travel Date *
              </label>

              <input
                type="date"
                value={travelDate}
                min={today}
                onChange={(e) =>
                  setTravelDate(e.target.value)
                }
              />

            </div>

            {/* TRAVELERS */}

            <div className="form-group travelers-group">

              <label>
                Number of Travelers *
              </label>

              <input
                type="number"
                min="1"
                value={travelers}
                onChange={(e) =>
                  setTravelers(
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                }
              />

            </div>

          </div>

          {/* SELECTED DATE */}

          {travelDate && (
            <div className="selected-travel-date">

              <span>
                📅 Selected Travel Date
              </span>

              <strong>
                {formatDate(travelDate)}
              </strong>

            </div>
          )}

          {/* TOTAL */}

          <div className="flight-total">

            <span>
              Total Flight Price
            </span>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>

          <button
            type="submit"
            className="confirm-flight-btn"
          >
            Confirm Flight Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default FlightBooking;