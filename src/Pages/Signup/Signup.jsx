import React, { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [userType, setUserType] = useState("User");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <div className="signup">
      {/* Left Side: Form */}
      <div className="signup-form">
        <h1>Welcome!</h1>
        <h2>Sign up to access all features</h2>

        {/* Full Name */}
        <div className="input-container">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="input-field"
          />
        </div>

        {/* Email */}
        <div className="input-container">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="input-field"
          />
        </div>

        {/* Phone Number */}
        <div className="input-container">
          <label>Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            className="input-field"
          />
        </div>

        {/* Password Input */}
        <div className="input-container">
          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input-field"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"}
            </span>
          </div>
        </div>

        {/* Sign in as */}
        <div className="radio-container">
          <span>Sign in as: </span>
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="User"
              checked={userType === "User"}
              onChange={handleUserTypeChange}
            />
            User
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="userType"
              value="Doctor"
              checked={userType === "Doctor"}
              onChange={handleUserTypeChange}
            />
            Doctor
          </label>
        </div>

        {/* Buttons */}
        <button className="button">Log In</button>
        <button className="google-button">Continue with Google</button>

        {/* Register Link */}
        <p className="register-text">
          Don’t have an account?{" "}
          <a href="/register" className="register-link">
            Register
          </a>
        </p>
      </div>

      {/* Right Side: Image */}
      <img src={"/images/care.jpeg"} alt="Sign Up" className="signup-image" />
    </div>
  );
};

export default Signup;