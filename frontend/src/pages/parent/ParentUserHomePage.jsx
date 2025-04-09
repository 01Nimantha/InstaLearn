import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "../../components/Card";
import EventCard from "../../components/EventCard";
import ImgCard from "../../components/ImgCard";
import OnlineQuizProgress from "../../components/OnlineQuizProgress";
import { quistionAction } from "../../store/quistionSlice";
import { quizAction } from "../../store/quizSlice";
import { logingAction } from "../../store/logingSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const ParentUserHomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [marks, setMarks] = useState([]);
  const [parent, setParent] = useState({
    parentName: "",
    parentId: "",
    student: {
      studentName: "",
      studentId: "",
      image: { imageId: "" },
    },
  });

  const dispatch = useDispatch();
  const stId = useSelector((store) => store.logingreducer.id);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch all data in a single useEffect
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch parent data first
        const parentResponse = await axios.get(`http://localhost:8085/api/v1/parent/get-parent-by/${id}`);
        const parentData = parentResponse.data;
        setParent(parentData);

        // Extract student ID from parent data if available, fallback to Redux stId
        const studentId = parentData.student?.studentId || stId;

        if (!studentId) {
          throw new Error("Student ID not found in parent data or Redux store");
        }

        // Fetch all related data concurrently
        const [quizResponse, allQuizzesResponse, performanceResponse] = await Promise.all([
          axios.get(`http://localhost:8085/QuestionPaper/GetNewfullPaper/${studentId}`),
          axios.get("http://localhost:8085/QuestionPaper"),
          axios.get(`http://localhost:8085/QuestionPaper/GetTimeAndPerformance/${studentId}`),
        ]);

        // Dispatch data to Redux
        dispatch(quistionAction.addQuistion(quizResponse.data));
        dispatch(quizAction.updateQuize(allQuizzesResponse.data));
        setMarks(performanceResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id, stId, dispatch]); // Depend on id and stId

  // Early return for loading and error states
  if (loading) {
    return (
      <div className="text-center mt-5">
        <p>Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center mt-5 text-danger">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row gap-4">
        <ImgCard
          ImgCardName={parent.student.studentName}
          ImgCardImg={
            parent.student.image?.imageId
              ? `http://localhost:8085/api/v1/image/get-image/${parent.student.image.imageId}`
              : null
          }
          ImgCardID={parent.student.studentId}
          BgColor={"#7B78D9"}
        />
        <EventCard BgColor={"#7B78D9"} BgHColor={"#5D13A6"} />
      </div>
      <div className="mt-4">
        <OnlineQuizProgress data={marks} BgColor={"#7B78D9"} />
      </div>
    </div>
  );
};

export default ParentUserHomePage;