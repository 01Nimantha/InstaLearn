import React, { useState, useEffect } from "react";
import axios from "axios";

import moment from "moment";

const UserPaymentHistoryPage = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [classTypes, setClassTypes] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const studentId = localStorage.getItem("username");

  useEffect(() => {
    if (studentId) {
      axios.get(`http://localhost:8085/api/v1/payment/get-payment-record/${studentId}`)
        .then(response => setPaymentData(response.data))
        .catch(error => console.error("Error fetching payment data:", error));

      axios.get(`http://localhost:8085/api/v1/student/${studentId}/class-types`)
        .then(response => setClassTypes(response.data))
        .catch(error => console.error("Error fetching class types:", error));
    }
  }, [studentId]);

  const getMonths = () => {
    return [...Array(4)].map((_, index) => moment().subtract(index, 'months').format("MMMM"));
  };

  const getStatus = (month, classTypeName, classType) => {
    const fullClassType = `${classTypeName} ${classType}`;
    const record = paymentData.find(p => p.month === month && p.classType === fullClassType);
    return record && record.status === "Paid" ? "Paid" : "Not Paid";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="mx-auto w-full max-w-[98vw]">
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-gray-800">Payment Records</h3>
          <p className="text-2xl text-gray-600 mt-4">View your monthly payment status</p>
        </div>
        
        <div className="mb-12 flex flex-col sm:flex-row gap-6">
          <select
            className="px-6 py-4 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto text-2xl"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {getMonths().map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <button
            className="px-6 py-4 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto text-2xl"
            onClick={() => setSelectedMonth("")}
          >
            Clear Filter
          </button>
        </div>
        
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-gray-200 w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-max">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
                <tr>
                  <th className="px-12 py-8 text-left text-2xl font-bold text-white uppercase tracking-wider min-w-[300px]">
                    Month
                  </th>
                  {classTypes.map((type, index) => (
                    <th 
                      key={index} 
                      className="px-12 py-8 text-left text-2xl font-bold text-white uppercase tracking-wider min-w-[350px]"
                    >
                      {`${type.classTypeName} ${type.classType}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {getMonths()
                  .filter(month => !selectedMonth || month === selectedMonth)
                  .map((month, index) => (
                    <tr 
                      key={index} 
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
                    >
                      <td className="px-12 py-7 whitespace-nowrap text-2xl font-semibold text-gray-900 min-w-[300px]">
                        {month}
                      </td>
                      {classTypes.map((type, idx) => (
                        <td key={idx} className="px-12 py-7 whitespace-nowrap min-w-[350px]">
                          <span className={`px-8 py-4 inline-flex text-2xl font-bold rounded-xl
                            ${getStatus(month, type.classTypeName, type.classType) === "Paid" ?
                              'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                          >
                            {getStatus(month, type.classTypeName, type.classType)}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {paymentData.length === 0 && (
          <div className="mt-12 text-center text-2xl text-gray-500">
            No payment records found
          </div>
        )}
      </div>
    </div>
  );
};


const UserPaymentHistoryPage = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(""); // State for filtering
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const studentId = localStorage.getItem("username");

  useEffect(() => {
    if (studentId) {
      axios.get(`http://localhost:8085/api/v1/payment/get-payment-record/${studentId}`)
        .then(response => {
          setPaymentData(response.data);
        })
        .catch(error => {
          console.error("Error fetching payment data:", error);
        });
    }
  }, [studentId]);

  const getStatus = (month, classType) => {
    const fullClassType = `Advance Level ${classType}`;
    const record = paymentData.find(p => p.month === month && p.classType === fullClassType);
    return record && record.status === "Paid" ? "Paid" : "Not Paid";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-2 sm:px-6 lg:px-10 xl:px-16">
      <div className="mx-auto w-full max-w-[1800px]">

        {/* Page Title */}
        <div className="text-center mb-8">
          {/* <p className="mt-2 text-lg sm:text-xl text-gray-600">Monthly Payment Status Overview</p> */}
        </div>

        {/* Month Filter Dropdown */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-50/50 p-3 rounded-lg border border-blue-100 shadow-sm">
  <div>
    <h3 className="text-lg font-medium text-gray-800">Payment Records</h3>
    <p className="text-xs text-gray-500 mt-1">Filter and view your payment history</p>
  </div>

  <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 w-full sm:w-auto">
    <div className="relative w-full sm:w-56">
      <label 
        htmlFor="month-filter"
        className="absolute -top-2 left-2 px-1 text-xs font-medium text-blue-600 bg-blue-50/50 rounded"
      >
        Filter by Month
      </label>
      <select
        id="month-filter"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="w-full px-3 py-2 pr-8 text-sm border border-blue-200 rounded-md bg-white shadow-xs 
                 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all
                 hover:border-blue-300 appearance-none"
      >
        <option value="">All Months</option>
        {months.map((month, index) => (
          <option key={index} value={month}>{month}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>

    {selectedMonth && (
      <button 
        onClick={() => setSelectedMonth("")}
        className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
      >
        Clear filter
      </button>
    )}
  </div>
</div>



        {/* Table Container */}
        <div className="bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-700 to-blue-900">
                <tr>
                  <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider w-1/6">Month</th>
                  <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">Advance Level ICT THEORY</th>
                  <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">Advance Level ICT REVISION</th>
                  <th className="px-8 py-6 text-left text-lg font-bold text-white uppercase tracking-wider">Advance Level ICT PAPER CLASS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {months
                  .filter(month => selectedMonth === "" || month === selectedMonth)
                  .map((month, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100'}>
                      <td className="px-8 py-5 whitespace-nowrap text-xl font-semibold text-gray-900">
                        {month}
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-6 py-3 inline-flex text-lg font-bold rounded-lg 
                          ${getStatus(month, "ICT THEORY") === "Paid" ? 
                            'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                          {getStatus(month, "ICT THEORY")}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-6 py-3 inline-flex text-lg font-bold rounded-lg 
                          ${getStatus(month, "ICT REVISION") === "Paid" ? 
                            'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                          {getStatus(month, "ICT REVISION")}
                        </span>
                      </td>
                      <td className="px-8 py-5 whitespace-nowrap">
                        <span className={`px-6 py-3 inline-flex text-lg font-bold rounded-lg 
                          ${getStatus(month, "ICT PAPER CLASS") === "Paid" ? 
                            'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'}`}>
                          {getStatus(month, "ICT PAPER CLASS")}
                        </span>
                      </td>
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Message */}
        <div className="mt-8 bg-blue-100 border-l-8 border-blue-600 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-blue-900">
                If you notice any discrepancies in your payment records, please contact the administration office immediately.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserPaymentHistoryPage;
