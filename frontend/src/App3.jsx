import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from './components/Sidebar';
import StudentImg from "./assets/StudentImg.svg"
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { PiStudentFill } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";



const App3 = () => {
  return (
    <div style={{display:"flex"}}>
      <div>  
       <Sidebar BackgroundColor={"#287f93"}
        ImgURL={StudentImg} Name={"Alia Bhatt"}
         Id="SC/2021/12405"
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
      <div>
        <Outlet/>
      </div>
    </div>
  )
}

export default App3
