import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom"; // Added useNavigate for redirection
import { QrReader } from "@blackbox-vision/react-qr-reader";
import axios from "axios";

const QR_Scan = () => {

  const [searchParams] = useSearchParams(); // Access query parameters
  const aOfficerID = searchParams.get("aOfficerId"); // Get aOfficerId from query par
  const image = "/src/assets/images/QRbg.jpg";
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scanResult, setScanResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const lastScanned = useRef(null);
  const scanTimeout = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate(); // For redirecting after finishing

  const [student, setStudent] = useState({
    studentId: "",
    studentName: "",
  });

  const [manualStudent, setManualStudent] = useState({
    studentId: "",
    studentName: "",
  });

  const handleScan = useCallback(async (data) => {
    if (data && data !== lastScanned.current) {
      lastScanned.current = data; // Store last scanned value
      setScanResult(data);
      alert(`QR Code Scanned: ${data}`);

      clearTimeout(scanTimeout.current);

      scanTimeout.current = setTimeout(() => {
        setRefresh(true);
      }, 5000);
    }
  }, []);

  const handleError = (err) => {
    console.error("QR Scan Error:", err);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedDate = currentTime.toLocaleDateString();
  const formattedTime = currentTime.toLocaleTimeString();

  useEffect(() => {
    if (scanResult) {
      loadStudent();
    }
  }, [scanResult]);

  const loadStudent = async () => {
    try {
      const result = await axios.get(`http://localhost:8085/api/v1/student/get-student-by/${scanResult}`);
      setStudent(result.data);
      await handleSaveAttendance(result.data);
    } catch (error) {
      alert("Failed to load student data.");
    }
  };

  const handleSaveAttendance = async (studentData = student) => {
    const classId = new URLSearchParams(window.location.search).get("classTypeId");

    const attendanceData = {
      studentId: studentData.studentId,
    };
    try {
      await axios.post(`http://localhost:8085/api/v1/attendance/save-by-class-id/${classId}`, attendanceData);
      alert("Attendance saved successfully!");
    } catch (error) {
      alert("This Student is Not belong to this Class");
    }
  };

  // Effect to handle refresh
  useEffect(() => {
    if (refresh) {
      // Reset all states
      setScanResult(null);
      setStudent({ studentId: "", studentName: "" });
      setRefresh(false); // Reset refresh state
    }
  }, [refresh]);

  // Clear timeout on component unmount
  useEffect(() => {
    return () => {
      clearTimeout(scanTimeout.current);
    };
  }, []);

  // Handle manual student input change
  const handleManualInputChange = (e) => {
    const { name, value } = e.target;
    setManualStudent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle manual add submission
  const handleManualAdd = async () => {
    if (!manualStudent.studentId) {
      alert("Please fill the student ID.");
      return;
    }

    try {
      await handleSaveAttendance(manualStudent);
      setIsModalOpen(false); // Close the modal
      setManualStudent({ studentId: "", studentName: "" }); // Reset manual student state
    } catch (error) {
      alert("Failed to save manual attendance.");
    }
  };

  // Handle finalize attendance
  const handleFinalizeAttendance = async () => {
    const classId = new URLSearchParams(window.location.search).get("classTypeId");

    if (!classId) {
      alert("Class ID not found in URL parameters.");
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8085/api/v1/attendance/finalize-attendance/${classId}`);
      alert(response.data.message); // Show success message from backend
      navigate(`/aOfficer-dashboard/${aOfficerID}`); // Redirect to dashboard after finishing
    } catch (error) {
      alert("Failed to finalize attendance.");
    }
  };

  return (
    <div className="w-full max-w-full mx-auto shadow-lg min-h-screen">
      <div
        className="flex flex-col md:flex-row bg-white p-6 md:h-screen"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Left Side - QR Scanner */}
        <div className="w-full md:w-1/2 bg-green-500 p-6 relative md:h-full opacity-90 rounded-t-lg md:rounded-none md:rounded-l-lg">
          <h1 className="text-center text-white font-bold text-2xl mb-8">
            Paper class for 2026 GCE A/L ICT
          </h1>

          {/* QR Scanner */}
          <div className="mx-auto w-40 h-40 border-8 border-black rounded-2xl flex items-center justify-center mb-6 md:w-96 md:h-96">
            <div className="w-32 h-32 border-4 border-black border-dashed rounded-xl md:w-80 md:h-80">
              <QrReader
                delay={500}
                onError={handleError}
                onResult={(result) => handleScan(result?.text || result)}
                constraints={{ facingMode: "environment" }}
                videoStyle={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4">
            {/* Manual Add Button */}
          <button 
            className="w-full bg-gray-900 text-white py-3 px-4 rounded mt-8 hover:bg-gray-950"
            onClick={() => setIsModalOpen(true)} // Open modal on click
          >
            Manually Add
          </button>

          {/* Finish Button */}
          <button 
            className="w-full bg-red-500 text-white py-3 px-4 rounded mt-8 hover:bg-red-600"
            onClick={handleFinalizeAttendance} // Call finalize function on click
          >
            Finish
          </button>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 bg-gray-100 md:h-full opacity-95 rounded-b-lg md:rounded-none md:rounded-r-lg">
          {/* Date and Time */}
          <div className="text-right mb-6">
            <p className="text-green-600">{formattedDate}</p>
            <p className="text-green-600">{formattedTime}</p>
          </div>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-yellow-300 rounded-full relative">
                <div className="absolute w-10 h-10 bg-yellow-300 rounded-md top-12 left-3"></div>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Full Name"
                className="w-full p-2 border rounded bg-white text-black"
                value={student.studentName}
                readOnly
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Student Id</label>
              <input
                type="text"
                placeholder="Your Student ID"
                className="w-full p-2 border rounded bg-white text-black"
                value={student.studentId}
                readOnly
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Payment</label>
              <input
                type="text"
                placeholder="Paid/Not Paid"
                className="w-full p-2 border rounded bg-white text-black"
              />
            </div>
            <div className="flex justify-end items-end md:mt-36">
              <Link to={`/aOfficer-dashboard/${aOfficerID}`} className="btn btn-danger w-20">
                Exit
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Manual Add */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Manually Add Student</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Student ID</label>
                <input
                  type="text"
                  name="studentId"
                  placeholder="Enter Student ID"
                  className="w-full p-2 border rounded"
                  value={manualStudent.studentId}
                  onChange={handleManualInputChange}
                />
              </div>
              <div className="flex justify-between space-x-4">
                <button
                  className="bg-gray-500 text-white py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)} // Close modal
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded"
                  onClick={handleManualAdd} // Save manually added student
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QR_Scan;