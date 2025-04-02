import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Calendar = ({ currentMonth, currentYear, events, onPrevMonth, onNextMonth, onDayHover }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const getMonthName = (month) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
  };

  const getEventsForDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return [];
    
    const dateDay = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
    return events.filter(event => event.day === dateDay);
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const calendarDays = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="text-center py-2"></div>);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(currentYear, currentMonth, i);
      const isToday = 
        i === today.getDate() && 
        currentMonth === today.getMonth() && 
        currentYear === today.getFullYear();
      
      const isPast = currentDate < today;
      const eventsOnDate = getEventsForDate(currentDate);
      const hasUpcomingEvent = eventsOnDate.length > 0;
      
      calendarDays.push(
        <div 
          key={i} 
          className={`text-center py-2 relative ${
            isToday ? 'bg-blue-100 rounded-full font-bold' : ''
          } ${isPast ? 'text-gray-400' : 'cursor-pointer hover:bg-gray-100'}`}
          onMouseEnter={(e) => !isPast && hasUpcomingEvent && onDayHover(currentDate, e.clientX, e.clientY)}
          onMouseLeave={() => onDayHover(null)}
        >
          {i}
          {hasUpcomingEvent && (
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
          )}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full">
      <h3 className="text-lg font-semibold mb-4">Calendar</h3>
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-medium">
          {getMonthName(currentMonth)} {currentYear}
        </h4>
        <div className="flex space-x-2">
          <button 
            onClick={onPrevMonth}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={onNextMonth}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;