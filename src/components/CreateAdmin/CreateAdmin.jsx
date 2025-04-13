import React, { useState } from "react";
import "./CreateAdmin.css";

const CreateAdmin = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("New User created");
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
              required
            />
          </div>
          <button type="submit" className="submit-button my-12">
            Submit
          </button>
        </form>
        {message && (
          <p className="msg font-lg mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default CreateAdmin;