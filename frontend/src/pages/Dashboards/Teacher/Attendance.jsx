import React, { useState, useEffect } from 'react';
import Button from '../../../components/Button';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentMonths, setCurrentMonths] = useState([]);

  // Set up the current and previous 3 months based on today's date
  useEffect(() => {
    const today = new Date('2025-04-03'); // Hardcoded for now based on your provided date
    const months = [];
    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      months.push({
        name: date.toLocaleString('default', { month: 'long' }), // e.g., "April"
        index: date.getMonth(), // 0-11
      });
    }
    setCurrentMonths(months.reverse()); // Reverse to show oldest to newest: Jan -> Apr
  }, []);

  // Fetch attendance data from backend
  useEffect(() => {
    if (currentMonths.length > 0) {
      fetchAttendance();
    }
  }, [currentMonths]);

  const fetchAttendance = async () => {
    try {
      const response = await axios.get('http://localhost:8085/api/v1/attendance/get-students-with-attendance', {
        params: { months: 4 } // Indicate we want the last 4 months
      });
      const processedData = processAttendanceData(response.data);
      setAttendanceData(processedData);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      setAttendanceData([]);
    }
  };

  // Process attendance data into monthly format
  const processAttendanceData = (data) => {
    const grouped = {};

    data.forEach(({ studentId, attendanceDates }) => {
      if (!grouped[studentId]) {
        grouped[studentId] = {
          studentId,
          months: currentMonths.reduce((acc, month) => {
            acc[month.name.toLowerCase()] = [];
            return acc;
          }, {}),
        };
      }

      // Group dates by month
      attendanceDates.forEach((date) => {
        const dateObj = new Date(date);
        const monthIndex = dateObj.getMonth(); // 0-11
        const day = dateObj.getDate();
        const monthName = currentMonths.find(m => m.index === monthIndex)?.name.toLowerCase();
        if (monthName && grouped[studentId].months[monthName]) {
          grouped[studentId].months[monthName].push(day);
        }
      });
    });

    return Object.values(grouped);
  };

  // Handle search
  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      fetchAttendance(); // Reset to all data if search is empty
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8085/api/v1/attendance/get-attendance/${searchTerm}`, {
        params: { months: 4 }
      });
      const processedData = processAttendanceData(response.data.map(item => ({
        studentId: searchTerm,
        attendanceDates: item.attendanceDates // Adjust based on your DTO
      })));
      setAttendanceData(processedData);
    } catch (error) {
      console.error('Error searching attendance:', error);
      setAttendanceData([]);
    }
  };

  // Render attendance buttons for a month
  const renderAttendanceButtons = (days, month) => {
    return days.map((day, index) => (
      <span key={`${month}-${day}`}>
        <Button
          name={day.toString()}
          action={() => console.log(`${month} ${day} clicked`)}
          backgroundColor={day % 2 === 0 ? 'green' : '#EBEBEB'} // Example logic
          fontColor="black"
          cornerRadius={false}
        />
        {index < days.length - 1 && <span> </span>}
      </span>
    ));
  };

  return (
    <div className="d-flex">
      <div className="p-4 w-full">
        <h2 className="text-xl font-bold">Attendance</h2>
        <div className="relative flex items-center bg-[#fff] w-96 rounded-l-full shadow mt-10 h-14">
          <input
            type="text"
            placeholder="Search by id..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-l-full border-gray-300 w-full"
          />
          <button
            onClick={handleSearch}
            className="absolute right-0 bg-[#287f93] text-[#fff] h-14 w-14 flex items-center justify-center rounded-lg"
          >
            <FaSearch />
          </button>
        </div>

        <section>
          <table
            className="shadow mt-10"
            style={{ margin: '2%', padding: '2%', minWidth: '74vw', maxWidth: '74vw', backgroundColor: '#ffffff' }}
          >
            <thead className="bg-[#EBEBEB] h-16">
              <tr className="text-center">
                <th>Student Id</th>
                {currentMonths.map((month) => (
                  <th key={month.name}>{month.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map(({ studentId, months }, index) => (
                  <tr
                    key={studentId}
                    className={`text-center ${index % 2 === 0 ? 'bg-[#ffffff]' : 'bg-[#EBEBEB]'}`}
                  >
                    <td className="py-3 px-4">{studentId}</td>
                    {currentMonths.map((month) => (
                      <td key={month.name} className="py-3 px-4">
                        {months[month.name.toLowerCase()].length > 0
                          ? renderAttendanceButtons(months[month.name.toLowerCase()], month.name)
                          : '-'}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={currentMonths.length + 1} className="text-center py-4">
                    No attendance data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default Attendance;