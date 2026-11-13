import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <h2>
            Explore<span>X</span>
          </h2>

          <p>
            Plan smarter, travel better and create
            unforgettable memories with ExploreX.
          </p>

          <div className="footer-socials">
            <a href="#">Instagram</a>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
          </div>

        </div>


        {/* QUICK LINKS */}
        <div className="footer-column">

          <h3>Explore</h3>

          <a href="/">Home</a>
          <a href="/destinations">Destinations</a>
          <a href="/flights">Flights</a>
          <a href="/hotels">Hotels</a>

        </div>


        {/* TRAVEL */}
        <div className="footer-column">

          <h3>Travel</h3>

          <a href="/my-bookings">My Bookings</a>
          <a href="/contact">Contact</a>

        </div>


        {/* CONTACT */}
        <div className="footer-column">

          <h3>Contact</h3>

          <p>📍 India</p>
          <p>📧 support@explorex.com</p>
          <p>📞 +91 xxxxx xxxxx</p>

        </div>

      </div>


      {/* BOTTOM */}
      <div className="footer-bottom">

        <p>
          © 2026 ExploreX. All rights reserved.
        </p>

        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
        </div>

      </div>

    </footer>
  );
}

export default Footer;