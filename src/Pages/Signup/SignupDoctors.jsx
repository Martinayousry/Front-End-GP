import React, { useState } from "react"; // Import useState
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./SignupDoctors.css"; // Import the CSS file

const DoctorSignup = () => {
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [username, setUsername] = useState(""); // State for username
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !email || !password) {
      setErrorMessage("All fields are required!");
      return;
    }

    // Prepare the data to send in the request
    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      // Send POST request to the backend API
      const response = await axios.post("/api/Auth/RegisterUser", userData);
      console.log("Registration successful:", response.data);

      // Navigate to the login page after successful registration
      navigate("/login");
      // alert("Registration successful! Please log in.");
    } catch (error) {
      // Handle errors
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="doctor-signup">
      {/* Left Side: Form */}
      <div className="signup-form">
        <h1>Welcome!</h1>
        <p>Sign up to access all features</p>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="input-container">
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Email Address */}
          <div className="input-container">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="error-text">{errorMessage}</p>}

          {/* Sign Up Button */}
          <button className="button" type="submit">
            Sign up
          </button>
        </form>

        {/* Google Button (Optional) */}
        <button className="button google-button">Login with Google</button>

        {/* Sign up as a Doctor */}
        <p className="doctor-text">
          <a href="/signup" className="doctor-link">
            Sign up as a Doctor
          </a>
        </p>
      </div>

      {/* Right Side: Image */}
      <img src={"/images/login.jpeg"} alt="Sign Up" className="signup-image" />
    </div>
  );
};

export default DoctorSignup;
