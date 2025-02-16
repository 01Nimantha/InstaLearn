import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard'
import QuizForm from './pages/Dashboards/Teacher/QuizForm'
import Test from './pages/Dashboards/Teacher/test'
import Students from './pages/Dashboards/Teacher/Students'
import Payments from './pages/Dashboards/Teacher/Payments'


const App3 = () => {
  return (
    <div>
      <BrowserRouter>


          {/* <Routes>
             <Route 
              exact
              path="/" 
              // element={<QuizForm />} />
              // element={<TeacherDashboard />} />
              // element={<Students />}/>
              element={<Payments />} />
          </Routes> */}
          {/* <Routes>
             <Route 
              exact
              path="/" 
              // element={<QuizForm />} />
              // element={<TeacherDashboard />} />
              element={<Students />}/>
              
          </Routes> */}
          {/* <Routes>
             <Route 
              exact
              path="/" 
              // element={<QuizForm />} />
              element={<TeacherDashboard />} />
              
              
          </Routes> */}
          <Routes>
             <Route 
              exact
              path="/" 
              element={<Payments />} />              
              
          </Routes>

          </BrowserRouter>
    </div>
  )
}

export default App3
