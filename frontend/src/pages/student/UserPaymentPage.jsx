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
    { class: "2025 A/L THEORY", price: "Rs. 1500" },
    { class: "2025 A/L PAPER", price: "Rs. 1500" },
    { class: "2026 A/L THEORY", price: "Rs. 2000" },
    { class: "2026 A/L PAPER", price: "Rs. 2000" },
    { class: "2025 REVISION THEORY", price: "Rs. 1000" },
    { class: "2025 REVISION PAPER", price: "Rs. 1000" }
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
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <h1 className="text-4xl font-bold text-teal-700 mb-4 md:mb-0">Payment Portal</h1>
          <button
            onClick={handleViewHistory}
            className="bg-teal-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors text-xl"
          >
            View Payment History
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 w-full">
          {/* Left Side - Payment Form (2/3 width) */}
          <div className="bg-white p-8 rounded-xl shadow-lg lg:col-span-2">
            <h2 className="text-3xl font-bold text-teal-600 mb-8">Payment Details</h2>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="mb-3 font-semibold text-gray-700 text-xl">Student ID:</label>
                  <input
                    type="text"
                    value={studentId}
                    readOnly
                    className="p-3 border-2 rounded-lg border-gray-300 bg-gray-100 text-xl"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="mb-3 font-semibold text-gray-700 text-xl">Student Name:</label>
                  <input
                    type="text"
                    value={studentName}
                    readOnly
                    className="p-3 border-2 rounded-lg border-gray-300 bg-gray-100 text-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col">
                  <label className="mb-3 font-semibold text-gray-700 text-xl">Class Type:</label>
                  <select
                    value={selectedClass}
                    onChange={handleClassChange}
                    className="p-3 border-2 rounded-lg border-gray-300 text-xl"
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
                  <label className="mb-3 font-semibold text-gray-700 text-xl">Month:</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="p-3 border-2 rounded-lg border-gray-300 text-xl"
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
                <label className="mb-3 font-semibold text-gray-700 text-xl">Amount:</label>
                <input
                  type="text"
                  value={amount ? `Rs. ${amount}` : ""}
                  readOnly
                  className="p-3 border-2 rounded-lg border-gray-300 bg-gray-100 font-bold text-teal-700 text-xl"
                />
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-teal-600 text-white py-4 text-xl font-semibold rounded-lg hover:bg-teal-700 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Right Side - Price List */}
          <div className="bg-white p-8 rounded-xl shadow-lg h-fit sticky top-6">
            <h2 className="text-3xl font-bold text-teal-600 mb-8">Class Prices</h2>
            <div className="space-y-6">
              {priceList.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between p-6 bg-gray-50 rounded-xl border-2 border-gray-200 hover:bg-teal-50 transition-colors"
                >
                  <span className="font-semibold text-gray-800 text-xl">{item.class}</span>
                  <span className="font-bold text-teal-700 text-xl">{item.price}</span>
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
