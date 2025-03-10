import React, { useState } from 'react';
import { Home, Settings, ChevronDown, LogOut, Menu, X } from 'lucide-react';
import Side from './Side';
import Header from './Header';
import { Link } from 'react-router-dom';

const AOfficerDashboard = () => {
  const [selectedClass, setSelectedClass] = useState('Theory class for 2026 GCE A/L ICT');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const classes = [
    'Theory class for 2026 GCE A/L ICT',
    'Paper class for 2026 GCE A/L ICT',
    'Paper class for 2027 GCE A/L ICT',
    'Theory class for 2027 GCE A/L ICT'
  ];

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
      <Side isSidebarOpen={isSidebarOpen}
        navigationItems={[
        { name: 'Home', href: '#', icon: Home }, 
        { name: 'Settings', href: '#', icon: Settings }, 
        ]}
        officer_name="Maleesha" AO_ID="AO_2025_10001"/>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1">
       <Header/>

        {/* Content */}
        <main className="p-4 lg:p-8">
          <div className="max-w-3xl mx-auto">
            {/* Class Selector */}
            <div className="mb-8">
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-white p-3 lg:p-4 rounded-lg shadow flex items-center justify-between"
                >
                  <span className="text-base lg:text-lg truncate">{selectedClass}</span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg z-10">
                    {classes.map((classItem) => (
                      <button
                        key={classItem}
                        onClick={() => {
                          setSelectedClass(classItem);
                          setIsDropdownOpen(false);
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

            {/* Attendance Card */}
            <Link to={'/qr-scanner'} className="bg-green-500 rounded-lg p-6 lg:p-8 text-center w-full flex items-center justify-center shadow hover:bg-green-600 transition-colors duration/2 rounded text-decoration-none">
              <h2 className="text-xl lg:text-2xl font-semibold text-white">Mark Attendance</h2>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AOfficerDashboard;