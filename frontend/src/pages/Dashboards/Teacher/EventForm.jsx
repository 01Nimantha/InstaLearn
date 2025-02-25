import React, { useState } from "react";

const EventForm = ({ selectedDate, onAddEvent }) => {
  const [eventName, setEventName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (eventName.trim()) {
      onAddEvent(selectedDate, eventName);
      setEventName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        placeholder="Event name"
        className="p-2 border rounded"
      />
      <button type="submit" className="ml-2 px-4 py-2 bg-green-500 text-white rounded">
        Add Event
      </button>
    </form>
  );
};

export default EventForm;