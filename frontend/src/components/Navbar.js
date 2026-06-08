import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
    window.location.reload();
  };

  return (
    <>
      

      {/* MAIN NAVBAR */}

      <nav className="navbar">
        <div className="logo">
  ✈ <span>NovaTrips</span>
</div>

        <div className="nav-links">

  <Link to="/">Home</Link>

  <Link to="/packages">Packages</Link>

  <Link to="/destinations">Destinations</Link>

{user && ( <Link to="/my-bookings">
My Bookings </Link>
)}

{user?.role === "admin" && ( <Link to="/admin">
Admin Panel </Link>
)}

</div>


        {user ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div className="user-profile">
  <div className="user-icon">
    <i className="fas fa-user"></i>
  </div>

  <span className="user-name">
    {user.name}
  </span>
</div>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">

  <Link to="/login">
    <button className="login-btn">
      👤 User Login
    </button>
  </Link>



  <Link to="/admin-login">
    <button className="admin-btn">
  🛡️ Admin Login
</button>
  </Link>

</div>
        )}
      </nav>
    </>
  );
}

export default Navbar;