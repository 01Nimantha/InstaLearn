import React from 'react'
import Sidebar from '../../../components/Sidebar'
import StudentImg from "../../../assets/StudentImg.svg"
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { PiStudentFill } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';


const Students = () => {
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
    


  return (
    <div className='d-flex'>
        <div>  
       <Sidebar BackgroundColor={"#287f93"}
        ImgURL={StudentImg} Name={"Alia Bhatt"}
         Id={"SC/2021/12405"} 
         Logout={()=>{console.log("Click Logout Button")}} 
         Tab1={"Home"} Tab1Icon={FaHome} Tab1Funtion={()=>{console.log("Click Tab 1")}} 
         Tab2={"Students"} Tab2Icon={PiStudentFill} Tab2Funtion={()=>{console.log("Click Tab 2")}} 
         Tab3={"Manage Schedule"} Tab3Icon={HiCalendarDateRange} Tab3Funtion={()=>{console.log("Click Tab 3")}} 
         Tab4={"Payments"} Tab4Icon={MdOutlinePayment} Tab4Funtion={()=>{console.log("Click Tab 4")}} 
         Tab5={"Attendance"} Tab5Icon={FaRegCalendarCheck} Tab5Funtion={()=>{console.log("Click Tab 5")}} 
         AddNewTab={true} 
         Tab6={"Settings"} Tab6Icon={IoIosSettings} Tab6functions={"/new-tab"}/>
      </div>

      <div className="p-4 w-full">
      <h2 className="text-xl font-bold">Students</h2>
        <div className="relative flex items-center bg-[#fff] w-96 rounded-l-full shadow mt-10 h-14">
              <input
                type="text"
                placeholder="Search by id..."
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-l-full border-gray-300"
              />
              <button className="absolute right-0 bg-[#287f93] text-[#fff] h-14 w-14 flex items-center  justify-center rounded-lg">
                <FaSearch/>
              </button>
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
