import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronDown, Search, Users, FileText, RefreshCw, Calendar } from 'lucide-react';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classTypes, setClassTypes] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedClass, setSelectedClass] = useState('Select Class Name');
  const [selectedType, setSelectedType] = useState('Select Class Type');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [classTypeId, setClassTypeId] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    loadClasses();
    loadTypes();
    if (selectedClass !== 'Select Class Name' && selectedType !== 'Select Class Type') {
      selectClassId();
    }
  }, [selectedClass, selectedType]);

  useEffect(() => {
    if (classTypeId) {
      loadAttendance();
    }
  }, [classTypeId]);

  const loadClasses = async () => {
    try {
      const response = await axios.get('http://localhost:8085/classType/get-all-class-names');
      const classes = Array.isArray(response.data) ? response.data : [];
      setClassTypes(classes);
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  const loadTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8085/classType/get-all-class-types');
      const types = Array.isArray(response.data) ? response.data : [];
      setTypes(types);
    } catch (error) {
      console.error('Failed to load types:', error);
    }
  };

  const selectClassId = async () => {
    if (selectedClass === 'Select Class Name' || selectedType === 'Select Class Type') {
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8085/classType/get-class-type-id', {
        params: { className: selectedClass, type: selectedType.toUpperCase() },
      });
      const classId = response.data;
      if (!classId) {
        alert('No class type ID found. Please check your selections.');
        setLoading(false);
        return;
      }
      setClassTypeId(classId);
    } catch (error) {
      console.error('Failed to retrieve class type ID:', error);
      alert('Failed to retrieve class type ID. Check console for details.');
      setLoading(false);
    }
  };

  const loadAttendance = async () => {
    if (!classTypeId) return;
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8085/api/v1/attendance/get-attendance-by-class-id/${classTypeId}`
      );
      const data = Array.isArray(response.data) ? response.data : [];
      setAttendanceData(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load attendance:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    await loadAttendance();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filterAttendanceData = () => {
    if (!attendanceData || attendanceData.length === 0) return [];

    let filteredData = [...attendanceData];

    // Filter by search term
    if (searchTerm) {
      filteredData = filteredData.filter((student) =>
        student.studentId.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by attendance status
    if (activeTab === 'present') {
      filteredData = filteredData.filter((student) =>
        student.attendanceList.some((a) => a.presentState)
      );
    } else if (activeTab === 'absent') {
      filteredData = filteredData.filter((student) =>
        student.attendanceList.some((a) => !a.presentState)
      );
    }

    // Sort the data
    filteredData.sort((a, b) => {
      if (sortBy === 'id') {
        const comparison = a.studentId.localeCompare(b.studentId);
        return sortOrder === 'asc' ? comparison : -comparison;
      } else if (sortBy === 'date') {
        const aDate = a.attendanceList.length > 0 ? new Date(a.attendanceList[0].createdAt) : new Date(0);
        const bDate = b.attendanceList.length > 0 ? new Date(b.attendanceList[0].createdAt) : new Date(0);
        const comparison = aDate - bDate;
        return sortOrder === 'asc' ? comparison : -comparison;
      } else if (sortBy === 'status') {
        const aPresentCount = a.attendanceList.filter((a) => a.presentState).length;
        const bPresentCount = b.attendanceList.filter((a) => a.presentState).length;
        const comparison = aPresentCount - bPresentCount;
        return sortOrder === 'asc' ? comparison : -comparison;
      }
      return 0;
    });

    return filteredData;
  };

  const getAttendanceStats = () => {
    if (!attendanceData || attendanceData.length === 0) {
      return { total: 0, present: 0, absent: 0, presentPercentage: 0 };
    }

    let totalAttendance = 0;
    let presentCount = 0;

    attendanceData.forEach((student) => {
      totalAttendance += student.attendanceList.length;
      presentCount += student.attendanceList.filter((a) => a.presentState).length;
    });

    return {
      total: totalAttendance,
      present: presentCount,
      absent: totalAttendance - presentCount,
      presentPercentage: totalAttendance > 0 ? Math.round((presentCount / totalAttendance) * 100) : 0,
    };
  };

  const stats = getAttendanceStats();
  const filteredData = filterAttendanceData();

  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen">
      <h1>Attendance History</h1>

      {/* Filters and Controls */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
            <div className="relative">
              <button
                onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                className="w-full bg-white p-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <span className="text-base truncate">{selectedClass}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    isClassDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {isClassDropdownOpen && (
                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-200">
                  {classTypes.length === 0 ? (
                    <div className="p-3 text-gray-500 text-center">No classes available</div>
                  ) : (
                    classTypes.map((classItem) => (
                      <button
                        key={classItem}
                        onClick={() => {
                          setSelectedClass(classItem);
                          setIsClassDropdownOpen(false);
                        }}
                        className={`w-full p-3 text-left hover:bg-gray-50 text-sm ${
                          selectedClass === classItem ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                      >
                        {classItem}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Type</label>
            <div className="relative">
              <button
                onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                className="w-full bg-white p-3 border border-gray-300 rounded-lg flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <span className="text-base truncate">{selectedType}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    isTypeDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {isTypeDropdownOpen && (
                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto border border-gray-200">
                  {types.length === 0 ? (
                    <div className="p-3 text-gray-500 text-center">No class types available</div>
                  ) : (
                    types.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full p-3 text-left hover:bg-gray-50 text-sm ${
                          selectedType === type ? 'bg-blue-50 text-blue-600 font-medium' : ''
                        }`}
                      >
                        {type}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search by student ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <button
            onClick={refreshData}
            disabled={loading || isRefreshing}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">TOTAL RECORDS</h2>
          <p className="text-2xl font-semibold">{stats.total}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">PRESENT</h2>
          <p className="text-2xl font-semibold">
            {stats.present} <span className="text-sm">({stats.presentPercentage}%)</span>
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">ABSENT</h2>
          <p className="text-2xl font-semibold">
            {stats.absent} <span className="text-sm">({100 - stats.presentPercentage}%)</span>
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-4 bg-white rounded-t-lg">
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'all'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('all')}
        >
          All Records
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'present'
              ? 'border-green-500 text-green-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('present')}
        >
          Present
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'absent'
              ? 'border-red-500 text-red-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('absent')}
        >
          Absent
        </button>
      </div>

      {/* Data Table */}
      <section className="w-full bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-500">Loading attendance records...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <p className="text-red-500 text-lg font-medium mb-2">Error Loading Data</p>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={refreshData}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-700 text-lg font-medium mb-2">No Records Found</p>
            <p className="text-gray-500">
              {selectedClass === 'Select Class Name' || selectedType === 'Select Class Type'
                ? 'Please select a class name and type to view attendance records.'
                : 'No attendance records match your current filters.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('id')}
                  >
                    <div className="flex items-center">
                      Student ID
                      {sortBy === 'id' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSortChange('date')}
                  >
                    <div className="flex items-center">
                      Attendance Records
                      {sortBy === 'date' && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((student) => (
                  <tr key={student.studentId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.studentId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        {student.attendanceList
                          .filter((attendance) => {
                            if (activeTab === 'present') return attendance.presentState;
                            if (activeTab === 'absent') return !attendance.presentState;
                            return true; // Show all for 'all' tab
                          })
                          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // Sort by date
                          .map((attendance, attIndex) => (
                            <span
                              key={`${student.studentId}-${attIndex}`}
                              className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${
                                attendance.presentState
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                              title={attendance.presentState ? 'Present' : 'Absent'} // Tooltip for clarity
                            >
                              {formatDate(attendance.createdAt)}
                            </span>
                          ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default Attendance;