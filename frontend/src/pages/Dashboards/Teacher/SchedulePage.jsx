// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, Edit, Trash2, X, Plus, BookOpen } from 'lucide-react';
// import axios from 'axios';

// function App() {
//   // State
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [currentEvent, setCurrentEvent] = useState(null);
//   const [formData, setFormData] = useState({
//     classType: "",
//     Day: "",
//     startTime: "",
//     Duration: ""
//   });
//   const [tooltipInfo, setTooltipInfo] = useState(null);

//   // Days and times for the schedule
//   const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
//   const times = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00'];
//   const classTypes = ['Theory', 'Paper'];

//   // Current month and year for calendar
//   const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
//   const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
//   // Map days to their numeric values (0 = Sunday, 1 = Monday, etc.)
//   const dayToNumber = {
//     'Sun': 0,
//     'Mon': 1,
//     'Tue': 2,
//     'Wed': 3,
//     'Thu': 4,
//     'Fri': 5,
//     'Sat': 6
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Add new event
//   const handleAddEvent = () => {
//     const newEvent = {
//       ...formData,
//       id: Date.now().toString()
//     };
//     setEvents([...events, newEvent]);
//     setShowModal(false);
//     resetForm();
//   };

//   // Edit event
//   const handleEditEvent = () => {
//     if (!currentEvent) return;
    
//     const updatedEvents = events.map(event => 
//       event.id === currentEvent.id ? { ...formData } : event
//     );
    
//     setEvents(updatedEvents);
//     setShowEditModal(false);
//     resetForm();
//   };

//   // Delete event
//   const handleDeleteEvent = (id) => {
//     setEvents(events.filter(event => event.id !== id));
//   };

//   // Open edit modal
//   const openEditModal = (event) => {
//     setCurrentEvent(event);
//     setFormData({
//       id: event.id,
//       title: event.title,
//       classType: event.classType,
//       day: event.day,
//       startTime: event.startTime,
//       duration: event.duration
//     });
//     setShowEditModal(true);
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       id: '',
//       title: '',
//       classType: 'Theory',
//       day: 'Mon',
//       startTime: '09:00',
//       duration: '1'
//     });
//     setCurrentEvent(null);
//   };

//   // Find the next occurrence of a specific day from today
//   const getNextDayOccurrence = (dayName) => {
//     const today = new Date();
//     const dayNumber = dayToNumber[dayName];
//     const todayNumber = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
//     // Calculate days to add
//     let daysToAdd = dayNumber - todayNumber;
//     if (daysToAdd <= 0) {
//       daysToAdd += 7; // Add a week if the day has already passed this week
//     }
    
//     const nextDate = new Date(today);
//     nextDate.setDate(today.getDate() + daysToAdd);
//     return nextDate;
//   };

//   // Check if a date has an event and is in the future
//   const getEventsForDate = (date) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);
    
//     // If date is in the past, return no events
//     if (date < today) {
//       return [];
//     }
    
//     const dateDay = days[date.getDay() === 0 ? 6 : date.getDay() - 1]; // Convert to our day format
//     return events.filter(event => event.day === dateDay);
//   };

//   // Show tooltip with event info
//   const showTooltip = (date, clientX, clientY) => {
//     const eventsOnDate = getEventsForDate(date);
//     if (eventsOnDate.length > 0) {
//       setTooltipInfo({
//         events: eventsOnDate,
//         x: clientX,
//         y: clientY
//       });
//     }
//   };

//   // Hide tooltip
//   const hideTooltip = () => {
//     setTooltipInfo(null);
//   };

//   // Generate calendar days
//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (year, month) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const generateCalendarDays = () => {
//     const daysInMonth = getDaysInMonth(currentYear, currentMonth);
//     const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
//     const calendarDays = [];
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDay; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="text-center py-2"></div>);
//     }

//     // Add days of the month
//     for (let i = 1; i <= daysInMonth; i++) {
//       const currentDate = new Date(currentYear, currentMonth, i);
//       const isToday = 
//         i === today.getDate() && 
//         currentMonth === today.getMonth() && 
//         currentYear === today.getFullYear();
      
//       const isPast = currentDate < today;
      
//       // Get events for this date (only if it's today or in the future)
//       const eventsOnDate = getEventsForDate(currentDate);
//       const hasUpcomingEvent = eventsOnDate.length > 0;
      
//       calendarDays.push(
//         <div 
//           key={i} 
//           className={`text-center py-2 relative ${
//             isToday ? 'bg-blue-100 rounded-full font-bold' : ''
//           } ${isPast ? 'text-gray-400' : 'cursor-pointer hover:bg-gray-100'}`}
//           onMouseEnter={(e) => !isPast && hasUpcomingEvent && showTooltip(currentDate, e.clientX, e.clientY)}
//           onMouseLeave={hideTooltip}
//         >
//           {i}
//           {hasUpcomingEvent && (
//             <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
//           )}
//         </div>
//       );
//     }

