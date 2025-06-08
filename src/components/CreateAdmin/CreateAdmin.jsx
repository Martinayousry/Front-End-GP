import React, { useState } from "react";
import "./CreateAdmin.css";

const CreateAdmin = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch("/api/Auth/RegisterAdmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("New admin created successfully.");
        setFormData({ username: "", email: "", password: "" });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Something went wrong.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="create-admin">
      <p className="title font-bold text-2xl border-b-1 border-gray-400 pb-4">
        Create New Admin
      </p>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="pt-10">
            <label htmlFor="username">Username</label> <br />
            <input
              type="text"
              id="username"
              name="username"
              className="input-field"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pt-10">
            <label htmlFor="email">Email</label> <br />
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pt-10">
            <label htmlFor="password">Password</label> <br />
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button my-12">
            Submit
          </button>
        </form>
        {message && <p className="msg font-lg mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default CreateAdmin;
