const API_BASE = "http://localhost:5000/api";

// API Headers
const defaultHeaders = { "Content-Type": "application/json" };
const authHeaders = token => ({ ...defaultHeaders, Authorization: `Bearer ${token}` });

// Auth APIs
export const registerUser = async ({ email, username, password }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ email, username, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Registration failed");
    return data;
  } catch (err) {
    console.error("Register API Error:", err.message);
    throw err;
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: defaultHeaders,
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Login failed");
    return data;
  } catch (err) {
    console.error("Login API Error:", err.message);
    throw err;
  }
};

// Habit APIs
export const fetchHabits = async (token) => {
  try {
    const res = await fetch(`${API_BASE}/habits`, {
      headers: authHeaders(token)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to fetch habits");
    return data || [];
  } catch (err) {
    console.error("Fetch Habits API Error:", err.message);
    return [];
  }
};

export const addHabit = async (token, habit) => {
  try {
    const res = await fetch(`${API_BASE}/habits`, {
      method: "POST",
      headers: authHeaders(token),
      body: JSON.stringify(habit)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to add habit");
    return data;
  } catch (err) {
    console.error("Add Habit API Error:", err.message);
    throw err;
  }
};

// Toggle habit
export const toggleHabit = async (token, habitId) => {
  const res = await fetch(`${API_BASE}/habits/${habitId}/toggle`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  });
  return res.json();
};


// Delete habit
export const deleteHabit = async (token, habitId) => {
  const res = await fetch(`${API_BASE}/habits/${habitId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  return res.json();
};

// Update habit (manual streak update)
export const updateHabitAPI = async (token, habitId, updates) => {
  try {
    const res = await fetch(`${API_BASE}/habits/${habitId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updates),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update habit");
    return data;
  } catch (err) {
    console.error("Update Habit API Error:", err.message);
    throw err;
  }
};

