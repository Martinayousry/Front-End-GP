import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useAuth } from "../../../src/Context/AuthContext";

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setUsernameError("");
    setPasswordError("");

    try {
      const res = await axios.post("/api/Auth/login", { username, password });
      await login(res.data.token);
      navigate("/");
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || "Invalid username or password";
      setUsernameError(errorMsg);
      setPasswordError(errorMsg);
    }
  };

  return (
    <div className="login">
      <div className="login-form">
        <h2>Welcome back!</h2>
        <p>Login to access all your data</p>

        <form onSubmit={handleLogin}>
          <label>username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          {usernameError && (
            <p className="error-textt text-red-500">{usernameError}</p>
          )}

          {/* Password Input */}
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
          {passwordError && <p className="error-text">{passwordError}</p>}

          {/* Login Button */}
          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>

        {/* Divider */}
        <div className="divider">Continue with</div>
        <button className="button google-button">Login with Google</button>

        <div className="register-text">
          Don’t have an account?{" "}
          <a href="/signup" className="register-link">
            Register
          </a>
        </div>
        <div className="asdoctor-signup">
          <a href="/doctor-signup">Sign up as a Doctor</a>
        </div>
      </div>

      <img
        src={"/images/login.jpeg"}
        alt="Login Page Illustration"
        className="login-image"
      />
    </div>
  );
};

export default Login;
