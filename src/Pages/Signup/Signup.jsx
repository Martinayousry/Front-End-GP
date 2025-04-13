import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  // const [showPassword, setShowPassword] = useState(false);
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

    const userData = {
      username: username,
      email: email,
      password: password,
      specialization: specialization,
      number: number,
      medicalId: medicalId,
    };

    try {
      const response = await axios.post("/api/Auth/RegisterDoctor", userData);
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (error) {
      console.error(
        "Error during registration:",
        error.response?.data || error.message
      );
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="signup mt-120">
      <div className="signup-form">
        <h1>Welcome!</h1>
        <h2>Sign up to access all features</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="input-container">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              className="input-field"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password</label>
            <div className="password-input">
              <input
                type="password"
                placeholder="Enter your password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁"}
              </span> */}
            </div>
          </div>
          <div className="input-container">
            <label>Specialization</label>
            <input
              type="text"
              placeholder="Enter your specialization"
              className="input-field"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Medical ID</label>
            <input
              type="text"
              placeholder="Enter your medical ID"
              className="input-field"
              value={medicalId}
              onChange={(e) => setMedicalId(e.target.value)}
            />
          </div>
          {errorMessage && <p className="error-text">{errorMessage}</p>}
          <button type="submit" className="button">
            Sign Up
          </button>
          <button type="button" className="google-button">
            Continue with Google
          </button>
        </form>
      </div>
      <img src={"/images/login.jpeg"} alt="Sign Up" className="signup-image" />
    </div>
  );
};

export default Signup;
