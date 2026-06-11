import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function DestinationPackages() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    API.get(`/destinations/${id}`)
      .then((res) => setDestination(res.data))
      .catch((err) => console.log(err));

    API.get(`/destinations/${id}/packages`)
      .then((res) => setPackages(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
  <>
    {destination && (
      <div
        className="destination-hero"
        style={{
          backgroundImage: `url(${destination.image})`,
        }}
      >
        <div className="destination-hero-overlay">
          <h1>{destination.name}</h1>
          <p>{destination.description}</p>
        </div>
      </div>
    )}

    <div className="container">

      <div className="destination-header">

  <div className="destination-title">
    <h4>DESTINATION PACKAGES</h4>
    <h2>Choose Your Perfect Package</h2>
  </div>

  <div className="package-stat-card">
    <h3>{packages.length}</h3>
    <p>Total Packages</p>
  </div>

</div>

      <div className="destination-packages-container">

        {packages.map((pkg) => (

          <div className="destination-package-card" key={pkg.id}>

            <img
  src={pkg.image}
  alt={pkg.title}
  className="destination-package-image"
/>

            <div className="destination-package-content">

  <span className="package-location">
    📍 {destination?.name}
  </span>

  <h3>{pkg.title}</h3>

  <p>{pkg.description}</p>

  <div className="package-meta">

    <span>🕒 5 Days / 4 Nights</span>

    <span>👥 2-6 People</span>

  </div>

  <div className="package-footer">

    <h4>₹{pkg.price}</h4>

    <button
      className="outline-btn"
      onClick={() => navigate(`/package/${pkg.id}`)}
    >
      View Details
    </button>

  </div>

</div>

          </div>

        ))}

      </div>

    </div>
  </>
);
}

export default DestinationPackages;