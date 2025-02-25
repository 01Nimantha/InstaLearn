import React, { useState } from "react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isToday } from "date-fns";
import EventForm from "./EventForm";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleAddEvent = (date, eventName) => {
    const dateKey = format(date, "yyyy-MM-dd");
    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateKey]: [...(prevEvents[dateKey] || []), eventName],
    }));
  };

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-4 py-2 bg-blue-500 text-white rounded">
          Previous
        </button>
        <h2 className="text-xl font-bold">{format(currentDate, "MMMM yyyy")}</h2>
        <button onClick={nextMonth} className="px-4 py-2 bg-blue-500 text-white rounded">
          Next
        </button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-bold">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayEvents = events[dateKey] || [];
          return (
            <div
              key={day}
              className={`p-2 text-center rounded cursor-pointer ${
                !isSameMonth(day, monthStart) ? "text-gray-400" : ""
              } ${isToday(day) ? "bg-blue-200" : ""}`}
              onClick={() => setSelectedDate(day)}
            >
              {format(day, "d")}
              {dayEvents.map((event, index) => (
                <div key={index} className="text-sm text-left text-green-600">
                  {event}
                </div>
              ))}
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <EventForm
          selectedDate={selectedDate}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

export default Calendar;