import React, { useState } from "react";

const AddHabitForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [targetDays, setTargetDays] = useState(7); // default target is 7 days

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAdd({ name: name.trim(), targetDays: Number(targetDays) });
    setName("");
    setTargetDays(7); // reset to default after adding
  };

  return (
    <form className="add-habit-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new habit"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        max="365"
        value={targetDays}
        onChange={(e) => setTargetDays(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddHabitForm;
