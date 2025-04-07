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
import Header from '../../attendanceOfficer/Header';

const TeacherDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 70,
    averageScore: 71.5,
    attendanceRate: 70,
    quizAttemptRate: 65,
  });

  // Fetch teacher data with a refresh mechanism
  const fetchTeacherData = async () => {
    try {
      const response = await fetch(`http://localhost:8085/api/v1/teacher/get-teacher-by/${id}`);
      if (!response.ok) throw new Error(`Failed to fetch teacher data. Status: ${response.status}`);
      const data = await response.json();
      setTeacher(data);
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, [id]);

  // Optional: Add a listener to refetch data when the window is focused
  useEffect(() => {
    const handleFocus = () => fetchTeacherData();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
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
  // useEffect(() => {
  //   const fetchAverageScore = async () => {
  //     try {
  //       const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  //       const marksResponse = await fetch(`http://localhost:8085/api/v1/excel/average-marks/all?month=${currentMonth}`);
  //       if (!marksResponse.ok) throw new Error(`Failed to fetch average marks. Status: ${marksResponse.status}`);
  //       const marksData = await marksResponse.json();
  //       const averageScore = marksData?.average || 0;

  //       setStats(prev => ({ ...prev, averageScore }));
  //     } catch (error) {
  //       console.error("Error fetching average score:", error);
  //     }
  //   };
  //   fetchAverageScore();
  // }, []);

  // Fetch chart data
  // useEffect(() => {
  //   const fetchChartData = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8085/api/v1/excel/monthly-average-marks");
  //       if (!response.ok) throw new Error(`Failed to fetch chart data. Status: ${response.status}`);
  //       const data = await response.json();
        
  //       const formattedData = data.map(item => ({
  //         time: item.month,
  //         performance: item.averageMarks || 0,
  //       }));
        
  //       setChartData(formattedData);
  //     } catch (error) {
  //       console.error("Error fetching chart data:", error);
  //     }
  //   };
  //   fetchChartData();
  // }, []);
  useEffect(() => {
    const rawChartData = [
      { month: "January", averageMarks: 45 },
      { month: "February", averageMarks: 65 },
      { month: "March", averageMarks: 75 },
      { month: "April", averageMarks: 40 },
      { month: "May", averageMarks: 68 },
      { month: "June", averageMarks: 74 },
      { month: "July", averageMarks: 70 },
    ];

    const formattedData = rawChartData.map(item => ({
      time: item.month,
      performance: item.averageMarks || 0,
    }));

    setChartData(formattedData);
  }, []);

  if (!teacher) return <p>Loading...</p>;

  // Determine the image URL
  let imageUrl = null;
  if (teacher.image?.imageId) {
    imageUrl = `http://localhost:8085/api/v1/image/get-image/${teacher.image.imageId}`;
  } else if (teacher.teacherPhoto) {
    const base64String = btoa(
      new Uint8Array(teacher.teacherPhoto).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    imageUrl = `data:image/jpeg;base64,${base64String}`;
  }

  return (
    
    <div className='flex flex-col w-full p-4'>
      {/* <Header
        name={teacher.teacherName}
        officerId={teacher.teacherId}
        image={imageUrl}
        showButton={true}
        action={() => setShowModal(true)}
        className={"bg-[#287f93] text-white"}
      /> */}
        <Header 
                  name={teacher.teacherName}
                  officerId={teacher.teacherId}
                  showButton={true}
                  showButton2={true}
                  image={teacher.image?.imageId ? `http://localhost:8085/api/v1/image/get-image/${teacher.image.imageId}` : null}
                  className={"bg-[#287f93] text-white"}
                  action2={() => setShowModal(true)}
                  action={() => navigate("class1")}
      />
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