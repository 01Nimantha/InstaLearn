import { useEffect, useState } from "react";
import Logo from "../assets/Logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { quistionAction } from "../store/quistionSlice";
import axios from "axios";
import { useParams } from "react-router-dom";

const PaperHeaderCard = ({ examDate, examDuration ,BgColor}) => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasLogged, setHasLogged] = useState(false);

  const quistions = useSelector((store) => store.quistionreducer.quistionArr);
  const [mark, setMark] = useState(1);

  useEffect(() => {

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const logInterval = setInterval(() => {
      if (!hasLogged) {
        dispatch(quistionAction.makeDisable());
        setHasLogged(true);
        setMark(2);
      }
    }, 1000*60*60); // 1 hour = 60 minutes * 60 seconds * 1000 ms

    return () => {
      clearInterval(timeInterval);
      clearInterval(logInterval);
    };
  }, [hasLogged]); 

  // Format the time as hh:mm:ss AM/PM
  const formatTime = (date) => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const ampm = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // If 0, set to 12 (midnight)
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${hours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
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
    <div className="card" style={{ margin: "2%", padding: "2%", minWidth: "74vw", maxWidth: "74vw", backgroundColor: BgColor }}>
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "5%", marginTop: "3%", color: "#ffffff" }}>
          <div>For Information and Communications Technology</div>
          <div>Advanced Level Exam Past Paper</div>
          <div>{examDate}   English Medium</div>
          <div>Duration: {examDuration}</div>
          <div>
            <div className="text-2xl font-bold">Current Time: {formatTime(currentTime)}</div>
            <p> The question paper automatically gets submitted after 1 hour.</p>
          </div>
        </div>
        <div style={{ width: "40%", height: "40%",marginLeft: "6%"}}>
          <img src={Logo} alt="Logo" style={{ width: "70%", height: "70%" }} />
        </div>
      </div>
      
    </div>
  );
};

export default PaperHeaderCard;
