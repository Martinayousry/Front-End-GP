import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../src/Context/AuthContext";
import "./Login.css";

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
    <div className="login-page">
      {/* Left Section: Form */}
      <div className="form-section">
        <div className="form-container">
          <div className="flex flex-row">
          <img src="/images/The pet.png" alt="TheCubeFactory" className="logo" />
          <img src="/images/feet.png" alt="TheCubeFactory" className="logo ms-3" />
          </div>
      
          <h2>Welcome back</h2>
          <p>Please enter your details</p>

          <form onSubmit={handleLogin}>
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            {usernameError && (
              <p className="error-text">{usernameError}</p>
            )}

            <label>Password</label>
            <div className="password-field">
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
                {showPassword ? <i class="fa-regular fa-eye-slash"></i> : <i class="fa-regular fa-eye"></i>}
              </span>
            </div>
            {passwordError && (
              <p className="error-text">{passwordError}</p>
            )}

            <div className="options">
              <label>
                <input type="checkbox" /> Remember for 30 days
              </label>
              <a href="/forgot-password" className="link">
                Forgot password
              </a>
            </div>

            <button type="submit" className="login-btn mt-5">
              Sign in
            </button>

            {/* <button type="button" className="google-btn">
              <img src="/google-icon.svg" alt="Google" />
              Sign in with Google
            </button> */}
          </form>

          <p className="signup-text">
  Don’t have an account? <a href="/signup">Sign up</a> or{" "}
  <a href="/doctor-signup">Sign up as a Doctor</a>
</p>
        </div>
      </div>

      {/* Right Section: Illustration */}
      <div className="illustration-section">
        <img
          src="/images/login.jpeg"
          alt="Login Illustration"
          className="illustration"
        />
      </div>
    </div>
  );
};

export default Login;
