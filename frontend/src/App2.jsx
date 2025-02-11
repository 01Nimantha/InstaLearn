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
const App2 = () => {
  return (
    <div>
      <div className={styles.container}>
      <Sidebar/>
      <div>
        <div className={styles.containerbody}>
          <ImgCard ImgCardName={"Nimantha"} ImgCardImg={StudentImg} ImgCardID={"SC/2021/12405"}/>
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
          <PaperHearderCard/>
        </div>
        
      </div>
      
      {/* <Button name={"Next"} action={()=>{console.log("Nimantha Click")}} backgroundColor={"#78D9C6"} fontColor={"#FFFFFF"} cornerRadius={false}/> */}
      </div>
     
    </div>
  );
};

export default App2;
