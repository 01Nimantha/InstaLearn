import { Avatar, Box, Typography } from '@mui/material'
import React,{ Fragment, useEffect, useState } from 'react'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import StatCard from '../../../components/StatCard'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

import TeacherQuiz from "../../../assets/TeacherQuiz.svg"
import Progress from "../../../assets/Progress.svg"
import Modal from '../../../components/Modal';
import { Link, useNavigate } from "react-router-dom";



const TeacherDashboard = () => {
  const navigate = useNavigate();
  const[showModal,setShowModal]=useState(false);

  const [stats, setStats] = useState({
    totalStudents: 0,
    averageScore: 0,
    attendanceRate: 0,
    quizAttemptRate: 0,
  });

   // Simulate fetching data from the database
   useEffect(() => {
    // Replace this with your actual API call
    const fetchStats = async () => {
      // Simulate an API response
      const data = {
        totalStudents: 120,
        averageScore: 85,
        attendanceRate: 92,
        quizAttemptRate: 78,
      };
      setStats(data);
    };

    fetchStats();
  }, []);

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Replace this with your actual API call
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8085/api/v1/excel/get-by-id/${studentId}"); // Replace with actual API
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching performance data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total students
        const response = await fetch("http://localhost:8085/api/v1/student/count");
        const totalStudents = await response.json();

        setStats((prevStats) => ({
          ...prevStats,
          totalStudents,
        }));
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStats();
  }, []);


  const sampleData = [
    { time: "January", performance: 25 },
    { time: "February", performance: 50 },
    { time: "March", performance: 40 },
    { time: "April", performance: 95 }, 
    { time: "May", performance: 60 },
    { time: "June", performance: 55 },
    { time: "July", performance: 20 },
    { time: "August", performance: 80 }
  ];


  return (
    <div className='d-flex'>
      
  
      <div className='w-full'>
      
          {/* Use Flexbox to align the button to the right */}
          <Box className="w-full h-35 bg-[#287f93] text-white p-3 flex justify-between items-center rounded-[8px] ml-2.5" >
              <div>
                  <Typography variant="h5">Welcome, Teacher</Typography>
                  <Typography variant="subtitle1">
                    Here's what's happening with your classes today
                  </Typography>
              </div>
              <div className='d-flex'>
                <Button
                    name={"Add Notice"}
                    action={() => setShowModal(true)} // Open the modal on click
                    backgroundColor={"#FFFFFF"}
                    fontColor={"black"}
                    cornerRadius={false}
                  />
                <div className='z-50'>
                <Modal 
                  isVisible={showModal} 
                  onClose={() => setShowModal(false)}
                  children='Add'/>
                </div>
              </div>
          </Box>
          <Box className="grid gap-5 mt-5 p-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            <StatCard
              title="Total Students"
              value={stats.totalStudents}
              description="Number of enrolled students"
            />
            <StatCard
              title="Average Score"
              value={`${stats.averageScore}%`}
              description="Average score across all quizzes"
            />
            <StatCard
              title="Attendance Rate"
              value={`${stats.attendanceRate}%`}
              description="Percentage of students attending classes"
            />
            <StatCard
              title="Quiz Attempt Rate"
              value={`${stats.quizAttemptRate}%`}
              description="Percentage of students attempting quizzes"
            />
          </Box>
          <div className='flex gap-5 mt-5'>
            <Card CardImg={TeacherQuiz} CardTitle={"Online Quiz"} CardBody={"Create and manage a comprehensive question pool to design customized quizzes for your students, streamlining test preparation and evaluation."} CardButtonName={"Generate quiz"} CardButtonBackgroundColor={"#287f93"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} CardButtonAction={()=>{navigate("quiz")}}/>
            <Card CardImg={Progress} CardTitle={"View Progress"} CardBody={"Monitor student performance with detailed progress insights, enabling teachers to track academic growth, identify learning gaps, and provide timely interventions for improvement."} CardButtonName={"View"} CardButtonBackgroundColor={"#287f93"} CardButtonFontColor={"#FFFFFF"} CardButtonCornerRadius={true} CardButtonAction={()=>{navigate("progress")}}/>
          </div>
          <div className="w-full h-[400px] bg-[#f8f9fa] p-5 rounded-[10px]">
          <h3 className='mb-10'>Performance Overview</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={sampleData}>
            <XAxis dataKey="time" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
            <YAxis label={{ value: "Average Marks", angle: -90, position: "insideLeft",fontColor:"Black"}} />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="performance" stroke="#007bff" dot={{ stroke: "#007bff", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
          </div>
    </div>
    </div>
  );
}

export default TeacherDashboard

