import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Provider} from "react-redux"
import App2 from './App2'
// import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App5 from './App5.jsx'
import App from './App.jsx'
import App10 from './App10.jsx'
import App3 from './App3'


import UserHomePage from './pages/student/UserHomePage.jsx'
import UserPaymentPage from './pages/student/UserPaymentPage.jsx';
import UserTimetablePage from './pages/student/UserTimetablePage.jsx';
import UserSettingPage from './pages/student/UserSettingPage.jsx';
import UserPaymentHistoryPage from './pages/student/UserPaymentHistoryPage.jsx';
import OnlineQuizPage from './pages/student/OnlineQuizPage.jsx';
import QuestionPaperPage from './pages/student/QuestionPaperPage.jsx';
import mystore from "./store/index.js";
import Homepage from './pages/Homepage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LoginForm from './pages/LoginForm.jsx'
import AdminDashboard from './pages/admin/AdminDashboard.jsx'
import TeachersView from './pages/admin/TeachersView.jsx'
import StudentsView from './pages/admin/StudentsView.jsx'
import ParentsView from './pages/admin/ParentsView.jsx'
import AdminsView from './pages/admin/AdminsView.jsx'
import AttendanceOfficerView from './pages/admin/AttendanceOfficerView.jsx'
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard.jsx'
import Students from './pages/Dashboards/Teacher/Students.jsx'

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
      { path: "new-tab", element: <OnlineQuizPage /> },
      { path: "online-quiz", element: <QuestionPaperPage /> },
    ],
  },
  { path: "/", element: <Homepage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/login", element: <LoginForm /> },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard />, // Main admin dashboard page
    children: [
      { index: true, element: <AdminDashboard /> }, // Default admin page
      { path: "teachers-view", element: <TeachersView /> },
      { path: "students-view", element: <StudentsView /> },
      { path: "parents-view", element: <ParentsView /> },
      { path: "admins-view", element: <AdminsView /> },
      { path: "aOfficers-view", element: <AttendanceOfficerView /> },
    ],
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={mystore}>
    <RouterProvider router={router} />
    </Provider> 

    {/* <RouterProvider router={router} /> */ }
    
    {/* <App /> */}
    {/* <App2/> */}
    {/* <App/> */}
    
    {/* <App3/> *
    </Provider>

    {/* <RouterProvider router={router} /> */}
    
    {/* <App /> */}
    {/* <App2/> */}
    {/* <App3/> */}
    

  </StrictMode>,

)
