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

const ParentUserHomePage=()=>{

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marks,setMarks] = useState([]);
  const dispatch = useDispatch();
  const {id}=useParams();
  

  const student = useSelector((store)=>store.studentreducer.studentArr[0]);
  const imageURL = useSelector((store)=>store.imagereducer.imagePath);
  const navigate =useNavigate();

  useEffect(() => {

    //create a funtion for get student id

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
    <ImgCard ImgCardName={student.Name} ImgCardImg={imageURL} ImgCardID={student.Id} BgColor={"#7B78D9"}/>
    <EventCard BgColor={"#7B78D9"} BgHColor={"#5D13A6"}/>
  </div>
  <div>
    <OnlineQuizProgress data={marks} BgColor={"#7B78D9"}/>
  </div>
</div>;
}

export default ParentUserHomePage;