import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const Timetable = ({ days, times, events, onEditEvent, onDeleteEvent }) => {
  // Helper function to convert display time (e.g., "9:00 AM") to numeric value (e.g., 9)
  
  
  
  const parseTimeToNumeric = (timeString) => {
    const [hour, minuteWithPeriod] = timeString.split(':');
    const [minute, period] = minuteWithPeriod.split(' ');
    let numericHour = parseInt(hour);
    if (period === 'PM' && numericHour !== 12) {
      numericHour += 12;
    }
    if (period === 'AM' && numericHour === 12) {
      numericHour = 0;
    }
    return numericHour;
  };

  // Debug: Log the events prop to see what data is being received
  console.log("Timetable events:", events);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 border-b border-r bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Time
              </th>
              {days.map(day => (
                <th key={day} className="p-3 border-b border-r bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time, timeIndex) => (
              <tr key={time} className="border-b">
                <td className="p-3 border-r text-xs text-gray-500">
                  {time}
                </td>
                {days.map(day => {
                  // Convert the display time to a numeric value for comparison
                  const numericTime = parseTimeToNumeric(time);

                  // Debug: Log the comparison values
                  console.log(`Checking for events at ${time} (${numericTime}) on ${day}`);

                  // Find events for this specific time and day
                  const eventsAtTimeAndDay = events.filter(event => {
                    const matchesTime = event.startTime === numericTime;
                    const matchesDay = event.Day === day;
                    console.log(`Event:`, event, `Matches Time: ${matchesTime}, Matches Day: ${matchesDay}`);
                    return matchesTime && matchesDay;
                  });

                  // Debug: Log the filtered events for this time and day
                  console.log(`Events at ${time} on ${day}:`, eventsAtTimeAndDay);

                  return (
                    <td key={`${day}-${time}`} className="p-1 border-r relative min-h-[60px]">
                      {eventsAtTimeAndDay.map(event => (
                        <div
                          key={event.eventId}
                          className={`p-2 rounded-md mb-1 text-xs relative ${
                            event.classType === 'Theory' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-[#287f93]'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{event.classType} class</span>
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onEditEvent(event);
                                }}
                                className="text-gray-500 hover:text-gray-700"
                                title="Edit"
                              >
                                <Edit size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onDeleteEvent(event.eventId);
                                }}
                                className="text-red-500 hover:text-red-700"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="mt-1">
                            {event.classType} class
                          </div>
                          <div className="mt-1">
                            Duration: {event.Duration} hour{event.Duration !== 1 ? 's' : ''}
                          </div>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;