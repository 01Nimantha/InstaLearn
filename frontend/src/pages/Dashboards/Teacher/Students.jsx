import React, { useState}from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Sidebar from '../../../components/Sidebar'
import SearchBar from "../../admin/common/SearchBar";
import StudentImg from "../../../assets/StudentImg.svg"
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { PiStudentFill } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';


const Students = () => {
  //  const [searchTerm, setSearchTerm] = useState('');
  //  const [students, setStudents] = useState([]);
    // const [studentData, setStudentData] = useState({
    //     studentID: '',
    //     fullName: '',
    //     address: '',
    //     email: '',
    //     parentName: '',
    //     contactNo: '',
    //     parentContactNo: ''
    //   });
    
    //   useEffect(() => {
    //     // Fetch data from the database
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('/api/student'); // Replace with your API endpoint
    //         setStudentData(response.data);
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);
  //   useEffect(()=>{
  //     loadStudents();
  // },[]);
  
  // // 
  // const loadStudents = async()=>{
  //     const result = await axios.get(
  //         'http://localhost:8085/api/v1/student/get-all-students',{
  //             validateStatus:()=>{
  //                 return true;
  //             }
  //         }
  //     );
  //     if(result.status == 302){
  //         setStudents(result.data);
  //     }    
  // }

  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]); // Holds filtered data

  // Fetch students when component mounts
  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8085/api/v1/student/get-all-students",
        {
          validateStatus: () => true,
        }
      );
      if (result.status === 302) {
        setStudents(result.data);
        setFilteredStudents(result.data); // Initialize filtered list
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Filter students when searchTerm changes
  useEffect(() => {
    const filtered = students.filter((student) =>
      student.studentID.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

    


  return (
    <div className='d-flex'>
        <div>  
        <Sidebar BackgroundColor={"#287f93"}
        ImgURL={StudentImg} Name={"Alia Bhatt"}
         Id="SC/2021/12405"
         Logout={()=>{console.log("Click Logout Button")}} 
         Tab1="Home" Tab1Icon={FaHome} Tab1functions="/"
         Tab2="Students" Tab2Icon={PiStudentFill} Tab2functions='/students'
         Tab3="Manage Schedule" Tab3Icon={HiCalendarDateRange} Tab3functions="/" 
         Tab4="Payments" Tab4Icon={MdOutlinePayment} Tab4functions="/payment"
         Tab5="Attendance" Tab5Icon={FaRegCalendarCheck} Tab5functions="/"
         AddNewTab={true} 
         Tab6="Settings" Tab6Icon={IoIosSettings} Tab6functions="/"/>
      </div>

      <div className="p-4 w-full">
      <h2 className="text-xl font-bold">Students</h2>
      <div className="relative flex items-center bg-white w-96 rounded-l-full shadow mt-10 h-14">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

      

      {/* <div>
        <br></br>
        <div className='w-full h-10  bg-[#287f93] rounded-lg'></div>
      <form className="space-y-4 p-4 w-full">
        <div>
          <label className="block text-sm font-medium text-gray-700">Student ID</label>
          <input
            type="text"
            // value={studentData.studentID}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            // value={studentData.fullName}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            // value={studentData.address}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            // value={studentData.email}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Name</label>
          <input
            type="text"
            // value={studentData.parentName}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact No</label>
          <input
            type="text"
            // value={studentData.contactNo}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Parent Contact No</label>
          <input
            type="text"
            // value={studentData.parentContactNo}
            // readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm"
          />
          
        </div>
      </form>
      </div> */}
      <br></br>
      

      {/* Student Info Card */}
      <div className="bg-white rounded-lg shadow-lg -mt-12-relative max-w-4xl mx-auto h-70%">
        {/* Blue Header */}
      <div className="max-w-4xl mx-auto h-15 bg-[#287f93] rounded-lg"></div>
      <div className='p-6'>
        <div className="flex items-center space-x-4">
          {/* Profile Image */}
          <img
            src="student.jpg"
            alt="Profile"
            className="w-16 h-16 rounded-full border-2 border-white"
          />
          <div>
            <h3 className="text-lg font-bold">Alexa Rawles</h3>
            <p className="text-gray-500">Student ID</p>
          </div>
        </div>

      <div className=''>
        {/* Form Grid */}
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Left Column */}
          <div>
            <label className="block text-gray-600">Full Name</label>
            <input type="text" placeholder="Student Name" className="w-full p-2 border rounded-lg" />

            <label className="block mt-4 text-gray-600">Email</label>
            <input type="email" placeholder="Student Email" className="w-full p-2 border rounded-lg" />

            <label className="block mt-4 text-gray-600">Contact No</label>
            <input type="text" placeholder="Student Contact No" className="w-full p-2 border rounded-lg" />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-gray-600">Address</label>
            <input type="text" placeholder="Student Address" className="w-full p-2 border rounded-lg" />

            <label className="block mt-4 text-gray-600">Parent Name</label>
            <input type="text" placeholder="Parent Name" className="w-full p-2 border rounded-lg" />

            <label className="block mt-4 text-gray-600">Parent Contact No</label>
            <input type="text" placeholder="Parent Contact No" className="w-full p-2 border rounded-lg" />
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
      
    </div>
  )
}

export default Students
