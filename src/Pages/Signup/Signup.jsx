import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !phoneNumber) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("/api/Auth/RegisterUser", {
        username,
        email,
        password,
        phoneNumber,
      });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <div className="login-page">
      {/* Left Section: Form */}
      <div className="form-section">
        <div className="form-container">
          <div className="flex flex-row">
            <img
              src="/images/The pet.png"
              alt="TheCubeFactory"
              className="logo"
            />
            <img
              src="/images/feet.png"
              alt="TheCubeFactory"
              className="logo ms-3"
            />
          </div>

          <h2>Welcome!</h2>
          <p>Sign up to access all features</p>

          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />

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
                {showPassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </span>
            </div>

            {errorMessage && <p className="error-text">{errorMessage}</p>}

            <button type="submit" className="login-btn">
              Sign up
            </button>

            <button type="button" className="google-btn">
              <img src="/google-icon.svg" alt="Google" />
              Sign up with Google
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>

      {/* Right Section: Illustration */}
      <div className="illustration-section">
        <img
          src="/images/login.jpeg"
          alt="Signup Illustration"
          className="illustration"
        />
      </div>
    </div>
  );
};

export default Signup;
