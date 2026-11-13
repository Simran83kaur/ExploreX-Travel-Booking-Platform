import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Booking.css";

function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const destination = state?.destination || "";
  const basePrice = state?.price || "";

  const hotel = state?.hotel || {};
  const flight = state?.flight || {};

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState(1);

  const [notification, setNotification] = useState(null);

  // ================= CHECK LOGIN =================

  useEffect(() => {
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("explorexUser");

    // Not logged in
    if (!savedUser) {
      navigate("/login", {
        replace: true,
        state: {
          returnTo: "/booking",
          bookingData: state,
        },
      });

      return;
    }

    // Logged in
    try {
      const user = JSON.parse(savedUser);

      // Automatically use logged-in user's details
      if (user?.name) {
        setName(user.name);
      }

      if (user?.email) {
        setEmail(user.email);
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("explorexUser");

      navigate("/login", {
        replace: true,
        state: {
          returnTo: "/booking",
          bookingData: state,
        },
      });

      return;
    }

    setIsCheckingLogin(false);
  }, [navigate, state]);

  // ================= PRICE =================

  const numericPrice =
    Number(basePrice.toString().replace(/[₹,]/g, "")) || 0;

  const totalPrice = numericPrice * travelers;

  // ================= BOOKING =================

  function handleBooking(e) {
    e.preventDefault();

    // Double-check login before creating booking
    const savedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("explorexUser");

    if (!savedUser) {
      navigate("/login", {
        state: {
          returnTo: "/booking",
          bookingData: state,
        },
      });

      return;
    }

    // Validation
    if (!name || !email || !date) {
      setNotification({
        type: "error",
        title: "Almost there!",
        message: "Please fill in all the required details.",
        icon: "⚠️",
      });

      return;
    }

    const booking = {
      id: Date.now(),

      name,
      email,

      destination,

      price: `₹${totalPrice.toLocaleString("en-IN")}`,

      basePrice,

      travelers,

      travelDate: date,

      hotel: hotel.name,

      hotelDetails: {
        stars: hotel.stars,
        room: hotel.room,
        meals: hotel.meals,
      },

      flight: flight.airline,

      flightDetails: {
        from: flight.from,
        to: flight.to,
        class: flight.class,
        time: flight.time,
      },
    };

    const existingBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    existingBookings.push(booking);

    localStorage.setItem(
      "bookings",
      JSON.stringify(existingBookings)
    );

    // Success notification
    setNotification({
      type: "success",
      title: "Trip Confirmed!",
      message: `Your journey to ${destination} has been successfully booked.`,
      icon: "✈️",
    });

    // Go to My Bookings
    setTimeout(() => {
      navigate("/my-bookings");
    }, 2200);
  }

  // ================= LOADING =================

  if (isCheckingLogin) {
    return (
      <div className="booking-page">
        <div className="container py-5">
          <div className="card shadow p-4 booking-card text-center">
            <h3>Checking your account...</h3>
          </div>
        </div>
      </div>
    );
  }

  // ================= PAGE =================

  return (
    <div className="booking-page">

      {/* CUSTOM NOTIFICATION */}

      {notification && (
        <div
          className={`booking-notification ${notification.type}`}
        >
          <div className="notification-icon">
            {notification.icon}
          </div>

          <div className="notification-content">
            <h3>{notification.title}</h3>

            <p>{notification.message}</p>
          </div>

          <button
            className="notification-close"
            onClick={() => setNotification(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="container py-5">

        <div className="card shadow p-4 booking-card">

          <h2 className="mb-4 text-center">
            Book Your Trip
          </h2>

          {/* DESTINATION */}

          <div className="mb-3">

            <label className="form-label">
              Destination
            </label>

            <input
              className="form-control"
              value={destination}
              readOnly
            />

          </div>

          {/* PACKAGE INCLUDES */}

          <div className="border border-success rounded mb-4">

            <div className="bg-success text-white p-2">
              Package Includes
            </div>

            {/* FLIGHT */}

            <div className="p-3">

              <h5>
                ✈️ Flight Included
              </h5>

              <p>
                <strong>Airline:</strong>{" "}
                {flight.airline}
              </p>

              <p>
                <strong>Route:</strong>{" "}
                {flight.from} → {flight.to}
              </p>

              <p>
                <strong>Class:</strong>{" "}
                {flight.class}
              </p>

              <p>
                <strong>Departure Time:</strong>{" "}
                {flight.time}
              </p>

            </div>

            <hr />

            {/* HOTEL */}

            <div className="p-3">

              <h5>
                🏨 Hotel Included
              </h5>

              <p>
                <strong>Hotel:</strong>{" "}
                {hotel.name}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {hotel.stars}
              </p>

              <p>
                <strong>Room:</strong>{" "}
                {hotel.room}
              </p>

              <p>
                <strong>Meals:</strong>{" "}
                {hotel.meals}
              </p>

            </div>

          </div>

          {/* PACKAGE PRICE */}

          <div className="mb-3">

            <label className="form-label">
              Package Price per Traveler
            </label>

            <input
              className="form-control"
              value={basePrice}
              readOnly
            />

          </div>

          {/* TOTAL PRICE */}

          <div className="mb-3">

            <label className="form-label">
              Total Package Price
            </label>

            <input
              className="form-control"
              value={`₹${totalPrice.toLocaleString("en-IN")}`}
              readOnly
            />

          </div>

          {/* NAME */}

          <div className="mb-3">

            <label className="form-label">
              Name
            </label>

            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Enter your name"
            />

          </div>

          {/* EMAIL */}

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
            />

          </div>

          {/* TRAVEL DATE */}

          <div className="mb-3">

            <label className="form-label">
              Travel Date
            </label>

            <input
              type="date"
              className="form-control"
              value={date}
              onChange={(e) =>
                setDate(e.target.value)
              }
            />

          </div>

          {/* TRAVELERS */}

          <div className="mb-4">

            <label className="form-label">
              Travelers
            </label>

            <input
              type="number"
              min="1"
              className="form-control"
              value={travelers}
              onChange={(e) =>
                setTravelers(
                  Math.max(1, Number(e.target.value))
                )
              }
            />

          </div>

          {/* CONFIRM */}

          <button
            type="button"
            onClick={handleBooking}
            className="btn btn-primary w-100 booking-confirm-btn"
          >
            Confirm Booking
          </button>

        </div>

      </div>

    </div>
  );
}

export default Booking;