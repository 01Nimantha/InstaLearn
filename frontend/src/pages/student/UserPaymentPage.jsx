import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";

const UserPaymentPage = () => {
  const stripePromise = loadStripe("pk_test_51Qi8tPBrvnAB2ikXXB8OweXeWxs5NqnitLcnm0FNGzbQaKS1pPBGpJdWRtruDDg3bb1maaQSqYC7KIZ13mhtqsYZ00Uj7qpoY3");
  const navigate = useNavigate();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const priceList = [
    { class: "2025 A/L THEORY", price: "Rs. 3000" },
    { class: "2025 A/L PAPER", price: "Rs. 1500" },
    { class: "2026 A/L THEORY", price: "Rs. 2500" },
    { class: "2026 A/L PAPER", price: "Rs. 1000" }
  ];

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classTypes, setClassTypes] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setStudentId(storedUsername);
      fetchStudentName(storedUsername);
      fetchClassTypes(storedUsername);
    }
  }, []);

  const fetchStudentName = async (id) => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/student/get-student-by/${id}`);
      if (response.ok) {
        const data = await response.json();
        setStudentName(data.studentName); 
      } else {
        console.error("Failed to fetch student name");
      }
    } catch (error) {
      console.error("Error fetching student name:", error);
    }
  };

  const fetchClassTypes = async (id) => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/student/${id}/class-types`);
      if (response.ok) {
        const data = await response.json();
        const formattedClassTypes = data.map((item) => `${item.classTypeName} ${item.classType}`);
        setClassTypes(formattedClassTypes);
      } else {
        console.error("Failed to fetch class types");
      }
    } catch (error) {
      console.error("Error fetching class types:", error);
    }
  };

  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);

    const priceMap = {
      "2025 A/L THEORY": 3000,
      "2025 A/L PAPER": 1500,
      "2026 A/L THEORY": 2500,
      "2026 A/L PAPER": 1000,
    };

    setAmount(priceMap[selectedClassName] || "");
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
          status: "Pending",
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
          amount: parseFloat(amount) * 100,
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

  const handleViewHistory = () => {
    navigate("/student-dashboard/payment-history");
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-teal-700 mb-4 md:mb-0">Payment Portal</h1>
          <button
            onClick={handleViewHistory}
            className="bg-teal-600 text-white font-medium py-2 px-6 rounded-md hover:bg-teal-700 transition-colors"
          >
            View Payment History
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {/* Left Side - Payment Form (2/3 width) */}
          <div className="bg-white p-6 rounded-lg shadow-md lg:col-span-2">
            <h2 className="text-2xl font-bold text-teal-600 mb-6">Payment Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Student ID:</label>
                  <input
                    type="text"
                    value={studentId}
                    readOnly
                    className="p-2 border rounded-md border-gray-300 bg-gray-100"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Student Name:</label>
                  <input
                    type="text"
                    value={studentName}
                    readOnly
                    className="p-2 border rounded-md border-gray-300 bg-gray-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Class Type:</label>
                  <select
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="p-2 border rounded-md border-gray-300"
                    required
                  >
                    <option value="">Select Class</option>
                    {classTypes.map((classType, index) => (
                      <option key={index} value={classType}>
                        {classType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col">
                  <label className="mb-2 font-medium text-gray-700">Month:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-2 border rounded-md border-gray-300"
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
              </div>

              <div className="flex flex-col">
                <label className="mb-2 font-medium text-gray-700">Amount:</label>
                <input
                  type="text"
                  value={amount ? `Rs. ${amount}` : ""}
                  readOnly
                  className="p-2 border rounded-md border-gray-300 bg-gray-100 font-bold text-teal-700"
                />
              </div>

              <button
                onClick={handleCheckout}
                className="bg-teal-600 text-white font-medium py-3 px-6 rounded-md hover:bg-teal-700 transition-colors w-full mt-2"
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Right Side - Price List (1/3 width) */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit sticky top-4">
            <h2 className="text-2xl font-bold text-teal-600 mb-6">Class Prices</h2>
            <div className="space-y-4">
              {priceList.map((item, index) => (
                <div key={index} className="flex justify-between p-4 bg-gray-50 rounded-md border border-gray-200 hover:bg-teal-50 transition-colors">
                  <span className="font-medium text-gray-800">{item.class}</span>
                  <span className="font-bold text-teal-700">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPaymentPage;