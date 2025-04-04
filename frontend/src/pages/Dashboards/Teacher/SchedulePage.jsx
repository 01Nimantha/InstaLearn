import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Calendar from './Calender';
import Timetable from './Timetable';
import EventModal from './EventModal';
import axios from 'axios';

function App() {
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
  const classTypes = ['Theory', 'Paper'];

  // const normalizedDay = event.day
  // ? event.day.charAt(0).toUpperCase() + event.day.slice(1, 3).toLowerCase()
  // : null;

  // State
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const [formData, setFormData] = useState({
    classType: "Theory",
    Day: "Mon",
    startTime: 9, // Numeric value matching backend
    Duration: 1   // Numeric value matching backend
  });

  // Convert numeric time to display format
  const formatTime = (time) => {
    const hour = time % 12 || 12;
    const ampm = time < 12 ? 'AM' : 'PM';
    return `${hour}:00 ${ampm}`;
  };

  // Event handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === 'startTime' || name === 'Duration' ? parseInt(value) : value 
    });
  };

  // Add new event
  const handleAddEvent = async () => {
    try {
      // Transform formData to match backend field names
      const backendFormData = {
        classType: formData.classType,
        day: formData.Day.toUpperCase(), // e.g., "Wed" → "WED"
        startTime: formData.startTime,
        duration: formData.Duration // Ensure this is the correct value
      };
      console.log("Adding event with data:", backendFormData); // Debug log
      const response = await axios.post('http://localhost:8085/api/v1/event/save', backendFormData);
      // Transform the response to match the expected format
      const newEvent = {
        eventId: response.data.eventId,
        classType: response.data.classType,
        Day: response.data.day
          ? response.data.day.charAt(0).toUpperCase() + response.data.day.slice(1, 3).toLowerCase()
          : null,
        startTime: response.data.startTime,
        Duration: response.data.duration
      };
      if (newEvent.Day) {
        setEvents([...events, newEvent]);
      }
      setShowModal(false);
      resetForm();
      alert('Event added successfully!');
    } catch (error) {
      console.error("Error adding event:", error.response ? error.response.data : error.message);
      alert("Failed to add event. Please try again.");
    }
  };

  // Edit existing event
  const handleEditEvent = async () => {
    try {
      // Ensure eventId is included in the payload
      const response = await axios.put("http://localhost:8085/api/v1/event/update", {
        eventId: currentEvent.eventId,  // Make sure to pass eventId
        classType: formData.classType,
        day: formData.day,
        startTime: formData.startTime,
        duration: formData.duration
      });
  
      console.log(response.data);  // Log the response from the server
      alert(response.data);        // Show success message to user
  
    } catch (error) {
      console.error("Error updating event:", error.response ? error.response.data : error.message);
      alert("Error updating event: " + (error.response ? error.response.data : error.message));
    }
  };
  

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/event/all');
        // Transform the backend data to match the expected format
        const transformedEvents = response.data
          .filter(event => event.day && event.day !== "string" && event.startTime >= 8 && event.startTime <= 18) // Filter out invalid events
          .map(event => {
            // Normalize the day format (e.g., "Wed" → "Wed", "TUE" → "Tue")
            const normalizedDay = event.day
              ? event.day.charAt(0).toUpperCase() + event.day.slice(1, 3).toLowerCase()
              : null;
            
            return {
              eventId: event.eventId, // Already matches
              classType: event.classType,
              Day: event.day.charAt(0).toUpperCase() + event.day.slice(1, 3).toLowerCase(), // Normalize "MON" → "Mon" // Map `day` to `Day` and normalize
              startTime: event.startTime,
              Duration: event.duration // Map `duration` to `Duration`
            };
          })
          .filter(event => event.Day); // Remove events with null Day
  
        console.log("Transformed events:", transformedEvents);
        setEvents(transformedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to load events. Please refresh the page.");
      }
    };
    fetchEvents();
  }, []);

  // Delete event
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    
    try {
      console.log("Deleting event with ID:", eventId);
      const response = await axios.delete(`http://localhost:8085/api/v1/event/delete-event?id=${eventId}`);
      // Updated endpoint
      console.log("Delete response:", response.data);
      setEvents(events.filter(event => event.eventId !== eventId));
      alert("Event deleted successfully!");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Event not found. It may have already been deleted.");
        setEvents(events.filter(event => event.eventId !== eventId));
      } else {
        console.error("Error deleting event:", error.response ? error.response.data : error.message);
        alert("Failed to delete event. Please try again.");
      }
    }
  };

  // Open edit modal with event data
  const openEditModal = (event) => {
    setCurrentEvent(event);
    setFormData({
      classType: event.classType,
      Day: event.Day,
      startTime: event.startTime,
      Duration: event.Duration
    });
    setShowEditModal(true);
  };

  // Reset form to default values
  const resetForm = () => {
    setFormData({
      classType: "Theory",
      Day: "Mon",
      startTime: 9,
      Duration: 1
    });
    setCurrentEvent(null);
  };

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
    
    <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      <main className="flex-1 p-6 w-full">
        <div className="flex justify-between items-center mb-6 w-full">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Manage Schedule</h2>
            <p className="text-gray-600">Plan your classes and events</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-[#287f93] hover:bg-[#287f93] text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Add Event</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
  <Timetable 
    days={days}
    times={times.map(t => t.display)}
    events={events} // Pass events directly without transforming startTime
    onEditEvent={openEditModal}
    onDeleteEvent={handleDeleteEvent}
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

      {/* Add Event Modal */}
      <EventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleAddEvent}
        formData={formData}
        onInputChange={handleInputChange}
        days={days}
        times={times}
        classTypes={classTypes}
      />

      {/* Edit Event Modal */}
      <EventModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEditEvent}
        formData={formData}
        onInputChange={handleInputChange}
        days={days}
        times={times}
        classTypes={classTypes}
        isEdit={true}
      />
    </div>
  );
}

export default App;