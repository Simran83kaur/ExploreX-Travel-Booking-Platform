import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./HotelBooking.css";

function HotelBooking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const hotel = state?.hotel;

  const [loggedInUser, setLoggedInUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);

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
          returnTo: "/hotel-booking",
          bookingData: state,
        },
      });

      return;
    }

    try {
      const user = JSON.parse(savedUser);

      setLoggedInUser(user);

      setName(user.name || "");
      setEmail(user.email || "");
    } catch (error) {
      console.error("User data error:", error);

      localStorage.removeItem("user");
      localStorage.removeItem("explorexUser");

      navigate("/login");
    }
  }, [navigate, state]);

  // ================= HOTEL NOT FOUND =================

  if (!hotel) {
    return (
      <div className="hotel-booking-page">

        <div className="hotel-error-card">

          <h2>Hotel Not Found</h2>

          <p>
            Please select a hotel before proceeding with the booking.
          </p>

          <button onClick={() => navigate("/hotels")}>
            Back to Hotels
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
      hotel.price
        .toString()
        .replace(/[₹,]/g, "")
        .replace(/\s*\/\s*Night/i, "")
    ) || 0;

  // ================= CALCULATE NIGHTS =================

  const calculateNights = () => {

    if (!checkIn || !checkOut) {
      return 0;
    }

    const start = new Date(checkIn + "T00:00:00");
    const end = new Date(checkOut + "T00:00:00");

    const difference = end - start;

    const nights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return nights > 0 ? nights : 0;
  };

  const nights = calculateNights();

  const totalPrice =
    numericPrice * nights * rooms;

  // ================= FORMAT DATE =================

  const formatDate = (date) => {

    if (!date) {
      return "Select date";
    }

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

    // Check login again before booking
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

    // Required fields
    if (
      !name ||
      !email ||
      !phone ||
      !idNumber ||
      !checkIn ||
      !checkOut
    ) {
      setNotification({
        type: "error",
        message:
          "Please fill in all the required details including check-in and check-out dates.",
      });

      return;
    }

    // Check dates
    if (checkOut <= checkIn) {

      setNotification({
        type: "error",
        message:
          "Check-out date must be after the check-in date.",
      });

      return;
    }

    // Email must belong to logged-in account
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
      "HT" + Date.now().toString().slice(-6);

    const booking = {

      id: bookingId,

      type: "hotel",

      name: currentUser.name || name,

      email: currentUser.email,

      phone,

      idNumber,

      destination: hotel.location,

      hotel: hotel.name,

      room: hotel.room,

      price:
        `₹${totalPrice.toLocaleString("en-IN")}`,

      basePrice: hotel.price,

      guests,

      rooms,

      nights,

      checkIn,

      checkOut,

      hotelDetails: {

        name: hotel.name,

        location: hotel.location,

        room: hotel.room,

        stars: hotel.stars,

        checkIn,

        checkOut,

      },

    };

    // Get existing bookings
    const existingBookings =
      JSON.parse(
        localStorage.getItem("bookings")
      ) || [];

    // Add new booking
    existingBookings.push(booking);

    // Save booking
    localStorage.setItem(
      "bookings",
      JSON.stringify(existingBookings)
    );

    // Show confirmation
    setConfirmedBooking(booking);

    setNotification({
      type: "success",
      message:
        "Your hotel has been successfully booked!",
    });
  }

  // ================= CONFIRMATION =================

  if (confirmedBooking) {

    return (
      <div className="hotel-booking-page">

        <div className="hotel-confirmation-card">

          <div className="hotel-confirmation-icon">
            ✓
          </div>

          <h1>
            Hotel Booking Confirmed!
          </h1>

          <p className="hotel-confirmation-message">
            Your hotel has been successfully booked.
          </p>

          <div className="hotel-booking-id-box">

            <span>
              Booking ID
            </span>

            <strong>
              {confirmedBooking.id}
            </strong>

          </div>

          <div className="hotel-confirmation-details">

            <div>
              <span>Guest Name</span>

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
              <span>Hotel</span>

              <strong>
                {confirmedBooking.hotel}
              </strong>
            </div>

            <div>
              <span>Location</span>

              <strong>
                {confirmedBooking.destination}
              </strong>
            </div>

            <div>
              <span>Room</span>

              <strong>
                {confirmedBooking.room}
              </strong>
            </div>

            <div>
              <span>Check-in</span>

              <strong>
                {formatDate(
                  confirmedBooking.checkIn
                )}
              </strong>
            </div>

            <div>
              <span>Check-out</span>

              <strong>
                {formatDate(
                  confirmedBooking.checkOut
                )}
              </strong>
            </div>

            <div>
              <span>Number of Nights</span>

              <strong>
                {confirmedBooking.nights}
              </strong>
            </div>

            <div>
              <span>Guests</span>

              <strong>
                {confirmedBooking.guests}
              </strong>
            </div>

            <div>
              <span>Rooms</span>

              <strong>
                {confirmedBooking.rooms}
              </strong>
            </div>

            <div>
              <span>Total Amount</span>

              <strong className="hotel-confirmation-price">
                {confirmedBooking.price}
              </strong>
            </div>

          </div>

          <div className="hotel-confirmation-buttons">

            <button
              className="hotel-my-bookings-btn"
              onClick={() =>
                navigate("/my-bookings")
              }
            >
              View My Bookings
            </button>

            <button
              className="hotel-back-btn"
              onClick={() =>
                navigate("/hotels")
              }
            >
              Book Another Hotel
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ================= BOOKING FORM =================

  return (
    <div className="hotel-booking-page">

      {/* NOTIFICATION */}

      {notification && (

        <div
          className={`hotel-notification ${notification.type}`}
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

      <div className="hotel-booking-container">

        <h1>
          Book Your Hotel
        </h1>

        <p className="hotel-booking-subtitle">
          Enter your details to complete your hotel booking.
        </p>

        {/* SELECTED HOTEL */}

        <div className="selected-hotel">

          <div className="selected-hotel-header">

            <div>

              <h2>
                🏨 {hotel.name}
              </h2>

              <p>
                {hotel.location}
              </p>

            </div>

            <span className="selected-hotel-stars">
              {hotel.stars}
            </span>

          </div>

          <div className="hotel-info-row">

            <div>

              <small>
                ROOM
              </small>

              <strong>
                {hotel.room}
              </strong>

            </div>

            <div>

              <small>
                PRICE / NIGHT
              </small>

              <strong>
                {hotel.price}
              </strong>

            </div>

          </div>

        </div>

        {/* FORM */}

        <form onSubmit={handleBooking}>

          <h2 className="form-title">
            Guest Details
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

            {/* CHECK IN */}

            <div className="form-group">

              <label>
                Check-in *
              </label>

              <input
                type="date"
                value={checkIn}
                min={today}
                onChange={(e) =>
                  setCheckIn(e.target.value)
                }
              />

            </div>

            {/* CHECK OUT */}

            <div className="form-group">

              <label>
                Check-out *
              </label>

              <input
                type="date"
                value={checkOut}
                min={checkIn || today}
                onChange={(e) =>
                  setCheckOut(e.target.value)
                }
              />

            </div>

            {/* GUESTS */}

            <div className="form-group">

              <label>
                Number of Guests *
              </label>

              <input
                type="number"
                min="1"
                value={guests}
                onChange={(e) =>
                  setGuests(
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                }
              />

            </div>

            {/* ROOMS */}

            <div className="form-group">

              <label>
                Number of Rooms *
              </label>

              <input
                type="number"
                min="1"
                value={rooms}
                onChange={(e) =>
                  setRooms(
                    Math.max(
                      1,
                      Number(e.target.value)
                    )
                  )
                }
              />

            </div>

          </div>

          {/* DATES */}

          {checkIn && checkOut && nights > 0 && (

            <div className="selected-hotel-dates">

              <div>

                <span>
                  📅 Check-in
                </span>

                <strong>
                  {formatDate(checkIn)}
                </strong>

              </div>

              <div>

                <span>
                  📅 Check-out
                </span>

                <strong>
                  {formatDate(checkOut)}
                </strong>

              </div>

              <div>

                <span>
                  🌙 Nights
                </span>

                <strong>
                  {nights}
                </strong>

              </div>

            </div>

          )}

          {/* TOTAL */}

          <div className="hotel-total">

            <div>

              <span>
                {hotel.price} × {nights || 0} night(s) × {rooms} room(s)
              </span>

              <small>
                Total hotel price
              </small>

            </div>

            <strong>
              ₹{totalPrice.toLocaleString("en-IN")}
            </strong>

          </div>

          {/* CONFIRM */}

          <button
            type="submit"
            className="confirm-hotel-btn"
          >
            Confirm Hotel Booking
          </button>

        </form>

      </div>

    </div>
  );
}

export default HotelBooking;