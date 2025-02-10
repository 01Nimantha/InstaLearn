// import React from 'react'
// import {BrowserRouter, Route,Routes} from 'react-router-dom'
// import Dashboard from './pages/Dashboards/Teacher/TeacherDashboard'

// const App3 = () => {
//     return (
//       <div>
//         <BrowserRouter>

//           <Routes>
//             <Route 
//               exact
//               path="/" 
//               element={<Dashboard />} />
    
//           </Routes>
//           <BrowserRouter/>
//       </div>
//     )
//   }

// export default App3

import React from 'react'
import {BrowserRouter, Route,Routes} from 'react-router-dom'
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard'

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
          </BrowserRouter>
    </div>
  )
}

export default App3
