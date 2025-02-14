import Card from "../../components/Card";
import EventCard from "../../components/EventCard";
import ImgCard from "../../components/ImgCard";
import StudentImg from "../../assets/StudentImg.svg"
import OnlineQuiz from "../../assets/OnlineQuiz.svg"
import HomeWork from "../../assets/HomeWork.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
const UserHomePage=()=>{
  const navigate =useNavigate();
  return <div>
  <div style={{display: "flex"}}>
    <ImgCard ImgCardName={"Alia Bhatt"} ImgCardImg={StudentImg} ImgCardID={"SC/2021/12405"}/>
    <EventCard />
  </div>
  <div>
    <div style={{marginLeft:"2%"}}>Activities</div>
    <div style={{display: "flex"}}>
      <Card CardImg={OnlineQuiz} CardTitle={"Online Quiz"} CardBody={"Start : 2025/3/24 End : 2025/3/25 Duration: 8.00am -10.00am"} CardButtonName={"Start quiz now"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} CardButtonAction={()=>{navigate("/online-quiz")}} />
      <Card CardImg={HomeWork} CardTitle={"Home Work"} CardBody={"Great achievements start with small, consistent steps your homework is one of them."} CardButtonName={"View"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} />
    </div>
  </div>
</div>;
}

export default UserHomePage;