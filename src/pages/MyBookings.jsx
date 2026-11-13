import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("explorexUser");

    // User must be logged in
    if (!savedUser) {
      navigate("/login");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      const allBookings =
        JSON.parse(localStorage.getItem("bookings")) || [];

      // Show only bookings belonging to the logged-in user
      const userBookings = allBookings.filter(
        (booking) =>
          booking.email &&
          booking.email.toLowerCase() === user.email.toLowerCase()
      );

      setBookings(userBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
    }
  }, [navigate]);

  function cancelBooking(id) {
    const allBookings =
      JSON.parse(localStorage.getItem("bookings")) || [];

    // Remove only this user's selected booking
    const updatedAllBookings = allBookings.filter(
      (booking) => booking.id !== id
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updatedAllBookings)
    );

    // Update screen
    setBookings(
      updatedAllBookings.filter(
        (booking) =>
          booking.email &&
          booking.email.toLowerCase() ===
            JSON.parse(localStorage.getItem("explorexUser"))
              .email.toLowerCase()
      )
    );
  }

  return (
    <div className="container py-5">

      <h1 className="mb-4">
        My Bookings
      </h1>

      {bookings.length === 0 ? (

        <h4>No bookings found.</h4>

      ) : (

        bookings.map((booking) => (

          <div
            className="card p-3 mb-3 shadow"
            key={booking.id}
          >

            <h4>{booking.destination}</h4>

            <p>
              <strong>Booking ID:</strong>{" "}
              {booking.id}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {booking.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {booking.email}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {booking.date}
            </p>

            <p>
              <strong>Travelers:</strong>{" "}
              {booking.travelers}
            </p>

            <p>
              <strong>Price:</strong>{" "}
              {booking.price}
            </p>

            <button
              className="btn btn-danger"
              onClick={() => cancelBooking(booking.id)}
            >
              Cancel Booking
            </button>

          </div>

        ))

      )}

    </div>
  );
}

export default MyBookings;