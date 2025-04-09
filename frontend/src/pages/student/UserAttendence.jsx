import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FiCheckCircle, FiXCircle, FiLoader, FiAlertCircle } from 'react-icons/fi';

const UserAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [classNames, setClassNames] = useState({});
  const { id } = useParams();
  const [statusFilter, setStatusFilter] = useState('all');
  const [classFilter, setClassFilter] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching attendance data for student ID:', id);
        const response = await axios.get(`http://localhost:8085/api/v1/attendance/get-attendance/${id}`);
        console.log('API Response:', response.data);
        setAttendance(response.data);
        setFilteredAttendance(response.data);
        
        // Fetch class names for all unique classTypeIds
        const uniqueClassTypeIds = [...new Set(response.data.map(record => record.classTypeId))];
        console.log('Unique class IDs:', uniqueClassTypeIds);
        
        const classPromises = uniqueClassTypeIds.map(classTypeId => 
          axios.get(`http://localhost:8085/classType/get-name-and-type/${classTypeId}`)
            .then(response => ({ [classTypeId]: response.data }))
            .catch(error => {
              console.error(`Error fetching class name for ID ${classTypeId}:`, error);
              return { [classTypeId]: 'Unknown Class' };
            })
        );

        const classResults = await Promise.all(classPromises);
        const classNamesMap = classResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        console.log('Class names map:', classNamesMap);
        setClassNames(classNamesMap);
      } catch (err) {
        console.error('Error in fetchData:', err);
        setError('Failed to fetch attendance data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log('Filtering attendance with status:', statusFilter, 'and class:', classFilter);
    let result = [...attendance];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(record => 
        statusFilter === 'present' ? record.presentState : !record.presentState
      );
    }
    
    // Apply class filter
    if (classFilter !== 'all') {
      result = result.filter(record => record.classTypeId.toString() === classFilter);
    }
    
    console.log('Filtered results:', result);
    setFilteredAttendance(result);
  }, [attendance, statusFilter, classFilter]);

  const handleResetFilters = () => {
    setStatusFilter('all');
    setClassFilter('all');
  };

  const calculateStats = () => {
    const total = filteredAttendance.length;
    const present = filteredAttendance.filter(record => record.presentState).length;
    const absent = total - present;
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { total, present, absent, attendanceRate };
  };

  const stats = calculateStats();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Attendance</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded">
          <div className="flex items-center">
            <FiAlertCircle className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Statuses</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Classes</option>
              {Object.keys(classNames).map(classId => (
                <option key={classId} value={classId}>
                  {classNames[classId]}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Total Records</div>
          <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-green-200 bg-green-50">
          <div className="text-green-700 text-sm font-medium">Present</div>
          <div className="text-2xl font-bold text-green-800">{stats.present}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-red-200 bg-red-50">
          <div className="text-red-700 text-sm font-medium">Absent</div>
          <div className="text-2xl font-bold text-red-800">{stats.absent}</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-200 bg-blue-50">
          <div className="text-blue-700 text-sm font-medium">Attendance Rate</div>
          <div className="text-2xl font-bold text-blue-800">{stats.attendanceRate}%</div>
        </div>
      </div>

      {/* Attendance Table */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FiLoader className="animate-spin text-blue-500 text-4xl" />
          <span className="ml-3 text-gray-600">Loading attendance data...</span>
        </div>
      ) : filteredAttendance.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <h3 className="text-lg font-medium text-gray-700">No attendance records found</h3>
          <p className="text-gray-500 mt-1">
            {attendance.length === 0 
              ? "This student doesn't have any attendance records yet." 
              : "No records match your current filters."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAttendance.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(record.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.presentState 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {record.presentState ? (
                          <FiCheckCircle className="mr-1" />
                        ) : (
                          <FiXCircle className="mr-1" />
                        )}
                        {record.presentState ? 'Present' : 'Absent'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {classNames[record.classTypeId] || 'Loading...'}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAttendance;