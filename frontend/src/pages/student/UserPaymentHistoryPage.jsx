import React, { useState, useEffect } from "react";
import axios from "axios";

const UserPaymentHistoryPage = () => {
  const [paymentData, setPaymentData] = useState([]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Retrieve studentId (username) from local storage
  const studentId = localStorage.getItem("username");

  useEffect(() => {
    if (studentId) {
      axios.get(`http://localhost:8085/api/v1/payment/get-payment-record/${studentId}`)
        .then(response => {
          setPaymentData(response.data); // Store the fetched payment records
        })
        .catch(error => {
          console.error("Error fetching payment data:", error);
        });
    }
  }, [studentId]);

  // Function to check if the payment is made for a specific month and class type
  const getStatus = (month, classType) => {
    const fullClassType = `Advance Level ${classType}`;
    const record = paymentData.find(p => p.month === month && p.classType === fullClassType);
    return record && record.status === "Paid" ? "Paid" : "Not Paid";
  };

  return (
    <div className="overflow-x-auto w-full p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Month</th>
            <th className="border border-gray-300 px-4 py-2">Advance Level ICT THEORY</th>
            <th className="border border-gray-300 px-4 py-2">Advance Level ICT REVISION</th>
            <th className="border border-gray-300 px-4 py-2">Advance Level ICT PAPER CLASS</th>
          </tr>
        </thead>
        <tbody>
          {months.map((month, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-8 py-3 text-lg"><b>{month}</b></td>
              <td className={`border border-gray-300 px-4 py-2 font-semibold ${getStatus(month, "ICT THEORY") === "Paid" ? "text-green-500" : "text-red-500"}`}>
                {getStatus(month, "ICT THEORY")}
              </td>
              <td className={`border border-gray-300 px-4 py-2 font-semibold ${getStatus(month, "ICT REVISION") === "Paid" ? "text-green-500" : "text-red-500"}`}>
                {getStatus(month, "ICT REVISION")}
              </td>
              <td className={`border border-gray-300 px-4 py-2 font-semibold ${getStatus(month, "ICT PAPER CLASS") === "Paid" ? "text-green-500" : "text-red-500"}`}>
                {getStatus(month, "ICT PAPER CLASS")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserPaymentHistoryPage;
