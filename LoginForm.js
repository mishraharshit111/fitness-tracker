import React, { useState } from "react";
import { loginUser } from "../services/api";

const LoginForm = ({ onLogin, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const data = await loginUser(email, password);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        onLogin();
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
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
      <button type="submit">Login</button>

      <p className="link" onClick={switchToRegister}>
        Don’t have an account? Register
      </p>
    </form>
  );
};

export default LoginForm;
