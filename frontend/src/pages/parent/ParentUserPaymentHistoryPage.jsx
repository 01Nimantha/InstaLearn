import React, { useState, useEffect } from "react";
import axios from "axios";

import moment from "moment";

const ParentUserPaymentHistoryPage = () => {
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




export default ParentUserPaymentHistoryPage;
