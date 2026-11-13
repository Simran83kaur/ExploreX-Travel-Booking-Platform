import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();

    setError("");
    setShowSignup(false);

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save logged-in user
        localStorage.setItem(
          "explorexUser",
          JSON.stringify(data.user)
        );

        // Save token if backend provides one
        if (data.token) {
          localStorage.setItem("explorexToken", data.token);
        }

        // Tell Navbar that login has happened
        window.dispatchEvent(new Event("explorexAuthChanged"));

        // Return to the page the user wanted to book
        const returnTo = location.state?.returnTo;

        if (returnTo) {
          navigate(returnTo);
        } else {
          navigate("/");
        }
      } else {
        setError(data.message || "Invalid email or password.");

        if (
          data.message?.toLowerCase().includes("user not found") ||
          data.message?.toLowerCase().includes("not found")
        ) {
          setShowSignup(true);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Server Error. Please try again.");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h2>Login</h2>

        <p>Login to continue to ExploreX</p>

        <form onSubmit={handleLogin}>

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
            <div className="login-error">
              {error}
            </div>
          )}

          {showSignup && (
            <button
              type="button"
              className="signup-redirect-btn"
              onClick={() =>
                navigate("/signup", {
                  state: {
                    email: email,
                    returnTo: location.state?.returnTo,
                  },
                })
              }
            >
              Sign Up
            </button>
          )}

          <button type="submit">
            Login
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;