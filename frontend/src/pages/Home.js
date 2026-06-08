import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function Home() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

useEffect(() => {
  API.get("/packages/popular")
    .then((res) => setPackages(res.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <div>

      {/* HERO */}

      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            EXPLORE. DREAM. DISCOVER.
          </p>

          <h1>
            Your Journey
            <br />
            <span>Starts Here</span>
          </h1>

          <p>
            Find the best travel packages and destinations
            at the best prices and make your trip unforgettable.
          </p>

          <button
  className="explore-btn"
  onClick={() => navigate("/packages")}
>
  Explore Packages
</button>

        </div>

      </section>



      {/* SEARCH BOX */}

      <section className="search-box">

        <div className="search-item">
          <label>Where To?</label>
          <input
  type="text"
  placeholder="Search destinations"
  value={destination}
  onChange={(e) => setDestination(e.target.value)}
/>
        </div>

        <div className="search-item">
          <label>Check In</label>
          <input
  type="date"
  value={checkIn}
  onChange={(e) => setCheckIn(e.target.value)}
/>
        </div>

        <div className="search-item">
          <label>Check Out</label>
          <input
  type="date"
  value={checkOut}
  onChange={(e) => setCheckOut(e.target.value)}
/>
        </div>

        <div className="search-item">
          <label>Guests</label>
          <input
  type="number"
  min="1"
  value={guests}
  onChange={(e) => setGuests(e.target.value)}
/>
        </div>

        <button
  className="search-btn"
  onClick={() =>
    navigate(
      `/packages?search=${encodeURIComponent(destination)}`
    )
  }
>
  Search
</button>

      </section>

      {/* POPULAR PACKAGES */}

      <section className="packages-section">

        <h4>POPULAR PACKAGES</h4>
        <h2>Best Selling Travel Packages</h2>

        <div className="home-packages-grid">

          {packages.map((pkg) => (

            <div className="home-package-card" key={pkg.id}>

              <img
                src={pkg.image}
                alt={pkg.title}
                className="home-package-image"
              />

              <div className="home-package-content">

  <div className="package-rating">
    ⭐⭐⭐⭐⭐
  </div>

  <h3>{pkg.title}</h3>

  <p>{pkg.description}</p>

  <div className="home-package-meta">
    <span>🕒 {pkg.duration}</span>
  </div>

  <div className="home-package-footer">

    <div>
      <small>Starting From</small>
      <h4>₹{pkg.price}</h4>
    </div>

    <button
  className="book-btn"
  onClick={() => navigate(`/package/${pkg.id}`)}
>
  Book Now
</button>

  </div>

</div>

            </div>

          ))}

        </div>

      </section>
            <section className="why-us">

  <h4>WHY CHOOSE US</h4>
  <h2>Why Travelers Love NovaTrips</h2>

  <div className="features-grid">

    <div className="feature-card">
      <h3>🛡️ Secure Booking</h3>
      <p>
        Safe and secure booking process with trusted payment methods.
      </p>
    </div>

    <div className="feature-card">
      <h3>💰 Best Price Guarantee</h3>
      <p>
        Get the best travel deals and exclusive discounts.
      </p>
    </div>

    <div className="feature-card">
      <h3>🎧 24/7 Support</h3>
      <p>
        Our travel experts are available anytime to help you.
      </p>
    </div>

    <div className="feature-card">
      <h3>🌍 Worldwide Destinations</h3>
      <p>
        Explore hundreds of destinations across the globe.
      </p>
    </div>

  </div>

</section>

    </div>
  );
}

export default Home;
