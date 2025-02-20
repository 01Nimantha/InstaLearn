import React from "react";
import Homepage from "./pages/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";
import AdminDashboard from "./pages/admin/AdminDashboard"
import TeachersView from "./pages/admin/TeachersView"
import StudentsView from "./pages/admin/StudentsView";
import ParentsView from "./pages/admin/ParentsView";
import AdminsView from "./pages/admin/AdminsView";
import AttendanceOfficerView from "./pages/admin/AttendanceOfficerView";
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard'
import QuizForm from './pages/Dashboards/Teacher/QuizForm'
import Students from './pages/Dashboards/Teacher/Students'
import Payments from './pages/Dashboards/Teacher/Payments'
import Progress from './pages/Dashboards/Teacher/Progress'
import StripeCheckout from "./components/StripeCheckout";


const App = () => {
  return (
    <div>
      
      <BrowserRouter>
      
        <Routes>
          <Route path="/"element={<Homepage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/admin-dashboard/*" element={<AdminDashboard/>} />
          <Route path="/admin-dashboard/teachers-view" element={<TeachersView/>} />
          <Route path="/admin-dashboard/students-view" element={<StudentsView/>} />
          <Route path="/admin-dashboard/parents-view" element={<ParentsView/>} />
          <Route path="/admin-dashboard/admins-view" element={<AdminsView/>} />
          <Route path="/admin-dashboard/aOfficers-view" element={<AttendanceOfficerView/>} />
          <Route exact path="/teacher-dashboard/*" element={<TeacherDashboard />} />   
          <Route exact path="/teacher-dashboard/students" element={<Students />}/>
          <Route exact path="/teacher-dashboard/quiz" element={<QuizForm />} />
          <Route exact path="/teacher-dashboard/progress" element={<Progress />} />  
          <Route exact path="/teacher-dashboard/payment" element={<Payments />} /> 

        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
};

export default App;                                                                
                                                                                        