//     return calendarDays;
//   };

//   // Navigate through months
//   const prevMonth = () => {
//     if (currentMonth === 0) {
//       setCurrentMonth(11);
//       setCurrentYear(currentYear - 1);
//     } else {
//       setCurrentMonth(currentMonth - 1);
//     }
//   };

//   const nextMonth = () => {
//     if (currentMonth === 11) {
//       setCurrentMonth(0);
//       setCurrentYear(currentYear + 1);
//     } else {
//       setCurrentMonth(currentMonth + 1);
//     }
//   };

//   // Get month name
//   const getMonthName = (month) => {
//     const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
//                         'July', 'August', 'September', 'October', 'November', 'December'];
//     return monthNames[month];
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 flex flex-col">
      

      

//         {/* Main content */}
//         <main className="flex-1 p-6 w-full">
//           <div className="flex justify-between items-center mb-6 w-full">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">Manage Schedule</h2>
//               <p className="text-gray-600">plan your classes and events</p>
//             </div>
//             <button 
//               onClick={() => setShowModal(true)}
//               className="bg-[#287f93] hover:bg-[#287f93] text-white px-4 py-2 rounded-md flex items-center space-x-2 corner-radius-8"
//             >
//               <Plus size={18} />
//               <span>Add Event</span>
//             </button>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* Weekly Schedule */}
//             <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border-collapse">
//                   <thead>
//                     <tr>
//                       <th className="p-3 border-b border-r bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
//                         Time
//                       </th>
//                       {days.map(day => (
//                         <th key={day} className="p-3 border-b border-r bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                           {day}
//                         </th>
//                       ))}
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {times.map((time, timeIndex) => (
//                       <tr key={time} className="border-b">
//                         <td className="p-3 border-r text-xs text-gray-500">
//                           {time}
//                         </td>
//                         {days.map(day => {
//                           const eventsAtTimeAndDay = events.filter(
//                             event => event.startTime === time && event.day === day
//                           );
                          
//                           return (
//                             <td key={`${day}-${time}`} className="p-1 border-r relative min-h-[60px]">
//                               {eventsAtTimeAndDay.map(event => (
//                                 <div 
//                                   key={event.id}
//                                   className={`p-2 rounded-md mb-1 text-xs relative ${
//                                     event.classType === 'Theory' ? 'bg-pink-100 text-pink-800' :
//                                     'bg-blue-100 text-[#287f93]'
//                                   }`}
//                                 >
//                                   <div className="flex justify-between items-start">
//                                     <span className="font-medium">{event.title}</span>
//                                     <div className="flex space-x-1">
//                                       <button 
//                                         onClick={() => openEditModal(event)}
//                                         className="text-gray-500 hover:text-gray-700"
//                                       >
//                                         <Edit size={14} />
//                                       </button>
//                                       <button 
//                                         onClick={() => handleDeleteEvent(event.id)}
//                                         className="text-red-500 hover:text-red-700"
//                                       >
//                                         <Trash2 size={14} />
//                                       </button>
//                                     </div>
//                                   </div>
//                                   <div className="mt-1">
//                                     {event.classType} class
//                                   </div>
//                                 </div>
//                               ))}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Calendar */}
//             <div className="bg-white rounded-lg shadow-md p-4 w-full">
//               <h3 className="text-lg font-semibold mb-4">Calendar</h3>
//               <div className="flex justify-between items-center mb-4">
//                 <h4 className="font-medium">
//                   {getMonthName(currentMonth)} {currentYear}
//                 </h4>
//                 <div className="flex space-x-2">
//                   <button 
//                     onClick={prevMonth}
//                     className="p-1 rounded-md hover:bg-gray-100"
//                   >
//                     &lt;
//                   </button>
//                   <button 
//                     onClick={nextMonth}
//                     className="p-1 rounded-md hover:bg-gray-100"
//                   >
//                     &gt;
//                   </button>
//                 </div>
//               </div>
//               <div className="grid grid-cols-7 gap-1 mb-2">
//                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
//                   <div key={index} className="text-center text-xs font-medium text-gray-500">
//                     {day}
//                   </div>
//                 ))}
//               </div>
//               <div className="grid grid-cols-7 gap-1">
//                 {generateCalendarDays()}
//               </div>
//             </div>
//           </div>
//         </main>
     

//       {/* Event Tooltip */}
//       {tooltipInfo && (
//         <div 
//           className="fixed bg-white rounded-md shadow-lg p-3 z-50 text-sm max-w-xs"
//           style={{
//             left: `${tooltipInfo.x + 10}px`,
//             top: `${tooltipInfo.y + 10}px`
//           }}
//         >
//           <h4 className="font-semibold mb-2">Classes:</h4>
//           <ul className="space-y-2">
//             {tooltipInfo.events.map(event => (
//               <li key={event.id} className="border-b pb-1 last:border-b-0">
//                 <div className="font-medium">{event.title}</div>
//                 <div className="flex justify-between text-xs text-gray-600">
//                   <span>{event.classType} class</span>
//                   <span>{event.startTime}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Add Event Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Add New Event</h3>
//               <button 
//                 onClick={() => setShowModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter event title"
//                   required
//                 />
//               </div> */}
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Class Type
//                 </label>
//                 <select
//                   name="classType"
//                   value={formData.classType}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {classTypes.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Day
//                 </label>
//                 <select
//                   name="day"
//                   value={formData.day}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   {days.map(day => (
//                     <option key={day} value={day}>{day}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Start Time
//                 </label>
//                 <select
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287f93]"
//                 >
//                   {times.map(time => (
//                     <option key={time} value={time}>{time}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Duration (hours)
//                 </label>
//                 <select
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287f93]"
//                 >
//                   {[1, 2, 3, 4].map(hour => (
//                     <option key={hour} value={hour}>{hour}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex justify-end space-x-2 mt-6">
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleAddEvent}
//                   className="px-4 py-2 bg-[#287f93] text-white rounded-md hover:bg-[#287f93]"
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Event Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-lg font-semibold">Edit Event</h3>
//               <button 
//                 onClick={() => setShowEditModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               {/* <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Event Title
//                 </label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={formData.title}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter event title"
//                   required
//                 />
//               </div> */}
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Class Type
//                 </label>
//                 <select
//                   name="classType"
//                   value={formData.classType}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287f93]"
//                 >
//                   {classTypes.map(type => (
//                     <option key={type} value={type}>{type}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Day
//                 </label>
//                 <select
//                   name="day"
//                   value={formData.day}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287f93]"
//                 >
//                   {days.map(day => (
//                     <option key={day} value={day}>{day}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Start Time
//                 </label>
//                 <select
//                   name="startTime"
//                   value={formData.startTime}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287f93]"
//                 >
//                   {times.map(time => (
//                     <option key={time} value={time}>{time}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Duration (hours)
//                 </label>
//                 <select
//                   name="duration"
//                   value={formData.duration}
//                   onChange={handleInputChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#287f93]"
//                 >
//                   {[1, 2, 3, 4].map(hour => (
//                     <option key={hour} value={hour}>{hour}</option>
//                   ))}
//                 </select>
//               </div>
              
