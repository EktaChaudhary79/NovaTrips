import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {

const [stats, setStats] = useState({
users: 0,
packages: 0,
bookings: 0,
revenue: 0
});

const [users, setUsers] = useState([]);

const [packages, setPackages] = useState([]);
const [bookings, setBookings] = useState([]);
const [reviews, setReviews] = useState([]);

useEffect(() => {
  API.get("/admin/stats")
    .then((res) => {
      setStats(res.data);
    });

  API.get("/users")
    .then((res) => {
      setUsers(res.data.slice(0, 3));
    });

  API.get("/packages")
    .then((res) => {
      setPackages(res.data.slice(0, 3));
    });

  API.get("/bookings")
    .then((res) => {
      setBookings(res.data.slice(0, 3));
    });

  API.get("/reviews")
    .then((res) => {
      setReviews(res.data.slice(0, 3));
    });
}, []);

return (
  <div className="admin-dashboard">

    <div className="admin-header">
      <div>
        <p className="admin-tag">ADMIN PANEL</p>
        <h1>Travel Management System</h1>
      </div>

      <Link
        to="/admin/add-package"
        className="add-package-btn"
      >
        Add Package
      </Link>
    </div>

    {/* Stats */}

    <div className="stats-grid">

      <div className="stats-card">
        <h2>{stats.users}</h2>
        <p>Total Users</p>
      </div>

      <div className="stats-card">
        <h2>{stats.packages}</h2>
        <p>Total Packages</p>
      </div>

      <div className="stats-card">
        <h2>{stats.bookings}</h2>
        <p>Total Bookings</p>
      </div>

      <div className="stats-card">
        <h2>₹{Number(stats.revenue).toLocaleString()}</h2>
        <p>Total Revenue</p>
      </div>

    </div>

    {/* Management Cards */}

<div className="management-grid">

  {/* Packages */}
  <div className="management-card users-preview-card">
    <h3>Packages</h3>

    {packages.map((pkg) => (
      <div key={pkg.id} className="mini-user-row">
        <span>{pkg.title}</span>
        <span>₹{pkg.price}</span>
      </div>
    ))}

    <Link
      to="/admin/packages"
      className="mini-view-btn"
    >
      View All Packages
    </Link>
  </div>

  {/* Bookings */}
  <div className="management-card users-preview-card">
    <h3>Bookings</h3>

    {bookings.map((booking) => (
      <div
        key={booking.id}
        className="mini-user-row"
      >
        <span>{booking.full_name}</span>
        <span
  className={
    booking.status === "Approved"
      ? "status-approved"
      : "status-pending"
  }
>
  {booking.status}
</span>
      </div>
    ))}

    <Link
      to="/admin/bookings"
      className="mini-view-btn"
    >
      View All Bookings
    </Link>
  </div>

  {/* Users */}
  <div className="management-card users-preview-card">
    <h3>Users Management</h3>

    {users.map((user) => (
      <div
        key={user.id}
        className="mini-user-row"
      >
        <span>{user.name}</span>
        <span
  className={
    user.role === "admin"
      ? "role-admin"
      : "role-user"
  }
>
  {user.role}
</span>
      </div>
    ))}

    <Link
      to="/admin/users"
      className="mini-view-btn"
    >
      View All Users
    </Link>
  </div>

  {/* Reviews */}
  <div className="management-card users-preview-card">
    <h3>Reviews</h3>

    {reviews.map((review) => (
      <div
        key={review.id}
        className="mini-user-row"
      >
        <span>{review.name}</span>
        <span>{"⭐".repeat(review.rating)}</span>
      </div>
    ))}

    <Link
      to="/admin/reviews"
      className="mini-view-btn"
    >
      View All Reviews
    </Link>
  </div>

</div>

</div>
);
}

export default AdminDashboard;