import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Sidebar from './components/Sidebar';
import StudentImg from "./assets/StudentImg.svg"
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { PiStudentFill } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import axios from 'axios';


const App3 = () => {
 
  const {id} = useParams();

  const [teacher, setTeacher] = useState([]);
  const [imageURL, setImageURL] = useState(null);

  useEffect(()=>{
    loadTeacher();
    loadImageURL();
  },[id]);

  const loadTeacher = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/teacher/get-teacher-by/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch teacher data. Status: ${response.status}`);
      const data = await response.json();
      setTeacher(data);
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  const loadImageURL = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/image/get-image/${teacher.image.imageId}`);
      if (!response.ok) throw new Error(`Failed to fetch image URL. Status: ${response.status}`);
      const data = await response.json();
      setImageURL(data);
    } catch (error) {
      console.error("Error fetching image URL:", error);
    }
  };
  

  return (
    <div className='flex min-h-screen'>
      <div className="fixed top-0 left-0 h-full"
        style={{ width: '280px' }}>  
       <Sidebar BackgroundColor={"#287f93"}
         ImgURL={imageURL}
         Name={teacher.teacherName}
         Id={id}
         Logout={()=>{console.log("Click Logout Button")}} 
         Tab1="Home" Tab1Icon={FaHome} Tab1functions=""
         Tab2="Students" Tab2Icon={PiStudentFill} Tab2functions='students'
         Tab3="Manage Schedule" Tab3Icon={HiCalendarDateRange} Tab3functions="schedule" 
         Tab4="Payments" Tab4Icon={MdOutlinePayment} Tab4functions="payment"
         Tab5="Attendance" Tab5Icon={FaRegCalendarCheck} Tab5functions="attendence"
         AddNewTab={true} 
         Tab6="Settings" Tab6Icon={IoIosSettings} Tab6functions="settings"/>
        {/*  Tab7="Class" Tab7Icon={IoIosSettings} Tab7functions="class"/>  */}
      </div>
      
      
      
       {/* Main content area that takes up the remaining space */}
       <div className="flex-1 bg-gray-100" style={{ marginLeft: '280px' }}>
       <Outlet/>
      </div>
    </div>
  )
}

export default App3
