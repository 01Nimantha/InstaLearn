import QuizCard from "../../components/QuizCard";

const OnlineQuizPage=()=>{

  return  <div>
            <div className="fs-1" style={{marginBottom:"2%"}}> <center>Online Quiz Progress</center></div>
            <div className="container text-center">
                <div className="row row-cols-2">
                  {[...Array(5)].map((_, index) => (<div key={index} className="col">
                    <QuizCard QuizCardDuration={"08.00am -10.00am"} QuizCardDate={"2025-03-24"} QuizCardPrecentage={"100%"}/>
                    </div>))}
                </div>
              </div>
  </div>;
}

export default OnlineQuizPage;