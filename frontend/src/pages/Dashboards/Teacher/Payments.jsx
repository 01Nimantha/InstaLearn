import React from 'react'
import Sidebar from '../../../components/Sidebar'
import Button from '../../../components/Button'
import StudentImg from "../../../assets/StudentImg.svg"
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { PiStudentFill } from "react-icons/pi";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";
import { FaSearch } from 'react-icons/fa';


const Payments = () => {
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
      <h2 className="text-xl font-bold">Payments</h2>
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
            

            <section>
                <table className='shadow mt-10 w-full'>
                <thead className='bg-[#EBEBEB] h-16'>
                    <tr className='text-center'>
                        <th>Student Id</th>
                        <th>January</th>
                        <th>February</th>
                        <th>March</th>
                        <th>April</th>
                    </tr>
                </thead>
                <tbody className='bg-[#ffffff] h-16'>
                <tr className='text-center'>
                        <th>ST000001</th>
                        <th>
                            <Button
                            name={"Paid"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"green"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> 
              
                        </th>
                        <th>
                            <Button
                            name={"Not Paid"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"red"} 
                            fontColor={"black"} 
                            cornerRadius={false}/> 
              
                        </th>
                        <th>
                            <Button
                            name={"Paid"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"green"} 
                            fontColor={"white"} 
                            cornerRadius={false}/> 
              
                        </th>
                        <th>
                            <Button
                            name={"Not Paid"} 
                            action={()=>{console.log("Nimantha Click")}} 
                            backgroundColor={"red"} 
                            fontColor={"white"} 
                            cornerRadius={false}/> 
              
                        </th>
                    </tr>
                </tbody>

                </table>
            </section>
      </div>
    </div>
  )
}

export default Payments
