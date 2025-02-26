import { useEffect, useState } from "react";
import { quistionAction } from "../store/quistionSlice";
import { useDispatch } from "react-redux";

const PaperCard =({QuestionID,Question,Answer1,Answer2,Answer3,Answer4,CorrectAnswer,Disable,StudentAnswer})=>{

  const dispatch = useDispatch()
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  useEffect(() => {
    if (selectedAnswer !== null) { 
      dispatch(quistionAction.addMark({
        id: QuestionID,
        question: Question,
        options: [Answer1, Answer2, Answer3, Answer4],
        correctAnswer: CorrectAnswer,
        disable: Disable,
        mark: selectedAnswer === CorrectAnswer,
        studentAnswer: selectedAnswer
      }));
    }
  }, [selectedAnswer, dispatch]); 
  

  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
      <div>{Question}</div>
    <div style={{display:"flex",marginLeft:"20%"}}>
      <div >
        <div>
          <input type="radio" name={QuestionID} value={Answer1} onChange={handleChange} checked={(StudentAnswer==Answer1)?true:false}  disabled={Disable}/>
          {Answer1}
        </div>
        <div>
          <input type="radio" name={QuestionID} value={Answer2} onChange={handleChange} checked={(StudentAnswer==Answer2)?true:false} disabled={Disable}/>
          {Answer2}
        </div>
      </div>

      <div style={{marginLeft:"2vw"}}>
        <div>
          <input type="radio" name={QuestionID} value={Answer3} checked={(StudentAnswer==Answer3)?true:false} onChange={handleChange} disabled={Disable}/>
          {Answer3}
        </div>
        <div>
          <input type="radio" name={QuestionID} value={Answer4} onChange={handleChange} checked={(StudentAnswer==Answer4)?true:false} disabled={Disable}/>
          {Answer4}
        </div>
      </div>
    </div>
    {(Disable)?<div style={{ marginTop: "10px", fontWeight: "bold", color:({Disable}&&((selectedAnswer || StudentAnswer) === CorrectAnswer)) ? "green" : "red" }}>
    {selectedAnswer || StudentAnswer ? 
        ((selectedAnswer || StudentAnswer) === CorrectAnswer ?
        <div>
          ✅ Your answer is correct!  
          <span style={{ color: "green" }}>correct answer [{CorrectAnswer}]</span>
        </div>
        : 
        <div>
          ❌ Your answer is not correct.  
          <span style={{ color: "green" }}>correct answer [{CorrectAnswer}]</span>
        </div>) 
        : <div style={{ color: "black" }}>
          You didn't select an answer.
          <span style={{ color: "green" }}>correct answer [{CorrectAnswer}]</span>
        </div>}
    </div>:null}

  </div>;
}

export default PaperCard;