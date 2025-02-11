import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar"
// import Button from "./components/Button"
import Card from "./components/Card"
import styles from "./App2.module.css";
import OnlineQuiz from "./assets/OnlineQuiz.svg"
import HomeWork from "./assets/HomeWork.svg"
import StudentImg from "./assets/StudentImg.svg"
import ImgCard from "./components/ImgCard";
import EventCard from "./components/EventCard";
import QuizCard from "./components/QuizCard";
import PaperHearderCard from "./components/PaperHearderCard";
import PaperCard from "./components/PaperCard";
import UploadPhotoCard from "./components/UploadPhotoCard";
import { FaHome } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { HiCalendarDateRange } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { HiMiniDocumentCurrencyDollar } from "react-icons/hi2";

const App2 = () => {
  return (
    <div>
      <div className={styles.container}>
      <Sidebar imgURL={StudentImg} name={"Alia Bhatt"} id={"SC/2021/12405"} Logout={()=>{console.log("Click Logout Button")}} Tab1={"Home"} Tab1Icon={FaHome} Tab1Funtion={()=>{console.log("Click Tab 1")}} Tab2={"Payment"} Tab2Icon={MdOutlinePayment} Tab2Funtion={()=>{console.log("Click Tab 2")}} Tab3={"Timetable"} Tab3Icon={HiCalendarDateRange} Tab3Funtion={()=>{console.log("Click Tab 3")}} Tab4={"Setting"} Tab4Icon={IoIosSettings} Tab4Funtion={()=>{console.log("Click Tab 4")}} Tab5={"Payment History"} Tab5Icon={HiMiniDocumentCurrencyDollar} Tab5Funtion={()=>{console.log("Click Tab 5")}}/>
      <div>
        <div className={styles.containerbody}>
          <ImgCard ImgCardName={"Alia Bhatt"} ImgCardImg={StudentImg} ImgCardID={"SC/2021/12405"}/>
          <EventCard />
        </div>
        <div>
          <div style={{marginLeft:"2%"}}>Activities</div>
          <div className={styles.containerbody}>
            <Card CardImg={OnlineQuiz} CardTitle={"Online Quiz"} CardBody={"Start : 2025/3/24 End : 2025/3/25 Duration: 8.00am -10.00am"} CardButtonName={"Start quiz now"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} />
            <Card CardImg={HomeWork} CardTitle={"Home Work"} CardBody={"Great achievements start with small, consistent steps your homework is one of them."} CardButtonName={"View"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} />
          </div>
        </div>
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
