import React from 'react';
import demo from '../assets/home.gif';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Header with back button */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8">
        <Link 
          to="/" 
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-800">
          Live Demo Preview
        </h1>
        
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Demo container with shadow and border */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden w-full max-w-4xl">
        {/* Demo header bar */}
        <div className="bg-gray-800 p-3 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-gray-300 text-sm">
            https://yourwebsite.com/demo
          </div>
        </div>
        
        {/* Actual demo content */}
        <div className="p-2 bg-gray-100">
          <img 
            src={demo} 
            alt="Application demo" 
            className="w-full h-auto rounded-b-lg border border-gray-200 shadow-sm"
          />
        </div>
      </div>

     

     
    </div>
  );
};

export default DemoPage;