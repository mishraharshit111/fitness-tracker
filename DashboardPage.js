import React, { useEffect, useState } from "react";
import AddHabitForm from "../components/AddHabitForm";
import HabitList from "../components/HabitList";
import ProgressChart from "../components/ProgressChart";
import OverallProgressChart from "../components/OverallProgressChart";

import { 
  fetchHabits, 
  addHabit as addHabitAPI, 
  toggleHabit as toggleHabitAPI, 
  deleteHabit as deleteHabitAPI, 
  updateHabitAPI 
} from "../services/api";

const DashboardPage = ({ onLogout }) => {
  const [habits, setHabits] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch habits from backend
  useEffect(() => {
    const loadHabits = async () => {
      if (!token) return;
      try {
        const data = await fetchHabits(token);
        setHabits(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching habits:", error);
        setHabits([]);
      }
    };
    loadHabits();
  }, [token]);

  // Add a new habit
  const addHabit = async (habit) => {
    try {
      const newHabit = await addHabitAPI(token, habit);
      setHabits(prev => [newHabit, ...prev]);
    } catch (error) {
      console.error("Error adding habit:", error);
      alert("Failed to add habit. Please try again.");
    }
  };

  // Toggle habit completion
  const toggleHabit = async (id) => {
    try {
      const updatedHabit = await toggleHabitAPI(token, id);
      setHabits(prev => prev.map(h => h._id === id ? updatedHabit : h));
    } catch (error) {
      console.error("Error toggling habit:", error);
    }
  };

  // Delete habit
  const deleteHabit = async (id) => {
    try {
      await deleteHabitAPI(token, id);
      setHabits(prev => prev.filter(h => h._id !== id));
    } catch (error) {
      console.error("Error deleting habit:", error);
      alert("Failed to delete habit.");
    }
  };

  // Update streak manually
  const updateStreak = async (id, newStreak) => {
    try {
      const updatedHabit = await updateHabitAPI(token, id, { streak: newStreak });
      setHabits(prev => prev.map(h => h._id === id ? updatedHabit : h));
    } catch (error) {
      console.error("Failed to update streak:", error);
      alert("Failed to update streak.");
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Fitness Tracker</h1>

      {/* Add new habit */}
      <AddHabitForm onAdd={addHabit} />

      {/* Habit list with toggle and delete */}
      <HabitList habits={habits} onToggle={toggleHabit} onDelete={deleteHabit} />

      {/* Individual habit progress chart */}
      <ProgressChart habits={habits} onUpdateStreak={updateStreak} />

      {/* Overall habit completion pie chart */}
      <OverallProgressChart habits={habits} />


      {/* Logout button */}
      <button 
        className="logout-btn" 
        onClick={() => {
          localStorage.removeItem("token");
          onLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardPage;
