import { BrowserRouter, Route, Routes } from "react-router-dom";
 import React from 'react'
import AdminDashboard from "./pages/admin/AdminDashboard";
import TeachersView from "./pages/admin/TeachersView";
import StudentsView from "./pages/admin/StudentsView";
import ParentsView from "./pages/admin/ParentsView";
import AdminsView from "./pages/admin/AdminsView";
import AttendanceOfficerView from "./pages/admin/AttendanceOfficerView";

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
         path="admin-dashboard/teachers-view" 
         element={<TeachersView/>}></Route>
 
       <Route 
         exact
         path="admin-dashboard/students-view" 
         element={<StudentsView/>}></Route>

       <Route 
         exact
         path="admin-dashboard/parents-view" 
         element={<ParentsView/>}></Route>

       <Route 
         exact
         path="admin-dashboard/admins-view" 
         element={<AdminsView/>}></Route>

    
        <Route
            exact
            path="admin-dashboard/aOfficer-view"
            element={<AttendanceOfficerView/>}></Route>
         </Routes>
    
   </BrowserRouter>
     </div>
   )
 }
 
 export default App10
