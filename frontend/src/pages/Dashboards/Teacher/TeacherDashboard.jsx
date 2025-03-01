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
  const [chartData, setChartData] = useState([]);


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
        averageScore: 50,
        attendanceRate: 92,
        quizAttemptRate: 78,
      };
      setStats(data);
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const date = new Date().toISOString().split('T')[0]; // Gets today's date
        
        // Fetch total students
        const response = await fetch(`http://localhost:8085/api/v1/attendance/count?date=${date}`);
        if (!response.ok) throw new Error(`Failed to fetch total students. Status: ${response.status}`);
        const totalStudents = await response.json();

        // Fetch average marks
        // const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }); // Ensures correct locale
        // const marksResponse = await fetch(`http://localhost:8085/api/v1/excel/average-marks/all?month=${currentMonth}`);
        // if (!marksResponse.ok) throw new Error(`Failed to fetch average marks. Status: ${marksResponse.status}`);
        
        // const marksData = await marksResponse.json();
        // const averageScore = marksData?.average || 0; // Ensure fallback to 0 if data is missing
        

        setStats((prevStats) => ({
          ...prevStats,
          totalStudents,
          // averageScore,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      
      try {
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' }); 
        // Fetch average marks
      
        const marksResponse = await fetch(`http://localhost:8085/api/v1/excel/average-marks/all?month=${currentMonth}`);
        if (!marksResponse.ok) throw new Error(`Failed to fetch average marks. Status: ${marksResponse.status}`);
        
        const marksData = await marksResponse.json();
        console.log("Marks Data Response:", marksData); // Debugging
        const averageScore = marksData?.average || 0;
        // Ensure fallback to 0 if data is missing
    
        setStats((prevStats) => ({
          ...prevStats,
          averageScore, 
        }));
        
      } catch (error) {
        console.error("Error fetching average score:", error);
      }
    };
    fetchStats();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/v1/excel/monthly-average-marks");
        if (!response.ok) throw new Error(`Failed to fetch chart data. Status: ${response.status}`);
  
        const data = await response.json();
        console.log("API Response:", data); // Debugging
  
        // Ensure backend response matches expected format
        const formattedData = data.map(item => ({
          time: item.month,          // Assuming your backend returns { month: "January", averageMarks: 75 }
          performance: item.averageMarks || 0, 
        }));
  
        setChartData(formattedData);
        
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
  
    fetchChartData();
  }, []);
  


  // const sampleData = [
  //   { time: "January", performance: 25 },
  //   { time: "February", performance: 50 },
  //   { time: "March", performance: 40 },
  //   { time: "April", performance: 95 }, 
  //   { time: "May", performance: 60 },
  //   { time: "June", performance: 55 },
  //   { time: "July", performance: 20 },
  //   { time: "August", performance: 80 }
  // ];


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
  <LineChart data={chartData}>
    <XAxis dataKey="time" label={{ value: "Month", position: "insideBottom", offset: -5 }} />
    <YAxis label={{ value: "Average Marks", angle: -90, position: "insideLeft" }} />
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

