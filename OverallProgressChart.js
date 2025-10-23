import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const OverallProgressChart = ({ habits }) => {
  if (!habits || habits.length === 0) return null;

  // Calculate total completed vs remaining
  const totalDays = habits.reduce((sum, habit) => sum + (habit.targetDays || 0), 0);
  const totalCompleted = habits.reduce((sum, habit) => sum + (habit.streak || 0), 0);
  const totalRemaining = Math.max(totalDays - totalCompleted, 0);

  const data = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        label: "Overall Progress",
        data: [totalCompleted, totalRemaining],
        backgroundColor: ["#0ff", "#f0f"],
        borderColor: ["#0cc", "#f06"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="overall-progress-chart">
      <h3>Overall Progress</h3>
      <Pie data={data} />
    </div>
  );
};

export default OverallProgressChart;
