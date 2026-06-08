import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/auth/login", {
        email,
        password
      });

      if (res.data.user.role !== "admin") {

        alert("Access Denied");

        return;
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/admin");

    } catch (error) {

      alert("Invalid Credentials");

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Admin Email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="auth-btn"
          >
            Login as Admin
          </button>

        </form>

      </div>

    </div>

  );

}

export default AdminLogin;