import { Avatar, Box, Typography } from '@mui/material'
import React,{ useEffect, useState } from 'react'
import Sidebar from '../../../components/Sidebar'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import StatCard from '../../../components/StatCard'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";


const TeacherDashboard = () => {
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
  //       const response = await fetch("https://your-api-endpoint.com/performance"); // Replace with actual API
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching performance data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const sampleData = [
    { time: "5k", performance: 25 },
    { time: "10k", performance: 50 },
    { time: "15k", performance: 40 },
    { time: "20k", performance: 95 }, 
    { time: "25k", performance: 60 },
    { time: "30k", performance: 55 },
    { time: "35k", performance: 20 },
    { time: "40k", performance: 80 },
    { time: "45k", performance: 65 },
    { time: "50k", performance: 70 },
    { time: "55k", performance: 60 },
    { time: "60k", performance: 75 }
  ];

  return (
    <div>
      <div className='d-flex'>
        <Sidebar />
        <div className='w-full'>
          {/* Use Flexbox to align the button to the right */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "blue",
              color: "white",
              p: 2,
              display: "flex", // Enable Flexbox
              justifyContent: "space-between", // Space between title and button
              alignItems: "center", // Vertically center items
            }}
          >
            <div>
              <Typography variant="h5">Welcome, Teacher</Typography>
              <Typography variant="subtitle1">
                Here's what's happening with your classes today
              </Typography>
            </div>
            <div>
              <Button
                name="Add Notice"
                action={() => alert("Add Notice!")}
                backgroundColor="white"
                fontColor="black"
                cornerRadius={true}
              />
            </div>
          </Box>
          
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '20px',
              p: 2,
            }}
          >
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
        
          

          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <Card />
            <Card />
          </div>
          {/* <div style={{ width: "100%", height: 400, backgroundColor: "#f8f9fa", padding: 20, borderRadius: 10 }}>
      <h3 style={{ marginBottom: 10 }}>Performance Overview</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="performance" stroke="#007bff" dot={{ stroke: "#007bff", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div> */}
    <div style={{ width: "100%", height: 400, backgroundColor: "#f8f9fa", padding: 20, borderRadius: 10 }}>
      <h3 style={{ marginBottom: 10 }}>Performance Overview</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={sampleData}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="performance" stroke="#007bff" dot={{ stroke: "#007bff", strokeWidth: 2 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard

