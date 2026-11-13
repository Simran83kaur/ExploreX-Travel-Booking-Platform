import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {

        // Backend returns the newly created user
        if (data.user) {

          // Save the new user
          localStorage.setItem(
            "explorexUser",
            JSON.stringify(data.user)
          );

          // Save token if backend provides one
          if (data.token) {
            localStorage.setItem(
              "explorexToken",
              data.token
            );
          }

          // Tell Navbar that signup/login has happened
          window.dispatchEvent(
            new Event("explorexAuthChanged")
          );

          setSuccess("Account created successfully!");

          setTimeout(() => {
            const returnTo = location.state?.returnTo;

            if (returnTo) {
              navigate(returnTo);
            } else {
              navigate("/");
            }
          }, 800);

        } else {

          setSuccess(
            data.message || "Account created successfully!"
          );

          setTimeout(() => {
            navigate("/login", {
              state: {
                returnTo: location.state?.returnTo,
              },
            });
          }, 1000);
        }

      } else {
        setError(
          data.message || "Unable to create account."
        );
      }

    } catch (error) {
      console.error("Signup error:", error);
      setError("Server Error. Please try again.");
    }
  }

  return (
    <div className="signup-page">

      <div className="signup-card">

        <h2>Signup</h2>

        <p>Create your ExploreX account</p>

        <form onSubmit={handleSignup}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <div className="signup-error">
              {error}
            </div>
          )}

          {success && (
            <div className="signup-success">
              {success}
            </div>
          )}

          <button type="submit">
            Create Account
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;