// Format a date as "DD/MM/YYYY"
export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Calculate habit streaks (consecutive days completed)
export const calculateStreak = (habitLogs) => {
  // habitLogs = array of dates when habit was completed
  if (!habitLogs || habitLogs.length === 0) return 0;

  // Sort dates descending
  const sorted = habitLogs.map((d) => new Date(d)).sort((a, b) => b - a);

  let streak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0); // normalize time

  for (let i = 0; i < sorted.length; i++) {
    const diffDays = Math.round((today - sorted[i]) / (1000 * 60 * 60 * 24));

    if (diffDays === i) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
};

// Generate a random color (useful for chart bars or neon effects)
export const getRandomColor = () => {
  const colors = [
    "#00ffff", // cyan
    "#ff00ff", // magenta
    "#ffcc00", // yellow
    "#00ff00", // lime
    "#ff4500", // orange-red
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
