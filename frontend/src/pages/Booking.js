import API from "../api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Booking() {

const { id } = useParams();

const [packageData, setPackageData] = useState(null);

useEffect(() => {


API.get(`/packages/${id}`)
  .then((res) => {
    setPackageData(res.data);
  })
  .catch((err) => console.log(err));


}, [id]);

const [formData, setFormData] = useState({
fullName: "",
email: "",
phone: "",
travelers: 1,
travelDate: "",
specialRequests: ""
});

const totalAmount =
(packageData?.price || 0) * formData.travelers;

const handleChange = (e) => {


setFormData({
  ...formData,
  [e.target.name]: e.target.value
});


};

const handleSubmit = async (e) => {


e.preventDefault();

try {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  await API.post("/bookings/add", {

    user_id: user.id,

    package_id: id,

    booking_date: formData.travelDate,

    full_name: formData.fullName,

    email: formData.email,

    phone: formData.phone,

    travelers: formData.travelers,

    special_requests: formData.specialRequests,

    total_amount: totalAmount,

    status: "Pending",

    payment_status: "Pending"

  });

  alert("Booking Submitted Successfully");

} catch (error) {

  console.log(error.response);
  console.log(error);

  alert("Failed To Create Booking");

}


};

return (


<div className="container">

  {packageData && (

    <div className="booking-banner">

      <img
        src={
          packageData.image ||
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
        }
        alt={packageData.title}
        className="booking-banner-image"
      />

      <div className="booking-banner-overlay">

        <h1>{packageData.title}</h1>

        <div className="booking-banner-meta">
          <span>₹{packageData.price}</span>
          <span>•</span>
          <span>{packageData.duration}</span>
        </div>

      </div>

    </div>

  )}

  <div className="booking-form-container">

    <div className="booking-heading">

  <h1>Book Your Trip</h1>

  <p>
    Complete the details below to confirm your journey.
  </p>

</div>

    <form
  onSubmit={handleSubmit}
  className="booking-form"
>

      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="travelers"
        placeholder="Number of Travelers"
        onChange={handleChange}
        required
      />

      <div className="booking-total">
        Total Amount: ₹{totalAmount.toLocaleString()}
      </div>

      <input
        type="date"
        name="travelDate"
        onChange={handleChange}
        required
      />

      <textarea
        name="specialRequests"
        placeholder="Special Requests (Optional)"
        onChange={handleChange}
      ></textarea>

      <button
        type="submit"
        className="book-btn"
      >
        Confirm Booking
      </button>

    </form>

  </div>

</div>


);
}

export default Booking;
