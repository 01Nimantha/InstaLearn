import Card from "../../components/Card";
import EventCard from "../../components/EventCard";
import ImgCard from "../../components/ImgCard";
import OnlineQuiz from "../../assets/OnlineQuiz.svg";
import HomeWork from "../../assets/HomeWork.svg";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OnlineQuizProgress from "../../components/OnlineQuizProgress";
import { useEffect, useState } from "react";
import axios from "axios";
import { quistionAction } from "../../store/quistionSlice";
import { quizAction } from "../../store/quizSlice";
import { logingAction } from "../../store/logingSlice";

const ParentUserHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marks, setMarks] = useState([]);
  const dispatch = useDispatch();
  const stId = useSelector((store) => store.logingreducer.id);
  const { id } = useParams();

  const imageURL = useSelector((store) => store.parentimagereducer.imagePath);
  const student = useSelector((store) => store.parentreducer.parentArr[0]);

  const navigate = useNavigate();

  // First useEffect: Fetch student data and update Redux state
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://localhost:8085/api/v1/parent/get-student-by-parent/" + id);
        dispatch(logingAction.addUser(response.data)); 
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchStudentData();
  }, [id, dispatch]);

  // Second useEffect: Fetch related data once `stId` is available
  useEffect(() => {
    if (!stId) return; // If stId isn't set, don't make the API calls yet

    const fetchRelatedData = async () => {
      try {
        // Fetch data once stId is available
        const [quizResponse, allQuizzesResponse, performanceResponse] = await Promise.all([
          axios.get(`http://localhost:8085/QuestionPaper/GetNewfullPaper/${stId}`),
          axios.get("http://localhost:8085/QuestionPaper"),
          axios.get(`http://localhost:8085/QuestionPaper/GetTimeAndPerformance/${stId}`)
        ]);

        dispatch(quistionAction.addQuistion(quizResponse.data)); 
        dispatch(quizAction.updateQuize(allQuizzesResponse.data)); 
        setMarks(performanceResponse.data); 

        setLoading(false); 
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRelatedData();
  }, [stId, dispatch]); // Trigger this useEffect when stId is available

  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div style={{ display: "flex" }}>
        <ImgCard ImgCardName={student.Name} ImgCardImg={imageURL} ImgCardID={student.Id} BgColor={"#7B78D9"} />
        <EventCard BgColor={"#7B78D9"} BgHColor={"#5D13A6"} />
      </div>
      <div>
        <OnlineQuizProgress data={marks} BgColor={"#7B78D9"} />
      </div>
    </div>
  );
};

export default ParentUserHomePage;
