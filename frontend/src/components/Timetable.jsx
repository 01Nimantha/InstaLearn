import React from 'react'

const Timetable = ({events}) => {
  return (
    <div>
        <div className="mt-5 bg-white p-5 shadow rounded-lg">
      <div className="grid grid-cols-7 gap-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="p-3 border rounded-lg min-h-[100px] relative">
            <h3 className="font-bold text-center">{day}</h3>
            {events
              .filter((event) => event.day.startsWith(day))
              .map((event, idx) => (
                <div
                  key={idx}
                  className="bg-blue-200 p-2 mt-2 rounded text-center"
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
      
    </div>
  )
}

export default Timetable
