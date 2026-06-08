import { useEffect, useState } from "react";
import API from "../api";

function MyBookings() {

const [bookings, setBookings] = useState([]);

useEffect(() => {

const user = JSON.parse(localStorage.getItem("user"));

API.get("/bookings/user/" + user.id)
  .then((res) => {
    setBookings(res.data);
  })
  .catch((err) => {
    console.log(err);
  });


}, []);

console.log(JSON.stringify(bookings[0], null, 2));

return ( <div className="container">


  <h1>My Bookings</h1>

  {bookings.map((booking) => (

    <div
  className="my-booking-card"
  key={booking.id}
>

  <img
    src={booking.image}
    alt={booking.title}
    className="my-booking-image"
  />

  <div className="my-booking-content">

    <h2>{booking.title}</h2>

    <p className="booking-location">
      📍 {booking.location}
    </p>

    <p className="booking-duration">
      🕒 {booking.duration}
    </p>

    <div className="booking-info-grid">

      <p>
        <strong>Booking Ref:</strong>
        {booking.booking_reference}
      </p>

      <p>
        <strong>Travel Date:</strong>
        {new Date(
          booking.booking_date
        ).toLocaleDateString()}
      </p>

      <p>
        <strong>Travelers:</strong>
        {booking.travelers}
      </p>

      <p>
        <strong>Total:</strong>
        ₹{Number(
          booking.total_amount
        ).toLocaleString()}
      </p>

    </div>

    <div className="booking-status-row">

      <span
        className={`status-badge ${booking.status.toLowerCase()}`}
      >
        {booking.status}
      </span>

      <span
        className={`payment-badge ${booking.payment_status.toLowerCase()}`}
      >
        {booking.payment_status}
      </span>

    </div>

  </div>

</div>
  ))}

</div>


);

}

export default MyBookings;
