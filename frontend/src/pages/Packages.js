import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
  API.get("/packages")
    .then((res) => setPackages(res.data))
    .catch((err) => console.log(err));

  const searchTerm = searchParams.get("search");

  if (searchTerm) {
    setSearch(searchTerm);
  }
}, [searchParams]);

  const filteredPackages = [...packages]
    .filter((pkg) =>
      pkg.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <>
      {/* FULL WIDTH BANNER */}

      <div className="packages-banner">

        <div className="packages-banner-overlay">

          <h1>Explore Amazing Destinations</h1>

          <p>
            Discover handpicked travel experiences across India
            and around the world.
          </p>

        </div>

      </div>

      {/* EVERYTHING ELSE */}

      <div className="container">

        {/* SEARCH + SORT */}

        <div className="packages-toolbar">

          <input
            type="text"
            placeholder="Search destinations..."
            className="package-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="sort-wrapper">

            <select
              className="package-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
            </select>

          </div>

        </div>

        {/* HEADING */}

        <div className="packages-section">

          <h4>POPULAR PACKAGES</h4>

          <h2>Explore Our Best Travel Packages</h2>

        </div>

        {/* PACKAGES */}

        <div className="packages-container">

          {filteredPackages.map((pkg) => (
            <div className="package-card" key={pkg.id}>

              <div className="package-image-wrapper">

                <img
                  src={
                    pkg.image ||
                    "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                  }
                  alt={pkg.title}
                  className="package-image"
                />

                <span className="package-badge">
                  Popular
                </span>

              </div>

              <div className="package-content">

                <div className="package-location">
                  📍 {pkg.title}
                </div>

                <h3>{pkg.title}</h3>

                <p>{pkg.description}</p>

                <div className="package-meta">
                  <span>🕒 {pkg.duration}</span>
                  <span>👥 2-6 People</span>
                </div>

                <div className="package-footer">

                  <div>
                    <span className="old-price">
                      ₹{Math.round(pkg.price * 1.2)}
                    </span>

                    <h4 className="price">
                      ₹{pkg.price}
                    </h4>
                  </div>

                  <div className="package-actions">

                    <button
  className="details-btn"
  onClick={() => navigate(`/package/${pkg.id}`)}
>
  View Details
</button>

                    <button
  className="book-btn"
  onClick={() => navigate(`/package/${pkg.id}`)}
>
  Book Now
</button>

                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default Packages;