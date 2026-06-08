import { useEffect, useState } from "react";
import API from "../api";

function Destinations() {
  const [destinations, setDestinations] = useState([]);

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

            <h3>📍 {d.name}</h3>

            <p>{d.location}</p>

            <button className="book-btn">
              View Details
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Destinations;