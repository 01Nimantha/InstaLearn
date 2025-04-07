import { useDispatch, useSelector } from "react-redux";
import PaperCard from "../../components/PaperCard";
import PaperHearderCard from "../../components/PaperHearderCard";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { quistionAction } from "../../store/quistionSlice";
import axios from "axios";
import { useEffect, useState } from "react";

const ParentQuestionPaperPage = () => {
  const quistions = useSelector((store) => store.quistionreducer.quistionArr);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [mark, setMark] = useState(1);
  const {id} = useParams();

  const handleMakeDisable = () => {
    dispatch(quistionAction.makeDisable());
    setMark(2);
  };

  useEffect(() => {
    if (mark === 2) {
      setTimeout(async () => {
        try {
          const response = await axios.put(
            "http://localhost:8085/QuestionPaper/UpdatefullPaper/"+id,
            quistions
          );
          console.log("Server Response:", response.data);
        } catch (error) {
          console.error("Error:", error);
        }
      },);
    }
  }, [mark, quistions]);

  return (
    <div>
      <div>
        <PaperHearderCard examDate="2025-02-26" examDuration="1 Hours" BgColor={"#5D13A6"}/>
      </div>
      <div>
        {quistions.map((item, index) => (
          <PaperCard
            key={index}
            QuestionID={item.id}
            Question={item.question}
            Answer1={item.options[0]}
            Answer2={item.options[1]}
            Answer3={item.options[2]}
            Answer4={item.options[3]}
            CorrectAnswer={item.correctAnswer}
            Disable={item.disable}
            StudentAnswer={item.studentAnswer}
          />
        ))}

        <div style={{ marginLeft: "67.8vw", marginBottom: "2vw" }}>
          <Button
            name={"Submit"}
            action={() => {
              handleMakeDisable();
              navigate(`/student-dashboard/${id}`);
            }}
            backgroundColor={"#5D13A6"}
            fontColor={"#ffffff"}
            cornerRadius={false}
          />
        </div>
      </div>
    </div>
  );
};

export default ParentQuestionPaperPage;
