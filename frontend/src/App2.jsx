import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar"
// import Button from "./components/Button"
import styles from "./App2.module.css";
import StudentImg from "./assets/StudentImg.svg"
import QuizCard from "./components/QuizCard";
import PaperHearderCard from "./components/PaperHearderCard";
import PaperCard from "./components/PaperCard";
import UploadPhotoCard from "./components/UploadPhotoCard";
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { HiMiniDocumentCurrencyDollar } from "react-icons/hi2";
import { Outlet } from "react-router-dom";


const App2 = () => {
  return (
    <div>
      <div className={styles.container}>
      <Sidebar BackgroundColor={"#13A68A"} ImgURL={StudentImg} Name={"Alia Bhatt"} Id={"SC/2021/12405"} Logout={()=>{console.log("Click Logout Button")}} Tab1={"Home"} Tab1Icon={FaHome} Tab1functions={"/"} Tab2={"Payment"} Tab2Icon={MdOutlinePayment} Tab2functions={"/payment"} Tab3={"Timetable"} Tab3Icon={HiCalendarDateRange} Tab3functions={"/timetable"} Tab4={"Setting"} Tab4Icon={IoIosSettings} Tab4functions={"/setting"} Tab5={"Payment History"} Tab5Icon={HiMiniDocumentCurrencyDollar} Tab5functions={"/payment-history"} AddNewTab={true} Tab6={"New Tab"} Tab6Icon={FaHome} Tab6functions={"/new-tab"}/>
      <div>
        <Outlet/>
        {/* remove below */}
        <div style={{display:"flex"}}>
          <QuizCard QuizCardDuration={"08.00am -10.00am"} QuizCardDate={"2025-03-24"} QuizCardPrecentage={"100%"}/><QuizCard QuizCardDuration={"08.00am -10.00am"} QuizCardDate={"2025-03-24"} QuizCardPrecentage={"100%"}/>
        </div>
        <div>
          <PaperHearderCard Date={"2025 - 03 - 25"} Duration={"08.00am - 10.00am"}/>
        </div>
        <div>
          <PaperCard QuestionID={"1"} Question={"Which of these is NOT a primary color?"} Answer1={"Red"} Answer2={"Blue"} Answer3={"Yellow"} Answer4={"Green"} />
          <PaperCard QuestionID={"2"} Question={"Which of these is NOT a primary color?"} Answer1={"Red"} Answer2={"Blue"} Answer3={"Yellow"} Answer4={"Green"} />
        </div>
        <div>
          <UploadPhotoCard ImgURL={StudentImg}/>
        </div>
      </div>
      
      {/* <Button name={"Next"} action={()=>{console.log("Nimantha Click")}} backgroundColor={"#78D9C6"} fontColor={"#FFFFFF"} cornerRadius={false}/> */}
      </div>
     
    </div>
  );
};

export default App2;
