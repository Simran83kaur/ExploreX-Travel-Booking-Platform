import "./Navbar.css";
import logo from "../assets/explorex.png";

import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("explorexUser")) || null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Update navbar immediately after login/signup/logout
  useEffect(() => {
    const updateUser = () => {
      try {
        const savedUser = JSON.parse(
          localStorage.getItem("explorexUser")
        );

        setUser(savedUser);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("explorexAuthChanged", updateUser);

    return () => {
      window.removeEventListener(
        "explorexAuthChanged",
        updateUser
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("explorexUser");
    localStorage.removeItem("explorexToken");

    setUser(null);

    window.dispatchEvent(new Event("explorexAuthChanged"));

    closeMenu();
    navigate("/");
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <img
            src={logo}
            alt="ExploreX Logo"
            className="logo-img"
          />
        </div>

        <ul className="nav-links">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          <li>
            <NavLink to="/destinations">Destinations</NavLink>
          </li>

          <li>
            <NavLink to="/flights">Flights</NavLink>
          </li>

          <li>
            <NavLink to="/hotels">Hotels</NavLink>
          </li>

          <li>
            <NavLink to="/my-bookings">My Bookings</NavLink>
          </li>

          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>

        <div className="right-section">
          <div className="account">

            <button className="account-btn">
              <FaUserCircle />

              <span>
                {user ? `Hi, ${user.name}` : "Account"}
              </span>
            </button>

            <div className="account-dropdown">

              {user ? (
                <>
                  <NavLink to="/profile">
                    Profile
                  </NavLink>

                  <NavLink to="/my-bookings">
                    My Bookings
                  </NavLink>

                  <button
                    onClick={handleLogout}
                    className="logout-btn"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    Login
                  </NavLink>

                  <NavLink to="/signup">
                    Sign Up
                  </NavLink>
                </>
              )}

            </div>
          </div>
        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <div
        className={`mobile-menu ${
          menuOpen ? "show-menu" : ""
        }`}
      >

        <div className="mobile-menu-header">
          <img
            src={logo}
            alt="ExploreX Logo"
            className="mobile-logo-img"
          />

          <button
            className="close-btn"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mobile-links">

          <NavLink to="/" onClick={closeMenu}>
            Home
          </NavLink>

          <NavLink
            to="/destinations"
            onClick={closeMenu}
          >
            Destinations
          </NavLink>

          <NavLink
            to="/flights"
            onClick={closeMenu}
          >
            Flights
          </NavLink>

          <NavLink
            to="/hotels"
            onClick={closeMenu}
          >
            Hotels
          </NavLink>

          <NavLink
            to="/my-bookings"
            onClick={closeMenu}
          >
            My Bookings
          </NavLink>

          <NavLink
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </NavLink>

        </div>

        <div className="mobile-account-buttons">

          {user ? (
            <>
              <NavLink
                to="/profile"
                className="mobile-login"
                onClick={closeMenu}
              >
                Profile
              </NavLink>

              <button
                className="mobile-signup"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="mobile-login"
                onClick={closeMenu}
              >
                Log in
              </NavLink>

              <NavLink
                to="/signup"
                className="mobile-signup"
                onClick={closeMenu}
              >
                Sign up
              </NavLink>
            </>
          )}

        </div>
      </div>
    </>
  );
}

export default Navbar;