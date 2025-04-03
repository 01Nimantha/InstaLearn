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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto w-full max-w-[95vw]">
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800">Payment Records</h3>
          <p className="text-lg text-gray-600 mt-2">View your monthly payment status</p>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <select
            className="px-5 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto text-lg"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {getMonths().map((month, index) => (
              <option key={index} value={month}>{month}</option>
            ))}
          </select>
          <button
            className="px-5 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors w-full sm:w-auto text-lg"
            onClick={() => setSelectedMonth("")}
          >
            Clear Filter
          </button>
        </div>
        
        <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200 w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-max">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-800">
                <tr>
                  <th className="px-10 py-6 text-left text-lg font-bold text-white uppercase tracking-wider min-w-[200px]">
                    Month
                  </th>
                  {classTypes.map((type, index) => (
                    <th 
                      key={index} 
                      className="px-10 py-6 text-left text-lg font-bold text-white uppercase tracking-wider min-w-[250px]"
                    >
                      {`${type.classTypeName} ${type.classType}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {getMonths()
                  .filter(month => !selectedMonth || month === selectedMonth)
                  .map((month, index) => (
                    <tr 
                      key={index} 
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50 hover:bg-gray-100 transition-colors'}
                    >
                      <td className="px-10 py-5 whitespace-nowrap text-xl font-semibold text-gray-900 min-w-[200px]">
                        {month}
                      </td>
                      {classTypes.map((type, idx) => (
                        <td key={idx} className="px-10 py-5 whitespace-nowrap min-w-[250px]">
                          <span className={`px-6 py-3 inline-flex text-lg font-bold rounded-lg
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
          <div className="mt-8 text-center text-xl text-gray-500">
            No payment records found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPaymentHistoryPage;