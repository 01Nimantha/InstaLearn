import { BrowserRouter, Route, Routes } from "react-router-dom";
 import React from 'react'
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeachersView from "./pages/admin/TeachersView";
import StudentsView from "./pages/admin/StudentsView";
import ParentsView from "./pages/admin/ParentsView";
import AdminsView from "./pages/admin/AdminsView";
import AttendanceOfficerView from "./pages/admin/AttendanceOfficerView";
import AddAttendanceOfficer from "./pages/admin/AddAttendanceOfficer";
import AddTeacher from "./pages/admin/AddTeacher";
import AddStudent from "./pages/admin/AddStudent";
import AddAdmin from "./pages/admin/AddAdmin";

 const App10 = () => {
   return (
     <div>
      <BrowserRouter>
     
     <Routes>
       <Route 
         exact
         path="/" 
         element={<AdminDashboard/>}></Route>

       <Route 
         exact
         path="/teachers-view" 
         element={<TeachersView/>}></Route>
 
       <Route 
         exact
         path="/students-view" 
         element={<StudentsView/>}></Route>

       <Route 
         exact
         path="/parents-view" 
         element={<ParentsView/>}></Route>

       <Route 
         exact
         path="/admins-view" 
         element={<AdminsView/>}></Route>

    
        <Route
            exact
            path="/aOfficer-view"
            element={<AttendanceOfficerView/>}></Route>

        <Route 
            exact
            path="/add-aOfficer" 
            element={<AddAttendanceOfficer/>}></Route>
         

         <Route 
            exact
            path="/add-teacher" 
            element={<AddTeacher/>}></Route>

        <Route 
            exact
            path="/add-student" 
            element={<AddStudent/>}></Route>

        <Route 
            exact
            path="/add-admin" 
            element={<AddAdmin/>}></Route>

         </Routes>
    
   </BrowserRouter>
     </div>
   )
 }
 
 export default App10
