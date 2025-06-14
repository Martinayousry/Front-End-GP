import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Reuse existing styling

const DoctorSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [number, setNumber] = useState("");
  const [medicalId, setMedicalId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !number || !specialization || !medicalId) {
      setErrorMessage("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("/api/Auth/RegisterDoctor", {
        username,
        email,
        password,
        specialization,
        number,
        medicalId,
      });
      console.log("Doctor registered:", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="login-page">
      {/* Left: Form */}
      <div className="form-section">
        <div className="form-container">
          <div className="flex flex-row">
            <img src="/images/The pet.png" alt="Logo" className="logo" />
            <img src="/images/feet.png" alt="Feet" className="logo ms-3" />
          </div>

          <h2>Welcome Doctor!</h2>
          <p>Sign up to start managing your patients</p>

          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
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

            <label>Specialization</label>
            <input
              type="text"
              placeholder="e.g. Cardiology"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />

            <label>Medical ID</label>
            <input
              type="text"
              placeholder="Enter your Medical ID"
              value={medicalId}
              onChange={(e) => setMedicalId(e.target.value)}
              required
            />

            {errorMessage && <p className="error-text">{errorMessage}</p>}

            <button type="submit" className="login-btn mt-5">
              Sign Up
            </button>

            {/* <button type="button" className="google-btn">
              <img src="/images/google-icon.svg" alt="Google" />
              Sign up with Google
            </button> */}
          </form>

          <p className="signup-text">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>

      {/* Right: Illustration */}
      <div className="illustration-section">
        <img
          src="/images/veterinarians-strip3.jpg"
          alt="Doctor Sign Up"
          className="illustration"
        />
      </div>
    </div>
  );
};

export default DoctorSignup;
