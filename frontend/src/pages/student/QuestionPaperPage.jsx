import PaperCard from "../../components/PaperCard";
import PaperHearderCard from "../../components/PaperHearderCard";

const QuestionPaperPage=()=>{
  return <div>
    <div>
      <PaperHearderCard Date={"2025 - 03 - 25"} Duration={"08.00am - 10.00am"}/>
    </div>
    <div>
      {[...Array(5)].map((_, index) => (<PaperCard key={index} QuestionID={"2"} Question={"Which of these is NOT a primary color?"} Answer1={"Red"} Answer2={"Blue"} Answer3={"Yellow"} Answer4={"Green"} />))}
    </div>
  </div>;
}

export default QuestionPaperPage;