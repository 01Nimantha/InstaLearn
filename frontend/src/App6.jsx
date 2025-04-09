import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar"
// import Button from "./components/Button"
import styles from "./App2.module.css";
import { PiBookBookmarkFill } from "react-icons/pi";
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { HiMiniDocumentCurrencyDollar } from "react-icons/hi2";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const App6 = () => {
  // const {id} = useParams();
  // const student = useSelector((store) => store.parentreducer.parentArr[0]);
  // const imageURL = useSelector((store) => store.parentimagereducer.imagePath);

  const {id} = useParams();

  const [parent, setParent] = useState([]);

  useEffect(()=>{
    loadParent();
  },[id]);

  const loadParent = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/parent/get-parent-by/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch teacher data. Status: ${response.status}`);
      const data = await response.json();
      setParent(data);
    } catch (error) {
      console.error("Error fetching parent:", error);
    }
  };
  return (
    <div className='flex min-h-screen'>
      <div className="fixed top-0 left-0 h-full"
        style={{ width: '280px' }}>  
       <Sidebar 
        BackgroundColor={"#5D13A6"} 
        ImgURL={parent.image?.imageId ? `http://localhost:8085/api/v1/image/get-image/${parent.image.imageId}` : null}
        Name={parent.parentName} 
        Id={parent.parentId} 
        Logout={()=>{console.log("Click Logout Button")}} 
        Tab1={"Home"} Tab1Icon={FaHome} Tab1functions={"/parent-dashboard/"+id} 
        Tab2={"Payment"} Tab2Icon={MdOutlinePayment} Tab2functions={"payment"} 
        Tab3={"Timetable"} Tab3Icon={HiCalendarDateRange} Tab3functions={"timetable"} 
        Tab6={"Setting"} Tab6Icon={IoIosSettings} Tab6functions={"settings"} 
        Tab5={"Payment History"} Tab5Icon={HiMiniDocumentCurrencyDollar} Tab5functions={"payment-history"} AddNewTab={true} 
        Tab4={"Attendence"} Tab4Icon={PiBookBookmarkFill} Tab4functions={"attendence"}/>
      </div>
      
       {/* Main content area that takes up the remaining space */}
       <div className="flex-1 bg-gray-100" style={{ marginLeft: '280px' }}>
       <Outlet/>

      </div>
    </div>
  );
};

export default App6;


