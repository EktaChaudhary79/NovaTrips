import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function PackageDetails() {

const { id } = useParams();

const navigate = useNavigate();

const [pkg, setPkg] = useState(null);

const [reviews, setReviews] = useState([]);
const [canReview, setCanReview] = useState(false);
const [bookingId, setBookingId] = useState(null);
const [rating, setRating] = useState(5);
const [reviewText, setReviewText] = useState("");

useEffect(() => {

  API.get(`/packages/${id}`)
    .then((res) => setPkg(res.data))
    .catch((err) => console.log(err));

  API.get(`/reviews/package/${id}`)
    .then((res) => setReviews(res.data))
    .catch((err) => console.log(err));

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (user) {

    API.get(
      `/reviews/can-review/${user.id}/${id}`
    )
      .then((res) => {

        setCanReview(res.data.canReview);

        if (res.data.booking) {
          setBookingId(res.data.booking.id);
        }

      })
      .catch((err) => console.log(err));

  }

}, [id]);


if (!pkg) {
return ( <div className="container"> <h2>Package not found</h2> </div>
);
}

const highlights = pkg.highlights
? pkg.highlights.split(",")
: [];

const included = pkg.included
? pkg.included.split(",")
: [];

const excluded = pkg.excluded
? pkg.excluded.split(",")
: [];

const itinerary = pkg.itinerary
  ? pkg.itinerary.split(",")
  : [];


console.log(pkg);

const handleBooking = () => {

  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  navigate(`/booking/${id}`);
};

const submitReview = async () => {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  try {

    await API.post("/reviews/add", {
      user_id: user.id,
      package_id: id,
      booking_id: bookingId,
      rating,
      review: reviewText
    });

    alert("Review submitted for approval");

    window.location.reload();

  } catch (error) {
    console.log(error);
  }

};


return (
<div className="container">

  <div className="package-details">


<div className="details-left">

  <img
    src={pkg.image}
    alt={pkg.title}
    className="details-image"
  />

</div>

<div className="details-right">

  <h1>{pkg.title}</h1>

  <div className="details-meta">

    <span>📍 {pkg.location}</span>

    <span>🕒 {pkg.duration}</span>

  </div>

  <p>{pkg.description}</p>

  <div className="booking-card">

    <p className="starting-text">
      Starting From
    </p>

    <div className="booking-card">

  <span className="price-label">
    Starting From
  </span>

  <h2 className="details-price">
    ₹{pkg.price}
  </h2>

  <button
  className="book-btn"
  onClick={handleBooking}
>
  Book This Trip
</button>

</div>

  </div>

</div>


  </div>

  <div className="details-grid">


<div className="details-section">

  <h3>Trip Highlights</h3>

  <ul>

    {highlights.map((item, index) => (

      <li key={index}>
        {item.trim()}
      </li>

    ))}

  </ul>

</div>


<div className="details-section">

  <h3>Trip Itinerary</h3>

  <div className="timeline">

    {itinerary.map((day, index) => (

      <div className="timeline-item" key={index}>

        <div className="timeline-dot"></div>

        <div className="timeline-content">

  <span className="day-badge">
    DAY {index + 1}
  </span>

  <p>
    {day.replace(`Day ${index + 1}:`, "").trim()}
  </p>

</div>

      </div>

    ))}

  </div>

</div>


<div className="details-section">

  <h3>What's Included</h3>

  <ul>

    {included.map((item, index) => (

      <li key={index}>
        {item.trim()}
      </li>

    ))}

  </ul>

</div>

<div className="details-section">

  <h3>What's Not Included</h3>

  <ul>

    {excluded.map((item, index) => (

      <li key={index}>
        {item.trim()}
      </li>

    ))}

  </ul>

</div>

{/* REVIEW SECTION */}

<div
  className="details-section"
  style={{ marginTop: "40px" }}
>

  <h2>Customer Reviews</h2>

  {canReview && (

    <div className="review-form-card">

  <h3>Leave a Review</h3>

  <p className="review-subtitle">
    Share your experience with fellow travelers.
  </p>

  <div className="star-rating">

  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={
        star <= rating
          ? "star active"
          : "star"
      }
      onClick={() => setRating(star)}
    >
      ★
    </span>
  ))}

</div>

      <textarea
        rows="4"
        placeholder="Share your experience..."
        value={reviewText}
        onChange={(e) =>
          setReviewText(e.target.value)
        }
      />

      <button
        className="book-btn"
        onClick={submitReview}
      >
        Submit Review
      </button>

    </div>

  )}

  {!canReview && (

    <p>
      Only customers who have booked this package can leave a review.
    </p>

  )}

  {reviews.length === 0 ? (

    <p>No reviews yet.</p>

  ) : (

    reviews.map((review) => (

      <div
  key={review.id}
  className="review-card"
>

  <div className="review-header">

    <div>

      <h4>{review.name}</h4>

      <small>
        {new Date(
          review.created_at
        ).toLocaleDateString()}
      </small>

    </div>

    <div className="review-stars">
      {"⭐".repeat(review.rating)}
    </div>

  </div>

  <p>{review.review}</p>

</div>

    ))

  )}

</div>



  </div>


</div>

);
}

export default PackageDetails;
