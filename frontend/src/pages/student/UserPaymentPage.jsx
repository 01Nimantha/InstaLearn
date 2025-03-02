import React, { useState } from 'react';
import StripeCheckout from '../../components/StripeCheckout';

const UserPaymentPage = () => {
  // Course options and their associated fees
  const courseOptions = [
    { id: 1, name: 'Advance Level ICT THEORY', fee: 3000.00 },
    { id: 2, name: 'Advance Level ICT REVISION', fee: 2500.00 },
    { id: 3, name: 'Advance Level ICT PAPER CLASS', fee: 2000.00 },
  ];

  // State variables
  const [selectedClass, setSelectedClass] = useState(null);
  const [amount, setAmount] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');

  // Handle class selection change
  const handleClassChange = (classOption) => {
    setSelectedClass(classOption);
    setAmount(classOption.fee.toFixed(2));
  };
  const handlePayment = async () => {
    if (!amount || !selectedClassId || !studentId || !studentName) {
      alert("Please fill all required fields");
      return;
    }

    setIsProcessing(true);
    
    try {
      // Find selected course for product name
      const selectedCourse = courseOptions.find(course => course.id === parseInt(selectedClassId));
      
      // Create custom request that modifies the backend parameters
      const response = await fetch('http://localhost:8085/api/v1/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount) * 100, // Convert to smallest currency unit (cents/paisa)
          productName: selectedCourse?.name || "Class Fees",
          studentId: studentId,
          studentName: studentName
        })
      });

      if (!response.ok) {
        throw new Error('Payment request failed');
      }

      const result = await response.json();
      
      // Redirect to Stripe checkout 
      if (result.sessionId) {
        window.location.href = `https://checkout.stripe.com/c/pay/${result.sessionId}`;
      } else {
        throw new Error('No session ID returned');
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment processing failed: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Payments</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left side - Form */}
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
            <div className="relative">
              <select
                value={selectedClass?.id || ''}
                onChange={(e) => {
                  const selected = courseOptions.find(opt => opt.id === parseInt(e.target.value));
                  if (selected) handleClassChange(selected);
                }}
                className="w-full p-2 border rounded-md border-gray-200 focus:outline-none focus:border-teal-300 appearance-none"
              >
                <option value="">Select a class type</option>
                {courseOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div> */}
            </div>
          </div>
          
          <div className="flex flex-col">
            <label className="mb-2 font-medium">Amount :</label>
            <div className="relative">
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full p-2 border rounded-md border-gray-200 focus:outline-none focus:border-teal-300"
              />
              {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div> */}
            </div>
          </div>
          {/* <div onClick={handlePayment}> */}
            
          <StripeCheckout/>
          {/* <button className="bg-teal-200 text-gray-800 font-medium py-2 px-6 rounded-md hover:bg-teal-300 transition-colors w-24">
            Pay
          </button> */}
          {/* </div> */}
        </div>
        
        {/* Right side - Course cards */}
        <div className="space-y-4">
          {/* View History Button */}
          <div className="flex justify-end mb-2">
            <button className="bg-teal-200 rounded-md p-4 flex items-center space-x-2 hover:bg-teal-300 transition-colors">
              <span>View History</span>
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="black"/>
                  <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" fill="black"/>
                  <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" fill="black"/>
                </svg>
              </div>
            </button>
          </div>
          
          {/* Course Cards */}
          {courseOptions.map(course => (
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