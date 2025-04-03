import { Avatar, Box, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import StatCard from '../../../components/StatCard';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import TeacherQuiz from "../../../assets/TeacherQuiz.svg";
import Progress from "../../../assets/Progress.svg";
import Modal from '../../../components/Modal';
import { useNavigate, useParams } from "react-router-dom";

const TeacherDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    averageScore: 0,
    attendanceRate: 0,
    quizAttemptRate: 0,
  });

  // Fetch teacher data
  useEffect(() => {
    fetch(`http://localhost:8085/api/v1/teacher/get-teacher-by/${id}`)
      .then(response => response.json())
      .then(data => setTeacher(data))
      .catch(error => console.error("Error fetching teacher:", error));
  }, [id]);

  // Fetch total students and attendance
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const date = new Date().toISOString().split('T')[0];
        const response = await fetch(`http://localhost:8085/api/v1/attendance/count?date=${date}`);
        if (!response.ok) throw new Error(`Failed to fetch total students. Status: ${response.status}`);
        const totalStudents = await response.json();

        setStats(prev => ({ ...prev, totalStudents }));
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  // Fetch average score
  useEffect(() => {
    const fetchAverageScore = async () => {
      try {
        const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
        const marksResponse = await fetch(`http://localhost:8085/api/v1/excel/average-marks/all?month=${currentMonth}`);
        if (!marksResponse.ok) throw new Error(`Failed to fetch average marks. Status: ${marksResponse.status}`);
        const marksData = await marksResponse.json();
        const averageScore = marksData?.average || 0;

        setStats(prev => ({ ...prev, averageScore }));
      } catch (error) {
        console.error("Error fetching average score:", error);
      }
    };
    fetchAverageScore();
  }, []);

  // Fetch chart data
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch("http://localhost:8085/api/v1/excel/monthly-average-marks");
        if (!response.ok) throw new Error(`Failed to fetch chart data. Status: ${response.status}`);
        const data = await response.json();
        
        const formattedData = data.map(item => ({
          time: item.month,
          performance: item.averageMarks || 0,
        }));
        
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchChartData();
  }, []);

  if (!teacher) return <p>Loading...</p>;

  return (
    <div className='flex flex-col w-full p-4'>
      <Box className="w-full bg-[#287f93] text-white p-4 flex justify-between items-center rounded-[8px]">
        <div>
          <Typography variant="h5">Welcome, {teacher.name || 'Teacher'}</Typography>
          <Typography variant="subtitle1">
            Here's what's happening with your classes today
          </Typography>
        </div>
        <Button
          name="Add Notice"
          action={() => setShowModal(true)}
          backgroundColor="#FFFFFF"
          fontColor="black"
          cornerRadius={false}
        />
      </Box>

      <Modal 
        isVisible={showModal} 
        onClose={() => setShowModal(false)}
        children='Add'
      />

      <Box className="grid gap-4 mt-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
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

      <div className='flex flex-col sm:flex-row gap-5 mt-5'>
        <Card 
          CardImg={TeacherQuiz} 
          CardTitle="Online Quiz" 
          CardBody="Create and manage a comprehensive question pool to design customized quizzes for your students."
          CardButtonName="Generate quiz" 
          CardButtonBackgroundColor="#287f93" 
          CardButtonFontColor="#FFFFFF" 
          CardButtonCornerRadius={true} 
          CardButtonAction={() => navigate("quiz")}
        />
        <Card 
          CardImg={Progress} 
          CardTitle="View Progress" 
          CardBody="Monitor student performance with detailed progress insights."
          CardButtonName="View" 
          CardButtonBackgroundColor="#287f93" 
          CardButtonFontColor="#FFFFFF" 
          CardButtonCornerRadius={true} 
          CardButtonAction={() => navigate("progress")}
        />
      </div>

      <div className="w-full bg-[#f8f9fa] p-5 mt-5 rounded-[10px]">
        <h3 className='mb-5'>Performance Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={chartData}>
            <XAxis 
              dataKey="time" 
              label={{ value: "Month", position: "insideBottom", offset: -5 }} 
            />
            <YAxis 
              label={{ value: "Average Marks", angle: -90, position: "insideLeft" }} 
            />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line 
              type="monotone" 
              dataKey="performance" 
              stroke="#007bff" 
              dot={{ stroke: "#007bff", strokeWidth: 2 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeacherDashboard;