import React, { useState,useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from 'react-router-dom';


const UserPaymentPage = () => {
  const stripePromise = loadStripe("pk_test_51Qi8tPBrvnAB2ikXXB8OweXeWxs5NqnitLcnm0FNGzbQaKS1pPBGpJdWRtruDDg3bb1maaQSqYC7KIZ13mhtqsYZ00Uj7qpoY3");

  const navigate = useNavigate();
  const courseOptions = [
    { id: 1, name: "Advance Level ICT THEORY", fee: 3000.0 },
    { id: 2, name: "Advance Level ICT REVISION", fee: 2500.0 },
    { id: 3, name: "Advance Level ICT PAPER CLASS", fee: 2000.0 },
  ];

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setStudentId(storedUsername); // Auto-fill the Student ID field
      fetchStudentName(storedUsername);
    }
  }, []);

  const fetchStudentName = async (id) => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/student/get-student-by/${id}`);
      if (response.ok) {
        const data = await response.json();
        setStudentName(data.studentName); // Assuming API returns { "name": "John Doe" }
      } else {
        console.error("Failed to fetch student name");
      }
    } catch (error) {
      console.error("Error fetching student name:", error);
    }
  };

  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);

    // Find the fee based on the selected class name
    const selectedCourse = courseOptions.find((course) => course.name === selectedClassName);
    setAmount(selectedCourse ? selectedCourse.fee : "");
  };

  const handleCheckout = async () => {
    if (!amount || !selectedClass || !studentId || !studentName || !selectedMonth) {
      alert("Please fill all required fields");
      return;
    }

    try {

      const recordResponse = await fetch("http://localhost:8085/api/v1/payment/store-payment-record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          studentName,
          classType: selectedClass,
          month: selectedMonth,
          amount: parseFloat(amount),
          status: "Pending", // Initially set to Pending until payment is successful
        }),
      });
  
      if (!recordResponse.ok) {
        throw new Error("Failed to store payment record");
      }

      
      const response = await fetch("http://localhost:8085/api/v1/payment/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Convert to cents
          productName: selectedClass,
          studentId,
          studentName,
          month: selectedMonth,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const data = await response.json();

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        throw new Error("No session ID returned");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Payment processing failed: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-5xl mx-auto p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left Side - Form */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">Payment Details</h2>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Student ID :</label>
            <input
              type="text"
              value={studentId}
              readOnly // Prevent editing
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Student ID"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Student Name :</label>
            <input
              type="text"
              value={studentName}
              readOnly
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter Student Name"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Class Type :</label>
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Class</option>
              {courseOptions.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Month :</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            >
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium text-gray-700">Amount :</label>
            <input
              type="number"
              value={amount}
              readOnly
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-gray-100"
            />
          </div>

          <button
            onClick={handleCheckout}
            className="bg-teal-600 text-white font-medium py-2 px-6 rounded-md hover:bg-teal-700 transition-colors w-full"
          >
            Pay Now
          </button>
        </div>

        {/* Right Side - Course Cards */}
        <div className="space-y-4">
          <div className="flex justify-end mb-2">
            <button onClick={() => navigate("/student-dashboard/payment-history")} className="bg-teal-600 text-white rounded-md px-4 py-2 flex items-center space-x-2 hover:bg-teal-700 transition-colors">
              <span>View History</span>
            </button>
          </div>

          {courseOptions.map((course) => (
            <div
              key={course.id}
              className="border border-teal-200 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 text-center">
                <h3 className="font-medium text-lg text-teal-600">{course.name}</h3>
              </div>
              <div className="bg-teal-50 p-4 text-center">
                <p className="text-sm font-medium text-gray-600 mb-1">Class Fee</p>
                <p className="font-bold text-xl text-teal-600">LKR {course.fee.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPaymentPage;