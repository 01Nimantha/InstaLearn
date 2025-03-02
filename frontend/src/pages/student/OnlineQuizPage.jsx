import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";

const OnlineQuizPage=()=>{
  const navigate = useNavigate();
  const quiz = useSelector((store)=>store.quizreducer);
  return  <div>
            <div className="fs-1" style={{marginBottom:"2%"}}> <center>Online Quiz Progress</center></div>
            <div className="container text-center">
                <div className="row row-cols-2">
                  {quiz.quizArr.map((item, index) => (<div key={index} className="col">
                    <QuizCard key={index} QuizCardDuration={item.Duration} QuizCardDate={item.Date} QuizCardPrecentage={item.Mark} ButtnAction={()=>{navigate("/student-dashboard/online-qpaper")}}/>
                    </div>))}
                </div>
              </div>
  </div>;
}

export default OnlineQuizPage;