import PaperCard from "../../components/PaperCard";
import PaperHearderCard from "../../components/PaperHearderCard";
import {useDispatch, useSelector} from "react-redux"
import { testAction } from "../../store/index.js";
const QuestionPaperPage=()=>{
  const {testVal} = useSelector((store) => store.testreducer);
  const dispatch = useDispatch();
  const fun=()=>{
    dispatch(testAction.increment());
  }
  return <div>
    <div>
      <PaperHearderCard Date={"2025 - 03 - 25"} Duration={"08.00am - 10.00am"}/>
    </div>
    <div>
      <div>the test value is {testVal}</div>
      {[...Array(5)].map((_, index) => (<PaperCard key={index} QuestionID={"2"} Question={"Which of these is NOT a primary color?"} Answer1={"Red"} Answer2={"Blue"} Answer3={"Yellow"} Answer4={"Green"} />))}
      <button onClick={fun}>Click me bro</button>
    </div>
  </div>;
}

export default QuestionPaperPage;