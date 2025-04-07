import Card from "../../components/Card";
import EventCard from "../../components/EventCard";
import ImgCard from "../../components/ImgCard";
import OnlineQuiz from "../../assets/OnlineQuiz.svg"
import HomeWork from "../../assets/HomeWork.svg"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OnlineQuizProgress from "../../components/OnlineQuizProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import { quistionAction } from "../../store/quistionSlice";
import { quizAction } from "../../store/quizSlice";

const UserHomePage=()=>{

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marks,setMarks] = useState([]);
  const dispatch = useDispatch();
  const {id}=useParams();
  

  const student = useSelector((store)=>store.studentreducer.studentArr[0]);
  const imageURL = useSelector((store)=>store.imagereducer.imagePath);
  const navigate =useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8085/QuestionPaper/GetNewfullPaper/"+id)
      .then((response) => {
        setLoading(false);
        dispatch(quistionAction.addQuistion(response.data));
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    axios
      .get("http://localhost:8085/QuestionPaper")
      .then((response) => {
        setLoading(false);
        dispatch(quizAction.updateQuize(response.data));
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });

    axios
      .get("http://localhost:8085/QuestionPaper/GetTimeAndPerformance/"+id)
      .then((response)=>{
        setLoading(false);
        setMarks(response.data);
      })
      .catch((error)=>{
        setError(error.message);
        setLoading(false);
      });
    
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return <div>
  <div style={{display: "flex"}}>
    <ImgCard ImgCardName={student.Name} ImgCardImg={imageURL} ImgCardID={student.Id} BgColor={"#13A68A"}/>
    <EventCard BgColor={"#78D9C6"} BgHColor={"#13A68A"}/>
  </div>
  <div>
    <div style={{marginLeft:"2%"}}><h3>Activities</h3></div>
    <div style={{display: "flex"}}>
      <Card CardImg={OnlineQuiz} CardTitle={"Online Quiz"} CardBody={"Start : 2025/3/24 End : 2025/3/25 Duration: 1 hour"} CardButtonName={"Start quiz now"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} CardButtonAction={()=>{navigate("online-qpaper")}} />
      <Card CardImg={HomeWork} CardTitle={"Home Work"} CardBody={"Great achievements start with small, consistent steps your homework is one of them."} CardButtonName={"View"} CardButtonBackgroundColor={"#78D9C6"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} />
    </div>
  </div>
  <div>
    <OnlineQuizProgress data={marks} BgColor={"#78D9C6"}/>
  </div>
</div>;
}

export default UserHomePage;