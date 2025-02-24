import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';

const Students = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [studentData, setStudentData] = useState(null);

    // Function to fetch student data based on student ID
    const fetchStudentData = async (studentID) => {
        if (!studentID) return;
        try {
            const response = await axios.get(`http://localhost:8085/api/v1/student/get-student-by/${studentID}`);
            if (response.status === 200) {
                setStudentData(response.data);
            } else {
                setStudentData(null);
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
            setStudentData(null);
        }
    };

    // Handle search input changes
    useEffect(() => {
      if (searchTerm) {
          fetchStudentData(searchTerm);
      } else {
          setStudentData(null);
      }
  }, [searchTerm]); 
  

    return (
        <div className='d-flex'>
            <div className="p-4 w-full">
                <h2 className="text-xl font-bold">Students</h2>
                <div className="relative flex items-center bg-white w-96 rounded-l-full shadow mt-10 h-14">
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <br />
                <br/>
                <br/>
                <div className="bg-white rounded-lg shadow-lg -mt-12 max-w-4xl mx-auto h-auto">
                    <div className="max-w-4xl mx-auto h-15 bg-[#287f93] rounded-lg"></div>
                    <div className='p-6'>
                        <div className="flex items-center space-x-4">
                            <img src="student.jpg" alt="Profile" className="w-16 h-16 rounded-full border-2 border-white" />
                            <div>
                                <h3 className="text-lg font-bold">{studentData ? studentData.studentName : "Student Name"}</h3>
                                <p className="text-gray-500">{studentData ? studentData.studentID : "Student ID"}</p>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 gap-6 mt-6'>
                            <div>
                                <label className="block text-gray-600">Full Name</label>
                                <input type="text" value={studentData?.studentName || ""} readOnly className="w-full p-2 border rounded-lg" />
                                <label className="block mt-4 text-gray-600">Email</label>
                                <input type="email" value={studentData?.studentEmail || ""} readOnly className="w-full p-2 border rounded-lg" />
                                <label className="block mt-4 text-gray-600">Contact No</label>
                                <input type="text" value={studentData?.studentContactno || ""} readOnly className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-gray-600">Address</label>
                                <input type="text" value={studentData?.studentAddress || ""} readOnly className="w-full p-2 border rounded-lg" />
                                <label className="block mt-4 text-gray-600">Parent Name</label>
                                <input type="text" value={studentData?.studentParentName || ""} readOnly className="w-full p-2 border rounded-lg" />
                                <label className="block mt-4 text-gray-600">Parent Contact No</label>
                                <input type="text" value={studentData?.studentParentContactno || ""} readOnly className="w-full p-2 border rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Students;
