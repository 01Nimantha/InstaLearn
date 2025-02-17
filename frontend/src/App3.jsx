import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard'
import QuizForm from './pages/Dashboards/Teacher/QuizForm'
import Students from './pages/Dashboards/Teacher/Students'
import Payments from './pages/Dashboards/Teacher/Payments'
import Progress from './pages/Dashboards/Teacher/Progress'



const App3 = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
             <Route 
              exact
              path="/" 
              element={<TeacherDashboard />} />   
          </Routes>
          <Routes>
             <Route 
              exact
              path="/students" 
              element={<Students />}/>
          </Routes>
          <Routes>
             <Route 
              exact
              path="/quiz" 
              element={<QuizForm />} />
          </Routes>
          <Routes>
             <Route 
              exact
              path="/progress" 
              element={<Progress />} />  
          </Routes>
          <Routes>
             <Route 
              exact
              path="/payment" 
              element={<Payments />} /> 
          </Routes>
          </BrowserRouter>
    </div>
  )
}

export default App3
