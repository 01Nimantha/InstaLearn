import Card from "../../components/Card";
import EventCard from "../../components/EventCard";
import ImgCard from "../../components/ImgCard";
import OnlineQuiz from "../../assets/OnlineQuiz.svg"
import HomeWork from "../../assets/HomeWork.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OnlineQuizProgress from "../../components/OnlineQuizProgress";
const UserHomePage=()=>{
  const student = useSelector((store)=>store.studentreducer.studentArr[0]);
  const imageURL = useSelector((store)=>store.imagereducer.imagePath);
  const navigate =useNavigate();
  return <div>
  <div style={{display: "flex"}}>
    <ImgCard ImgCardName={student.Name} ImgCardImg={imageURL} ImgCardID={student.Id}/>
    <EventCard />
  </div>
  <div>
    <div style={{marginLeft:"2%"}}><h3>Activities</h3></div>
    <div style={{display: "flex"}}>
      <Card CardImg={OnlineQuiz} CardTitle={"Online Quiz"} CardBody={"Start : 2025/3/24 End : 2025/3/25 Duration: 1 hour"} CardButtonName={"Start quiz now"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} CardButtonAction={()=>{navigate("online-qpaper")}} />
      <Card CardImg={HomeWork} CardTitle={"Home Work"} CardBody={"Great achievements start with small, consistent steps your homework is one of them."} CardButtonName={"View"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} />
    </div>
  </div>
  <div>
    <OnlineQuizProgress/>
  </div>
</div>;
}

export default UserHomePage;