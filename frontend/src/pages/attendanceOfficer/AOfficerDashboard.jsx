import React, { useEffect, useState } from 'react';
import { Home, Settings, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import Side from './Side';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AOfficerDashboard = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState('Select Class Name');
  const [selectedType, setSelectedType] = useState('Select Class Type');
  const [isClassDropdownOpen, setIsClassDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [classTypes, setClassTypes] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    loadClasses();
    loadTypes();
  }, []);

  const loadClasses = async () => {
    try {
      const response = await axios.get("http://localhost:8085/classType/get-all-class-names");
      const classes = Array.isArray(response.data) ? response.data : [];
      setClassTypes(classes);
    } catch (error) {
      console.error('Failed to load classes:', error);
    }
  };

  const loadTypes = async () => {
    try {
      const response = await axios.get("http://localhost:8085/classType/get-all-class-types");
      const types = Array.isArray(response.data) ? response.data : [];
      setTypes(types);
    } catch (error) {
      console.error('Failed to load types:', error);
    }
  };

  const handleNavigate = async () => {
    if (selectedClass !== "Select Class Name" && selectedType !== "Select Class Type") {
      try {
        const response = await axios.get("http://localhost:8085/classType/get-class-type-id", {
          params: { className: selectedClass, type: selectedType.toUpperCase() },
        });
        const classTypeId = response.data;

        if (!classTypeId) {
          alert("No class type ID found. Please check your selections.");
          return;
        }

        navigate(`/qr-scanner?classTypeId=${classTypeId}`);
      } catch (error) {
        alert("Failed to retrieve class type ID. Check console for details.");
      }
    } else {
      alert("Please select a class name and type first!");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-600 text-white"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <Side
        isSidebarOpen={isSidebarOpen}
        navigationItems={[
          { name: 'Home', href: '/aOfficer-dashboard', icon: Home },
          { name: 'Logout', href: '#', icon: LogOut },
          { name: 'Settings', href: '#', icon: Settings },
        ]}
        settingItems={[
          { name: 'Edit Profile', path: `/edit-profile/AO_2025_10001` },
          { name: 'Change Password', path: '/change-password' },
        ]}
        officer_name="Maleesha"
        AO_ID="AO_2025_10001"
        editPath={`/aOfficer-dashboard/edit-profile`}
        changePath="/change-password"
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
        <Header />

        {/* Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Class Selector */}
            <div className="mb-8">
              <div className="relative">
                <button
                  onClick={() => setIsClassDropdownOpen(!isClassDropdownOpen)}
                  className="w-full bg-white p-3 lg:p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <span className="text-base lg:text-lg truncate">{selectedClass}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isClassDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isClassDropdownOpen && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
                    {classTypes.map((classItem) => (
                      <button
                        key={classItem}
                        onClick={() => {
                          setSelectedClass(classItem);
                          setIsClassDropdownOpen(false);
                        }}
                        className={`w-full p-3 lg:p-4 text-left hover:bg-gray-50 text-sm lg:text-base ${
                          selectedClass === classItem ? 'bg-green-50 text-green-600' : ''
                        }`}
                      >
                        {classItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Class Type Selector */}
            <div className="mb-8">
              <div className="relative">
                <button
                  onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                  className="w-full bg-white p-3 lg:p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <span className="text-base lg:text-lg truncate">{selectedType}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isTypeDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isTypeDropdownOpen && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
                    {types.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setIsTypeDropdownOpen(false);
                        }}
                        className={`w-full p-3 lg:p-4 text-left hover:bg-gray-50 text-sm lg:text-base ${
                          selectedType === type ? 'bg-green-50 text-green-600' : ''
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Attendance Card */}
            <button
              onClick={handleNavigate}
              className="bg-green-500 rounded-lg p-6 lg:p-8 text-center w-full flex items-center justify-center shadow hover:bg-green-600 transition-colors duration-200 text-decoration-none"
            >
              <h2 className="text-xl lg:text-2xl font-semibold text-white">Mark Attendance</h2>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AOfficerDashboard;