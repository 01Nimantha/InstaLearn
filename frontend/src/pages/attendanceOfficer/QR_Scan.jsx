import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { QrReader } from "@blackbox-vision/react-qr-reader";
import axios from "axios";

const QR_Scan = () => {

  const image = "/src/assets/images/QRbg.jpg";
  const [currentTime, setCurrentTime] = useState(new Date());

  const [scanResult, setScanResult] = useState(null);
  const lastScanned = useRef(null);
  const scanTimeout = useRef(null);

  const handleScan = useCallback((data) => {
    if (data && data !== lastScanned.current) {
      lastScanned.current = data; // Store last scanned value
      setScanResult(data);
      alert(`QR Code Scanned: ${data}`);

      clearTimeout(scanTimeout.current);
      scanTimeout.current = setTimeout(() => {
        lastScanned.current = null;
      }, 3000);
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

  const [student,setStudent] = useState({
    studentId: '',
    studentName: '',
  });

  useEffect(() => {
    if(scanResult){
    loadStudent();
    }
  },[scanResult]);

  const loadStudent = async()=>{
    const result = await axios.get(`http://localhost:8085/api/v1/student/get-student-by/${scanResult}`);
    setStudent(result.data);
  }



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

          {/* Manual Add Button */}
          <button className="w-full bg-black text-white py-2 px-4 rounded-md mt-8">
            Manually Add
          </button>
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
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">Student Id</label>
              <input
                type="text"
                placeholder="Your Student ID"
                className="w-full p-2 border rounded bg-white text-black"
                value={student.studentId}
              />
            </div>
            <div className="flex justify-end items-end md:mt-56">
              <Link to={"/aOfficer-dashboard"} className="btn btn-danger w-20">
                Exit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QR_Scan;
