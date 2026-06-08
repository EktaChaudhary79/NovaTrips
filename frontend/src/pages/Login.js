import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
  setFormData({
    name: "",
    email: "",
    password: "",
  });
}, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const res = await API.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        alert("Login Successful");

        navigate("/");
      } else {
        await API.post("/auth/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        alert("Registration Successful");

        setIsLogin(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-tabs">

          <button
            className={isLogin ? "active-tab" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>

          <button
            className={!isLogin ? "active-tab" : ""}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>

        </div>

        <h2>
          {isLogin
            ? "Welcome Back"
            : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">

          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
          )}

  <input
  type="email"
  name="loginEmail"
  placeholder="Email Address"
  value={formData.email}
  onChange={(e) =>
    setFormData({
      ...formData,
      email: e.target.value
    })
  }
  autoComplete="new-email"
/>

<input
  type="password"
  name="loginPassword"
  placeholder="Password"
  value={formData.password}
  onChange={(e) =>
    setFormData({
      ...formData,
      password: e.target.value
    })
  }
  autoComplete="new-password"
/>

          <button
            type="submit"
            className="auth-btn"
          >
            {isLogin ? "Login" : "Register"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;