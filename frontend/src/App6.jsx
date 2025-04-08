import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar"
// import Button from "./components/Button"
import styles from "./App2.module.css";
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { HiMiniDocumentCurrencyDollar } from "react-icons/hi2";
import { Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const App6 = () => {
  const {id} = useParams();
  const student = useSelector((store)=>store.studentreducer.studentArr[0]);
  const imageURL = useSelector((store)=>store.imagereducer.imagePath);
  return (
    <div>
      <div className={styles.container}>
        <Sidebar BackgroundColor={"#5D13A6"} ImgURL={imageURL} Name={student.Name} Id={student.Id} Logout={()=>{console.log("Click Logout Button")}} Tab1={"Home"} Tab1Icon={FaHome} Tab1functions={"/parent-dashboard/"+id} Tab2={"Payment"} Tab2Icon={MdOutlinePayment} Tab2functions={"payment"} Tab3={"Timetable"} Tab3Icon={HiCalendarDateRange} Tab3functions={"timetable"} Tab4={"Setting"} Tab4Icon={IoIosSettings} Tab4functions={"settings"} Tab5={"Payment History"} Tab5Icon={HiMiniDocumentCurrencyDollar} Tab5functions={"payment-history"} AddNewTab={false}/>
        <div className="flex-1 bg-gray-100" style={{ marginLeft: '280px' }}>
       <Outlet/>
      </div>
        {/* <Button name={"Next"} action={()=>{console.log("Nimantha Click")}} backgroundColor={"#78D9C6"} fontColor={"#FFFFFF"} cornerRadius={false}/> */}
      </div>
     
    </div>
  );
};

export default App6;
