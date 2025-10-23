import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";

import "./App.css";

export default function App() {
  const [page, setPage] = useState("login"); // login, register, dashboard
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) document.body.classList.remove("light-mode");
    else document.body.classList.add("light-mode");
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <div className="app-container">
      <button className="theme-toggle-btn" onClick={toggleTheme}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {page === "login" && (
        <LoginPage
          onLogin={() => setPage("dashboard")}
          onSwitchToRegister={() => setPage("register")}
        />
      )}
      {page === "register" && (
        <RegisterPage
          onRegister={() => setPage("login")}
          onSwitchToLogin={() => setPage("login")}
        />
      )}
      {page === "dashboard" && (
        <DashboardPage onLogout={() => setPage("login")} />
      )}
    </div>
  );
}
