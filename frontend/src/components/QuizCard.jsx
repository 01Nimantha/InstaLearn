import QuizImg from "../assets/QuizImg.svg"
import Button from "./Button";
const QuizCard =({QuizCardDuration,QuizCardDate,QuizCardPrecentage})=>{
  return <div className="card" style={{marginLeft:"2%",marginTop:"2%", minWidth:"47%", maxWidth:"47%"}}>
    <div style={{display:"flex"}}>
      <div style={{width:"30%"}}>
        <img src={QuizImg}  alt="..." style={{minHeight:"100%"}}/> 
      </div>
      <div style={{marginTop:"1%",marginBottom:"1%",marginLeft:"2%"}}>
        <div>{QuizCardDuration}</div>
        <div>{QuizCardDate}</div>
        <div>{QuizCardPrecentage}</div>
      </div>
      <div style={{marginTop:"6%",marginLeft:"14%",marginRight:"2%"}}>
        <Button name={"Check"} backgroundColor={"#78D9C6"}fontColor={"#FFFFFF"} cornerRadius={true} 
        />
      </div>
    </div>
  </div>;
}

export default QuizCard;