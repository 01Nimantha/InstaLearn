import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import axios from "axios";
import { quistionAction } from "../../store/quistionSlice";

const OnlineQuizPage=()=>{
  const navigate = useNavigate();
  const quiz = useSelector((store)=>store.quizreducer);
  const dispatch = useDispatch();
  
  const updateQuistionSlice = (qpid) => {
    axios
      .get("http://localhost:8085/QuestionPaper/GetfullPaper/ST_2025_10001/"+qpid)
      .then((response) => {
        dispatch(quistionAction.addQuistion(response.data));
        navigate("/student-dashboard/online-qpaper");
      })
      .catch((error) => {
        setError(error.message);
      });


    };

  return  <div>
            <div className="fs-1" style={{marginBottom:"2%"}}> <center>Online Quiz Progress</center></div>
            <div className="container text-center">
                <div className="row row-cols-2">
                  {quiz.quizArr.map((item, index) => (<div key={index} className="col">
                    <QuizCard key={index} QuizCardDuration={item.duration} QuizCardDate={item.date} QuizCardPrecentage={item.mark} ButtnAction={()=>{updateQuistionSlice(item.id);}}/>
                    </div>))}
                </div>
              </div>
  </div>;
}

export default OnlineQuizPage;