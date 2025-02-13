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
          <Route path="/admin-dashboard/admin-view" element={<AdminsView/>} />
          <Route path="/admin-dashboard/aOfficers-view" element={<AttendanceOfficerView/>} />


        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
};

export default App;                                                                
                                                                                        