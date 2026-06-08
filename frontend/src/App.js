import PackageDetails from "./pages/PackageDetails";
import MyBookings from "./pages/MyBookings";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Destinations from "./pages/Destinations";
import Login from "./pages/Login";
import Booking from "./pages/Booking";

import AdminDashboard from "./pages/AdminDashboard";
import AdminBookings from "./pages/AdminBookings";
import AdminUsers from "./pages/AdminUsers";
import AdminPackages from "./pages/AdminPackages";
import AdminAddPackage from "./pages/AdminAddPackage";
import AdminEditPackage from "./pages/AdminEditPackage";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import AdminReviews from "./pages/AdminReviews";

import AdminLogin from "./pages/AdminLogin";

function App() {
return ( <Router> <Navbar />

  <Routes>
    <Route path="/" element={<Home />} />

    <Route path="/packages" element={<Packages />} />

    <Route path="/package/:id" element={<PackageDetails />} />

    <Route path="/booking/:id" element={<Booking />} />

    <Route path="/my-bookings" element={<MyBookings />} />

    <Route path="/destinations" element={<Destinations />} />

    <Route path="/login" element={<Login />} />

    <Route
      path="/admin"
      element={
        <ProtectedAdminRoute>
          <AdminDashboard />
        </ProtectedAdminRoute>
      }
    />

    <Route
      path="/admin/bookings"
      element={
        <ProtectedAdminRoute>
          <AdminBookings />
        </ProtectedAdminRoute>
      }
    />

    <Route
      path="/admin/users"
      element={
        <ProtectedAdminRoute>
          <AdminUsers />
        </ProtectedAdminRoute>
      }
    />

    <Route
      path="/admin/packages"
      element={
        <ProtectedAdminRoute>
          <AdminPackages />
        </ProtectedAdminRoute>
      }
    />

    <Route
      path="/admin/add-package"
      element={
        <ProtectedAdminRoute>
          <AdminAddPackage />
        </ProtectedAdminRoute>
      }
    />

    <Route
      path="/admin/edit-package/:id"
      element={
        <ProtectedAdminRoute>
          <AdminEditPackage />
        </ProtectedAdminRoute>
      }
    />

    <Route
      path="/admin/reviews"
      element={
        <ProtectedAdminRoute>
          <AdminReviews />
        </ProtectedAdminRoute>
      }
    />
      
      <Route
  path="/admin-login"
  element={<AdminLogin />}
/>


  </Routes>

  <Footer />
</Router>


);
}

export default App;
