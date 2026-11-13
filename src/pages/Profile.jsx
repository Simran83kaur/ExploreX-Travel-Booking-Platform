import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("explorexUser");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error("Profile error:", error);
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  return (
    <div className="container py-5">

      <div className="card shadow p-4">

        <h2 className="mb-4">
          My Profile
        </h2>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {user.phone || "Not added"}
        </p>

        <p>
          <strong>Country:</strong>{" "}
          {user.country || "India"}
        </p>

        <p>
          <strong>Member Since:</strong>{" "}
          {user.createdAt
            ? new Date(user.createdAt).getFullYear()
            : "2026"}
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate("/my-bookings")}
        >
          My Bookings
        </button>

      </div>

    </div>
  );
}

export default Profile;