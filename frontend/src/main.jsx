import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import UserHomePage from './pages/student/UserHomePage.jsx'
import UserPaymentPage from './pages/student/UserPaymentPage.jsx';
import UserTimetablePage from './pages/student/UserTimetablePage.jsx';
import UserSettingPage from './pages/student/UserSettingPage.jsx';
import UserPaymentHistoryPage from './pages/student/UserPaymentHistoryPage.jsx';
import OnlineQuizPage from './pages/student/OnlineQuizPage.jsx';
import QuestionPaperPage from './pages/student/QuestionPaperPage.jsx';
import mystore from "./store/index.js";
import Homepage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import LoginForm from './pages/LoginForm.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import TeachersView from './pages/admin/TeachersView.jsx'
import StudentsView from './pages/admin/StudentsView.jsx'
import ParentsView from './pages/admin/ParentsView.jsx'
import AdminsView from './pages/admin/AdminsView.jsx'
import AttendanceOfficerView from './pages/admin/AttendanceOfficerView.jsx'
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard.jsx'
import Students from './pages/Dashboards/Teacher/Students.jsx'
import QuizForm from './pages/Dashboards/Teacher/QuizForm.jsx'
import Progress from './pages/Dashboards/Teacher/Progress.jsx'
import Payments from './pages/Dashboards/Teacher/Payments.jsx'
import Attendance from './pages/Dashboards/Teacher/Attendance.jsx'
import App3 from './App3.jsx'
import App2 from './App2'

const router = createBrowserRouter([
  {
    path: "/student-dashboard",
    element: <App2 />,
    children: [
      { index: true, element: <UserHomePage /> }, // Default child route
      { path: "payment", element: <UserPaymentPage /> },
      { path: "timetable", element: <UserTimetablePage /> },
      { path: "settings", element: <UserSettingPage /> },
      { path: "payment-history", element: <UserPaymentHistoryPage /> },
      { path: "online-quiz", element:  <OnlineQuizPage />},
      { path: "online-qpaper", element:  <QuestionPaperPage />},
    ],
  },
  { path: "/", element: <Homepage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage/> },
  { path: "/login", element: <LoginForm /> },
  {path: "/admin-dashboard", element: <AdminDashboard />},
  { path: "/admin-dashboard/teachers-view", element: <TeachersView /> },
  { path: "/admin-dashboard/students-view", element: <StudentsView /> },
  { path: "/admin-dashboard/parents-view", element: <ParentsView /> },
  { path: "/admin-dashboard/admins-view", element: <AdminsView /> },
  { path: "/admin-dashboard/aOfficers-view", element: <AttendanceOfficerView /> },
  { path: "/teacher-dashboard", element: <App3/> ,
    children: [
      { index: true, element: <TeacherDashboard/> },
      {path:"students",element:<Students/>},
      {path:"quiz",element:<QuizForm/>},
      {path:"progress",element:<Progress/>},
      {path:"payment",element:<Payments/>},
      {path:"manage-shedules",element:<TeacherDashboard/>},
      {path:"attendence",element:<Attendance/>}
    ]
  },
  
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={mystore}>
      <RouterProvider router={router} />
    </Provider> 
  </StrictMode>,
)
