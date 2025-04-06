import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import axios from "axios";
import { quistionAction } from "../../store/quistionSlice";
import { useEffect, useState } from "react";

const OnlineQuizPage = () => {
  const navigate = useNavigate();
  const quiz = useSelector((store) => store.quizreducer);
  const dispatch = useDispatch();
  const [marks, setMarks] = useState({});
  const [error, setError] = useState("");

  // Fetch marks for each quiz
  useEffect(() => {
    const fetchMarks = async () => {
      const newMarks = {};
      for (const item of quiz.quizArr) {
        try {
          const res = await axios.get(`http://localhost:8085/QuestionPaper/CalculateFullQuestionPaperMarks/ST_2025_10001/${item.id}`);
          newMarks[item.id] = res.data;
        } catch (err) {
          setError(err.message);
        }
      }
      setMarks(newMarks);
    };

    if (quiz.quizArr.length > 0) {
      fetchMarks();
    }
  }, [quiz.quizArr]);

  const updateQuistionSlice = (qpid) => {
    axios
      .get(`http://localhost:8085/QuestionPaper/GetfullPaper/ST_2025_10001/${qpid}`)
      .then((response) => {
        dispatch(quistionAction.addQuistion(response.data));
        navigate("/student-dashboard/online-qpaper");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <div className="fs-1" style={{ marginBottom: "2%" }}>
        <center>Online Quiz Progress</center>
      </div>
      <div className="container text-center">
        <div className="row row-cols-2">
          {quiz.quizArr.map((item, index) => (
            <div key={index} className="col">
              <QuizCard
                QuizCardDuration={item.duration}
                QuizCardDate={item.date}
                QuizCardPrecentage={marks[item.id] || 0}
                ButtnAction={() => updateQuistionSlice(item.id)}
              />
            </div>
          ))}
        </div>
        {error && <div className="text-danger mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default OnlineQuizPage;