//               <div className="flex justify-end space-x-2 mt-6">
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleEditEvent}
//                   className="px-4 py-2 bg-[#287f93] text-white rounded-md hover:bg-[#287f93]"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
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
    { value: 8, display: '8:00' },
    { value: 9, display: '9:00' },
    { value: 10, display: '10:00' },
    { value: 11, display: '11:00' },
    { value: 12, display: '12:00' },
    { value: 13, display: '1:00' },
    { value: 14, display: '2:00' },
    { value: 15, display: '3:00' },
    { value: 16, display: '4:00' },
    { value: 17, display: '5:00' },
    { value: 18, display: '6:00' }
  ];
  const classTypes = ['Theory', 'Paper'];

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
      const response = await axios.post('http://localhost:8085/api/v1/event/save', formData);
      setEvents([...events, response.data]);
      setShowModal(false);
      resetForm();
      alert('Event added successfully!');
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event. Please try again.");
    }
  };

  // Edit existing event
  const handleEditEvent = async () => {
    if (!currentEvent) return;
    
    try {
      const response = await axios.put(
        `http://localhost:8085/api/v1/event/update/${currentEvent.eventId}`,
        formData
      );
      
      const updatedEvents = events.map(event => 
        event.eventId === currentEvent.eventId ? response.data : event
      );
      
      setEvents(updatedEvents);
      setShowEditModal(false);
      resetForm();
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event. Please try again.");
    }
  };

  // Fetch all events on component mount
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/v1/event/all');
        setEvents(response.data);
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
      await axios.delete(`http://localhost:8085/api/v1/event/delete/${eventId}`);
      setEvents(events.filter(event => event.eventId !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event. Please try again.");
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
              events={events.map(event => ({
                ...event,
                startTime: formatTime(event.startTime),
                id: event.eventId // Ensure id is mapped for table display
              }))}
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