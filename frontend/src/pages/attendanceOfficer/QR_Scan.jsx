import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import axios from "axios";

const QR_Scan = () => {
  const [searchParams] = useSearchParams();
  const aOfficerID = searchParams.get("aOfficerId");
  const classTypeID = searchParams.get("classTypeId");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lastScanned = useRef(null);
  const scanTimeout = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const [scanSuccess, setScanSuccess] = useState(false);
  const [classTypeInfo, setClassTypeInfo] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [student, setStudent] = useState({
    studentId: "",
    studentName: "",
    image: { imageId: "" },
  });

  const [manualStudent, setManualStudent] = useState({
    studentId: "",
    studentName: "",
  });

  useEffect(() => {
    loadClassDetails();
  }, [classTypeID]);

  const loadClassDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8085/classType/get-name-and-type/${classTypeID}`);
      setClassTypeInfo(response.data);
    } catch (error) {
      console.error("Failed to fetch class details:", error);
    }
  };

  const handleScan = useCallback(async (data) => {
    if (data && data !== lastScanned.current) {
      lastScanned.current = data;
      setScanResult(data);
      setScanSuccess(true);
      setTimeout(() => setScanSuccess(false), 3000);
      clearTimeout(scanTimeout.current);
      scanTimeout.current = setTimeout(() => setRefresh(true), 5000);
    }
  }, []);

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();
  const currentMonth = currentTime.toLocaleString('default', { month: 'long' });

  useEffect(() => {
    if (scanResult) {
      loadStudent();
    }
  }, [scanResult]);

  const loadStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:8085/api/v1/student/get-student-by/${scanResult}`);
      setStudent(result.data);
      await loadPaymentStatus(result.data.studentId);
      await handleSaveAttendance(result.data);
    } catch (error) {
      alert("Failed to load student data.");
    }
  };

  const loadPaymentStatus = async (studentId) => {
    if (!studentId) return;
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/payment/get-payment-record/${studentId}`);
      const paymentRecords = response.data;
      
      // Filter payment records for current month and matching class type
      const relevantPayment = paymentRecords.find(
        (record) =>
          record.month.toLowerCase() === currentMonth.toLowerCase() &&
          record.classType === classTypeInfo
      );

      setPaymentStatus(relevantPayment ? relevantPayment.status : "Not Paid");
    } catch (error) {
      console.error("Failed to load payment status:", error);
      setPaymentStatus("Error");
    }
  };

  const handleSaveAttendance = async (studentData = student) => {
    const classId = new URLSearchParams(window.location.search).get("classTypeId");
    if (!classId || !studentData.studentId) {
      alert("Error: Missing class ID or student ID.");
      return;
    }

    const attendanceData = { studentId: studentData.studentId };

    try {
      const response = await axios.post(
        `http://localhost:8085/api/v1/attendance/save-by-class-id/${classId}`,
        attendanceData
      );
      alert("Attendance saved successfully!");
      setScanResult(null);
      setStudent({ studentId: "", studentName: "", image: { imageId: "" } });
    } catch (error) {
      console.error("Error saving attendance:", error);
      if (error.response?.status === 400) {
        alert("This student does not belong to this class.");
      } else if (error.response?.status === 409) {
        alert("Attendance already recorded for this student.");
      } else {
        alert("Error saving attendance.");
      }
    }
  };

  useEffect(() => {
    if (refresh) {
      setScanResult(null);
      setStudent({ studentId: "", studentName: "", image: { imageId: "" } });
      setPaymentStatus(null);
      setRefresh(false);
    }
  }, [refresh]);

  useEffect(() => {
    return () => clearTimeout(scanTimeout.current);
  }, []);

  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleManualAdd = async () => {
    if (!manualStudent.studentId) {
      alert("Please fill the student ID.");
      return;
    }
    try {
      await handleSaveAttendance(manualStudent);
      setIsModalOpen(false);
      setManualStudent({ studentId: "", studentName: "" });
    } catch (error) {
      alert("Failed to save manual attendance.");
    }
  };

  const handleFinalizeAttendance = async () => {
    const classId = new URLSearchParams(window.location.search).get("classTypeId");
    if (!classId) {
      alert("Class ID not found.");
      return;
    }
    try {
      const response = await axios.post(`http://localhost:8085/api/v1/attendance/finalize-attendance/${classId}`);
      alert(response.data.message);
      navigate(`/aOfficer-dashboard/${aOfficerID}`);
    } catch (error) {
      alert("Failed to finalize attendance.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-green-50 via-white to-green-50 overflow-hidden animate-gradient-slow">
      <div className="container mx-auto px-4 py-2 max-w-7xl h-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
          <h1 className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600 animate-gradient hover:scale-105 transition-transform cursor-default">
            {classTypeInfo || "Loading class information..."}
          </h1>
          <div className="text-right bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
            <p className="text-sm text-gray-600 group-hover:translate-x-1 transition-transform">{formattedDate}</p>
            <p className="text-base font-semibold text-gray-800 group-hover:translate-x-1 transition-transform">{formattedTime}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 flex-1 min-h-0">
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur rounded-xl overflow-hidden shadow-lg flex flex-col transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-green-600 to-green-500 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <h2 className="text-lg font-semibold relative z-10">Scan QR Code</h2>
              <p className="text-green-100 text-xs relative z-10">Position the QR code within the frame</p>
            </div>
            <div className="p-3 flex flex-col items-center flex-1 justify-between">
              <div className="relative w-56 h-56 md:w-64 md:h-64 mx-auto group">
                <div className="absolute inset-0 border-2 border-gray-300 rounded-lg overflow-hidden transition-transform duration-300">
                  <QrReader
                    delay={500}
                    onError={handleError}
                    onResult={(result) => handleScan(result?.text || result)}
                    constraints={{ facingMode: "environment" }}
                    videoStyle={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-green-500 rounded-tl-lg animate-pulse"></div>
                  <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-green-500 rounded-tr-lg animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-green-500 rounded-bl-lg animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-green-500 rounded-br-lg animate-pulse"></div>
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="h-0.5 w-full bg-green-500/50 animate-scan"></div>
                </div>
                {scanSuccess && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg animate-fadeIn">
                    <div className="bg-white bg-opacity-90 rounded-lg p-3 shadow-lg animate-success">
                      <div className="flex items-center text-green-600">
                        <svg className="w-5 h-5 mr-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium text-sm">QR Code Scanned!</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3 w-full max-w-sm mt-3">
                <button
                  className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-3 rounded-lg shadow transition-all duration-300 flex items-center justify-center text-sm hover:scale-105 active:scale-95"
                  onClick={() => setIsModalOpen(true)}
                >
                  <svg className="w-4 h-4 mr-1 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Manual Entry
                </button>
                <button
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2 px-3 rounded-lg shadow transition-all duration-300 flex items-center justify-center text-sm hover:scale-105 active:scale-95"
                  onClick={handleFinalizeAttendance}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Finalize
                </button>
              </div>
              <Link
                to={`/aOfficer-dashboard/${aOfficerID}`}
                className="text-gray-600 hover:text-gray-800 text-xs flex items-center justify-center mt-2 hover:scale-110 transition-transform"
              >
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Return to Dashboard
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-white/90 backdrop-blur rounded-xl shadow-lg overflow-hidden flex flex-col transform hover:scale-[1.01] transition-all duration-300">
            <div className="p-3 bg-gradient-to-r from-gray-800 to-gray-700 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <h2 className="text-lg font-semibold relative z-10">Student Information</h2>
              <p className="text-gray-300 text-xs relative z-10">Attendance details</p>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              <div className="flex justify-center mb-3">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center transform transition-transform group-hover:scale-110 duration-300">
                    {student.studentId ? (
                      <img
                        src={
                          student.image?.imageId
                            ? `http://localhost:8085/api/v1/image/get-image/${student.image.imageId}`
                            : "https://th.bing.com/th/id/OIP.ZMB81W_uLDsEIxaMWxDljAHaHa?rs=1&pid=ImgDetMain"
                        }
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        className="w-10 h-10 text-gray-400 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    )}
                  </div>
                  {student.studentId && (
                    <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full w-5 h-5 flex items-center justify-center border-2 border-white shadow-md animate-bounce">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-gray-600 text-xs font-medium mb-1">Full Name</label>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-green-500 transition-colors">
                    {student.studentName || "Not scanned yet"}
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-gray-600 text-xs font-medium mb-1">Student ID</label>
                  <div className="bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-green-500 transition-colors">
                    {student.studentId || "Not scanned yet"}
                  </div>
                </div>
                <div className="transform transition-all duration-300 hover:scale-[1.02]">
                  <label className="block text-gray-600 text-xs font-medium mb-1">Payment Status ({currentMonth})</label>
                  <div
                    className={`bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 hover:border-green-500 transition-colors ${
                      paymentStatus === "Paid" ? "text-green-600" : 
                      paymentStatus === "Not Paid" ? "text-red-600" : 
                      paymentStatus === "Error" ? "text-yellow-600" : ""
                    }`}
                  >
                    {paymentStatus || "Not scanned yet"}
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-2 transform transition-all duration-300 hover:scale-[1.02] hover:bg-green-100">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-4 w-4 text-green-500 animate-pulse"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-2">
                      <p className="text-xs text-green-700">
                        Scan a student QR code or use manual entry to record attendance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto overflow-hidden animate-slideUp">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Manual Attendance</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none transform hover:rotate-90 transition-transform"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Enter Student ID"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-green-500"
                  value={manualStudent.studentId}
                  onChange={handleManualInputChange}
                />
                <p className="mt-2 text-sm text-gray-500">Please enter a valid student ID number.</p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white transition-all duration-200 flex items-center hover:scale-105 active:scale-95"
                  onClick={handleManualAdd}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Attendance
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        .animate-success {
          animation: success 0.3s ease-out;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes success {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes slideUp {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default QR_Scan;