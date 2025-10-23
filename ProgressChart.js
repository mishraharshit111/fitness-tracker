import React from "react";

const ProgressChart = ({ habits, onUpdateStreak }) => {
  if (!habits || habits.length === 0) return null; // prevent rendering if empty

  return (
    <div className="progress-chart-container">
      <h3>Progress</h3>
      {habits.map((habit) => (
        <div key={habit._id} className="habit-progress">
          <span className="habit-name">
            {habit.name} 🔥 {habit.streak || 0} / {habit.targetDays || 0} days
          </span>

          <input
            type="number"
            min="0"
            max={habit.targetDays || 0}
            value={habit.streak || 0}
            onChange={(e) =>
              onUpdateStreak(habit._id, Number(e.target.value))
            }
          />

          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${
                  habit.targetDays
                    ? ((habit.streak || 0) / habit.targetDays) * 100
                    : 0
                }%`,
                background: "linear-gradient(90deg, #0ff, #f0f, #0ff)",
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressChart;
