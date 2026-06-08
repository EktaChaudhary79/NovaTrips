import { useEffect, useState } from "react";
import API from "../api";

function AdminBookings() {
const [bookings, setBookings] = useState([]);

const loadBookings = () => {
API.get("/bookings")
.then((res) => setBookings(res.data))
.catch((err) => console.log(err));
};

useEffect(() => {
loadBookings();
}, []);

const updateStatus = async (
id,
status,
payment_status
) => {
try {
await API.put(`/bookings/update/${id}`, {
status,
payment_status
});


  loadBookings();
} catch (err) {
  console.log(err);
}


};

return ( <div className="container">


  <div className="admin-page-header">
    <h1>Manage Bookings</h1>
    <p>{bookings.length} bookings in the system</p>
  </div>

  <div className="admin-table-wrapper">

    <table className="admin-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Reference</th>
          <th>Name</th>
          <th>Travel Date</th>
          <th>Travelers</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>

        {bookings.map((booking) => (

          <tr key={booking.id}>

            <td>{booking.id}</td>

            <td>{booking.booking_reference}</td>

            <td>{booking.full_name}</td>

            <td>
              {new Date(
                booking.booking_date
              ).toLocaleDateString()}
            </td>

            <td>{booking.travelers}</td>

            <td>
  ₹{booking.total_amount || "0.00"}
</td>

            <td>{booking.status}</td>

            <td>{booking.payment_status}</td>

            <td>

              <button
                className="action-btn warning-btn"
                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Approved",
                    booking.payment_status
                  )
                }
              >
                Approve
              </button>

              <button
                className="action-btn delete-btn"
                onClick={() =>
                  updateStatus(
                    booking.id,
                    "Cancelled",
                    booking.payment_status
                  )
                }
              >
                Cancel
              </button>

              <button
                className="action-btn edit-btn"
                onClick={() =>
                  updateStatus(
                    booking.id,
                    booking.status,
                    "Paid"
                  )
                }
              >
                Mark Paid
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</div>


);
}

export default AdminBookings;
