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
import ProtectedRoute from './routes/ProtectedRoute.jsx'
import TeacherSettings from './pages/Dashboards/Teacher/TeacherSettings.jsx'
import App3 from './App3.jsx'
import AOfficerDashboard from './pages/attendanceOfficer/AOfficerDashboard.jsx'
import QR_Scan from './pages/attendanceOfficer/QR_Scan.jsx'
import App2 from './App2'
import EditAOfficer from './pages/attendanceOfficer/EditAOfficer.jsx';
import SchedulePage from './pages/Dashboards/Teacher/SchedulePage.jsx'
// import Class from './pages/Dashboards/Teacher/Class.jsx'
import ClassTypeView from './pages/Dashboards/Teacher/ClassTypeView.jsx';
import ClassFeesView from './pages/admin/ClassFeesView.jsx';
import App6 from './App6.jsx';
import ParentUserHomePage from './pages/parent/ParentUserHomePage.jsx';
import ParentUserPaymentPage from './pages/parent/ParentUserPaymentPage.jsx';
import ParentUserTimetablePage from './pages/parent/ParentUserTimetablePage.jsx';
import ParentUserPaymentHistoryPage from './pages/parent/ParentUserPaymentHistoryPage.jsx';
import ParentUserSettingPage from './pages/parent/ParentUserSettingPage.jsx';
import ParentOnlineQuizPage from './pages/parent/ParentOnlineQuizPage.jsx';
import ParentQuestionPaperPage from './pages/parent/ParentQuestionPaperPage.jsx';
import UserAttendence from './pages/student/UserAttendence.jsx';
import ParentAttendence from './pages/parent/ParentAttendence.jsx';
import DemoPage from './pages/DemoPage.jsx';

const router = createBrowserRouter([
  {
    path: "/student-dashboard/:id",
    element: <App2 />,
    children: [
      { index: true, element: <UserHomePage /> }, // Default child route
      { path: "payment", element: <UserPaymentPage /> },
      { path: "timetable", element: <UserTimetablePage /> },
      { path: "settings", element: <UserSettingPage /> },
      { path: "payment-history", element: <UserPaymentHistoryPage /> },
      { path: "online-quiz", element:  <OnlineQuizPage />},
      { path: "online-qpaper", element:  <QuestionPaperPage />},
      { path: "attendence", element:  <UserAttendence />},
    ],
  },

  {
    path: "/parent-dashboard/:id",
    element: <App6/>,
    children: [
      { index: true, element: <ParentUserHomePage /> }, // Default child route
      { path: "payment", element: <ParentUserPaymentPage /> },
      { path: "timetable", element: <ParentUserTimetablePage /> },
      { path: "settings", element: <ParentUserSettingPage /> },
      { path: "payment-history", element: <ParentUserPaymentHistoryPage /> },
      { path: "online-quiz", element:  <ParentOnlineQuizPage />},
      { path: "online-qpaper", element:  <ParentQuestionPaperPage />},
      { path: "attendence", element:  <ParentAttendence />},
    ],
  },
  { path: "/", element: <Homepage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage/> },
  { path: "/login", element: <LoginForm /> },
  { path: "/demo", element: <DemoPage /> },


  {path: "/admin-dashboard", element: <AdminDashboard />},
  { path: "/admin-dashboard/teachers-view", element: <TeachersView /> },
  { path: "/admin-dashboard/students-view", element: <StudentsView /> },
  { path: "/admin-dashboard/parents-view", element: <ParentsView /> },
  { path: "/admin-dashboard/admins-view", element: <AdminsView /> },
  { path: "/admin-dashboard/aOfficers-view", element: <AttendanceOfficerView /> },
  { path: "/admin-dashboard/class-fees", element: <ClassFeesView /> },

  {path: "/aOfficer-dashboard/:id", element: <AOfficerDashboard />},
  {path: "/aOfficer-dashboard/edit-profile/:id", element: <EditAOfficer />},
  {path:'/qr-scanner',element:<QR_Scan/>},

  { path: "/teacher-dashboard/:id", element: <App3/> ,
    children: [
      { index: true, element: <TeacherDashboard/> },
      {path:"students",element:<Students/>},
      {path:"quiz",element:<QuizForm/>},
      {path:"progress",element:<Progress/>},
      {path:"payment",element:<Payments/>},
      {path:"schedule",element:<SchedulePage/>},
      {path:"attendence",element:<Attendance/>},
      {path:"settings",element:<TeacherSettings/>},
      // {path:"class",element:<Class/>},
      {path:"class1",element:<ClassTypeView/>}


    ]
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={mystore}>
      <RouterProvider router={router} />
    </Provider> 
  </StrictMode>,


);




