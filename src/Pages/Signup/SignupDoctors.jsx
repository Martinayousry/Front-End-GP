import React, { useState } from "react"; // Import useState
import "./DoctorSignup.css"; // Import the CSS file

const DoctorSignup = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  return (
    <div className="doctor-signup">
      {/* Left Side: Form */}
      <div className="signup-form">
        <h1>Welcome!</h1>
        <p>Sign up to access all features</p>

        {/* Full Name */}
        <div className="input-container">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
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

        {/* Email Address */}
        <div className="input-container">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email address"
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

        {/* Sign Up Button */}
        <button className="button">Sign up</button>

        {/* Continue with Google */}
        <button className="button google-button">Login with Google</button>

        {/* Register Link */}
        <p className="register-text">
          Don’t have an account?{" "}
          <a href="/register" className="register-link">
            Register
          </a>
        </p>

        {/* Sign up as a Doctor */}
        <p className="doctor-text">
          <a href="/doctor-signup" className="doctor-link">
            Sign up as a Doctor
          </a>
        </p>
      </div>

      {/* Right Side: Image */}
      <img src={"signup.jpg"} alt="Sign Up" className="signup-image" />
      {/* <div className="image-container">
        <img src={'signup.jpg'} alt="Sign Up" className="signup-image" />
      </div> */}
    </div>
  );
};

export default DoctorSignup;