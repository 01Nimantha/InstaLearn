import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

const UserPaymentPage = () => {
  const stripePromise = loadStripe("pk_test_51Qi8tPBrvnAB2ikXXB8OweXeWxs5NqnitLcnm0FNGzbQaKS1pPBGpJdWRtruDDg3bb1maaQSqYC7KIZ13mhtqsYZ00Uj7qpoY3");

  const courseOptions = [
    { id: 1, name: "Advance Level ICT THEORY", fee: 3000.0 },
    { id: 2, name: "Advance Level ICT REVISION", fee: 2500.0 },
    { id: 3, name: "Advance Level ICT PAPER CLASS", fee: 2000.0 },
  ];

  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [amount, setAmount] = useState("");

  const handleClassChange = (e) => {
    const selectedClassName = e.target.value;
    setSelectedClass(selectedClassName);

    // Find the fee based on the selected class name
    const selectedCourse = courseOptions.find((course) => course.name === selectedClassName);
    setAmount(selectedCourse ? selectedCourse.fee : "");
  };

  const handleCheckout = async () => {
    if (!amount || !selectedClass || !studentId || !studentName) {
      alert("Please fill all required fields");
      return;
    }

    try {
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
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Student ID :</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="p-2 border rounded-md border-gray-200 focus:outline-none focus:border-teal-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Student Name :</label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="p-2 border rounded-md border-gray-200 focus:outline-none focus:border-teal-300"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Class Type :</label>
            <select value={selectedClass} onChange={handleClassChange} required>
              <option value="">Select Class</option>
              {courseOptions.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-medium">Amount :</label>
            <input type="number" value={amount} readOnly className="p-2 border rounded-md border-gray-200 focus:outline-none focus:border-teal-300" />
          </div>

          <button onClick={handleCheckout} className="bg-teal-200 text-gray-800 font-medium py-2 px-6 rounded-md hover:bg-teal-300 transition-colors w-24">
            Pay
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-end mb-2">
            <button className="bg-teal-200 rounded-md p-4 flex items-center space-x-2 hover:bg-teal-300 transition-colors">
              <span>View History</span>
            </button>
          </div>

          {courseOptions.map((course) => (
            <div key={course.id} className="border border-teal-200 rounded-lg overflow-hidden">
              <div className="p-4 text-center">
                <h3 className="font-medium text-lg">{course.name}</h3>
              </div>
              <div className="bg-gray-200 p-4 text-center">
                <p className="text-sm font-medium mb-1">Class Fee</p>
                <p className="font-bold text-xl">{course.fee.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPaymentPage;
