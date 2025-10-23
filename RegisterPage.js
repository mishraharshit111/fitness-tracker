// components/RegisterForm.js
import React, { useState } from "react";
import { registerUser } from "../services/api";

const RegisterForm = ({ switchToLogin }) => {
  const [form, setForm] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password } = form;
    if (!email || !username || !password) {
      alert("Please enter all details!");
      return;
    }
    try {
      setLoading(true);
      const data = await registerUser(form);
      alert("✅ Registration successful! You can now log in.");
      switchToLogin();
    } catch (err) {
      alert(err.message || "Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="link" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </div>
  );
};

export default RegisterForm;
