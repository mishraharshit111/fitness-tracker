import React from "react";

const HabitItem = ({ habit, onToggle, onDelete }) => {
  return (
    <div className={`habit-item ${habit.completed ? "completed" : ""}`}>
      <span onClick={() => onToggle(habit._id)}>{habit.name}</span>
      <button className="delete-btn" onClick={() => onDelete(habit._id)}>
        Delete
      </button>
      <div className={`habit-item ${habit.completed ? "completed" : ""}`}>
  <span onClick={() => onToggle(habit._id)}>
    {habit.name} <span className="streak">🔥 {habit.streak} days</span>
  </span>
  <button className="delete-btn" onClick={() => onDelete(habit._id)}>Delete</button>
</div>

    </div>
    
  );
};

export default HabitItem;
