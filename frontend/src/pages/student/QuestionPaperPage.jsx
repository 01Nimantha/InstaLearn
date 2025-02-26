import { useDispatch, useSelector } from "react-redux";
import PaperCard from "../../components/PaperCard";
import PaperHearderCard from "../../components/PaperHearderCard";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { quistionAction } from "../../store/quistionSlice";

const QuestionPaperPage=()=>{
  const quistions = useSelector((store)=>store.quistionreducer.quistionArr);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return <div>
    <div>
      <PaperHearderCard Date={"2025 - 03 - 25"} Duration={"08.00am - 10.00am"}/>
    </div>
    <div>
      {quistions.map((item, index) => (<PaperCard key={index} QuestionID={item.id} Question={item.question} Answer1={item.options[0]} Answer2={item.options[1]} Answer3={item.options[2]} Answer4={item.options[3]} CorrectAnswer={item.correctAnswer} Disable={item.disable}  StudentAnswer={item.studentAnswer}/>))}

      <div style={{marginLeft:"67.8vw",marginBottom:"2vw"}}>
        <Button name={"Submit"} action={()=>{
          dispatch(quistionAction.makeDisable());
          navigate("/student-dashboard"); }} backgroundColor={"#78D9C6"} fontColor={"#ffffff"} cornerRadius={false} />
      </div>
    </div>
  </div>;
}

export default QuestionPaperPage;