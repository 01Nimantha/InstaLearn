import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const Timetable = ({ days, times, events, onEditEvent, onDeleteEvent }) => {
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
                  // Find events for this specific time and day
                  const eventsAtTimeAndDay = events.filter(
                    event => event.startTime === parseInt(time.split(':')[0]) && event.Day === day
                  );
                  
                  return (
                    <td key={`${day}-${time}`} className="p-1 border-r relative min-h-[60px]">
                      {eventsAtTimeAndDay.map(event => (
                        <div 
                          key={event.eventId}
                          className={`p-2 rounded-md mb-1 text-xs relative ${
                            event.classType === 'Theory' ? 'bg-pink-100 text-pink-800' :
                            'bg-blue-100 text-[#287f93]'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{event.classType} Class</span>
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