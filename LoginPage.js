import React, { useState } from "react";
import { loginUser, registerUser } from "../services/api";

const LoginPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, username } = form;
    
    if (!email || !password || (!isLogin && !username)) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      setLoading(true);
      if (isLogin) {
        const data = await loginUser({ email, password });
        if (data && data.token) {
          localStorage.setItem("token", data.token);
          alert("✅ " + (data.msg || "Login successful!"));
          onLogin(data.token);
        } else {
          throw new Error("Invalid login response");
        }
      } else {
        const data = await registerUser({ email, username, password });
        if (data && data.msg) {
          alert("✅ " + data.msg);
          setIsLogin(true);
          setForm(prev => ({ ...prev, password: "" }));
        } else {
          throw new Error("Invalid registration response");
        }
      }
    } catch (err) {
      alert(err.message || `${isLogin ? "Login" : "Registration"} failed!`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? (isLogin ? "Logging in..." : "Registering...") : (isLogin ? "Login" : "Register")}
        </button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <span
          className="link"
          onClick={() => {
            setIsLogin(!isLogin);
            setForm({ email: "", password: "", username: "" });
          }}
        >
          {isLogin ? "Register" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default LoginPage;