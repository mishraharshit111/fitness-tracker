import React from "react";

const HabitList = ({ habits, onToggle, onDelete }) => {
  if (!habits.length) return <p>No habits added yet.</p>;

  return (
    <div className="habit-list">
      {habits.map((habit) => (
        <div
          key={habit._id}
          className={`habit-item ${habit.completed ? "completed" : ""}`}
        >
          <span onClick={() => onToggle(habit._id)}>
            {habit.name} 🔥 {habit.streak || 0} days
          </span>
          <button className="delete-btn" onClick={() => onDelete(habit._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
