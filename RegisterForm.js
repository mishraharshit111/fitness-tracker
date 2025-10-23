import React, { useState } from "react";
import { registerUser } from "../services/api";

const RegisterForm = ({ switchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const data = await registerUser({ name, email, password });
      if (data?.token) {
        alert("Registration successful! Please login now.");
        switchToLogin();
      } else {
        alert("Registration failed. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error registering user.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Register</button>

      <p className="link" onClick={switchToLogin}>
        Already have an account? Login
      </p>
    </form>
  );
};

export default RegisterForm;
