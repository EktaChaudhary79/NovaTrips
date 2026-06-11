import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/destinations")
      .then((res) => setDestinations(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">

      <div className="packages-section">
        <h4>POPULAR DESTINATIONS</h4>
        <h2>Explore Amazing Destinations</h2>
      </div>

      <div className="card-grid">

        {destinations.map((d) => (
          <div className="card" key={d.id}>

            <div className="destination-image-wrapper">
              <img
                src={d.image}
                alt={d.name}
                className="destination-image"
              />
            </div>

            <h3>📍 {d.name}</h3>

            <p className="destination-description">
              {d.description}
            </p>

            <button
              className="book-btn"
              onClick={() => navigate(`/destination/${d.id}`)}
            >
              View Packages
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Destinations;