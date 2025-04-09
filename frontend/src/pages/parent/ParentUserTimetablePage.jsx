import React, { useState, useEffect } from 'react';
import Calendar from '../Dashboards/Teacher/Calender';
import Timetable from '../Dashboards/Teacher/Timetable';
import axios from 'axios';

function ParentUserTimetablePage() {
  // Constants
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const times = [
    { value: 8, display: '8:00 AM' },
    { value: 9, display: '9:00 AM' },
    { value: 10, display: '10:00 AM' },
    { value: 11, display: '11:00 AM' },
    { value: 12, display: '12:00 PM' },
    { value: 13, display: '1:00 PM' },
    { value: 14, display: '2:00 PM' },
    { value: 15, display: '3:00 PM' },
    { value: 16, display: '4:00 PM' },
    { value: 17, display: '5:00 PM' },
    { value: 18, display: '6:00 PM' }
  ];

  // State
  const [events, setEvents] = useState([]);
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Convert numeric time to display format
  const formatTime = (time) => {
    const hour = time % 12 || 12;
    const ampm = time < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${ampm}`;
  };

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/event/all');
        // Transform the backend data to match the expected format
        const transformedEvents = response.data
          .filter(event => event.day && event.day !== "string" && event.startTime >= 8 && event.startTime <= 18)
          .map(event => ({
            eventId: event.eventId,
            classType: event.classType,
            Day: event.day.charAt(0).toUpperCase() + event.day.slice(1, 3).toLowerCase(),
            startTime: event.startTime,
            Duration: event.duration
          }))
          .filter(event => event.Day);

        setEvents(transformedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events. Please refresh the page.");
      }
    };
    fetchEvents();
  }, []);

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 0) {
        setCurrentYear(year => year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const nextMonth = () => {
    setCurrentMonth(prev => {
      if (prev === 11) {
        setCurrentYear(year => year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Show tooltip with event info
  const showTooltip = (date, clientX, clientY) => {
    const dayToNumber = {
      'Sun': 0, 'Mon': 1, 'Tue': 2, 'Wed': 3, 
      'Thu': 4, 'Fri': 5, 'Sat': 6
    };
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return;
    
    const dateDay = days[date.getDay() === 0 ? 6 : date.getDay() - 1];
    const eventsOnDate = events.filter(event => event.Day === dateDay);
    
    if (eventsOnDate.length > 0) {
      setTooltipInfo({
        events: eventsOnDate,
        x: clientX,
        y: clientY
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
      <main className="flex-1 p-6 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">View Schedule</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Timetable 
              days={days}
              times={times.map(t => t.display)}
              events={events}
              isEditable={false}
            />
          </div>
          
          <Calendar 
            currentMonth={currentMonth}
            currentYear={currentYear}
            events={events}
            onPrevMonth={prevMonth}
            onNextMonth={nextMonth}
            onDayHover={showTooltip}
          />
        </div>
      </main>

      {/* Tooltip */}
      {tooltipInfo && (
        <div 
          className="fixed bg-white rounded-md shadow-lg p-3 z-50 text-sm max-w-xs"
          style={{
            left: `${tooltipInfo.x + 10}px`,
            top: `${tooltipInfo.y + 10}px`
          }}
        >
          <h4 className="font-semibold mb-2">Classes:</h4>
          <ul className="space-y-2">
            {tooltipInfo.events.map(event => (
              <li key={event.eventId} className="border-b pb-1 last:border-b-0">
                <div className="font-medium">{event.classType} Class</div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Day: {event.Day}</span>
                  <span>{formatTime(event.startTime)}</span>
                </div>
                <div className="text-xs text-gray-600">
                  Duration: {event.Duration} hour{event.Duration !== 1 ? 's' : ''}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ParentUserTimetablePage;