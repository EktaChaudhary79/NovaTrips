function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-col">
          <h2>✈ NovaTrips</h2>
          <p>
            Discover the world's most amazing destinations with
            affordable travel packages and unforgettable experiences.
          </p>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>

          <a href="/">Home</a>
          <a href="/packages">Packages</a>
          <a href="/destinations">Destinations</a>
          <a href="/login">Login</a>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>

          <p>📍 India</p>
          <p>📞 +91 98765 43210</p>
          <p>✉ info@novatrips.com</p>
        </div>

        <div className="footer-col">
          <h3>Follow Us</h3>

          <p>📘 Facebook</p>
          <p>📷 Instagram</p>
          <p>🐦 Twitter</p>
        </div>

      </div>

      <div className="footer-bottom">
        © 2025 NovaTrips. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;