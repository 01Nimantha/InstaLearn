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
import TeacherDashboard from './pages/Dashboards/Teacher/TeacherDashboard.jsx'
import Students from './pages/Dashboards/Teacher/Students.jsx'

 const router =createBrowserRouter([{path:"/",element:<App2/>,
                           children:[{path:"/",element:<UserHomePage/>},
                                     {path:"/payment",element:<UserPaymentPage/>},
                                     {path:"/timetable",element:<UserTimetablePage/>},
                                     {path:"/setting",element:<UserSettingPage/>},
                                     {path:"/payment-history",element:<UserPaymentHistoryPage/>},
                                     {path:"/new-tab",element:<OnlineQuizPage/>},
                                     {path:"/online-quiz",element:<QuestionPaperPage/>},
                                           ]}])

// const router =createBrowserRouter([{path:"/",element:<App3/>,
//                             children:[{path:"/",element:<TeacherDashboard/>},
//                                       {path:"/student",element:<Students/>},
//                                       {path:"/progress",element:<Progress/>},
//                                       {path:"/setting",element:<UserSettingPage/>},
//                                       {path:"/payment",element:<Payment/>},
//                                             ]}])

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={mystore}>
    <RouterProvider router={router} />

    </Provider> 
     <RouterProvider router={router} /> */}
    
    {/* <App /> */}
    {/* <App2/> */}
    <App3/>
    
    {/* <App3/> *
    </Provider>

    {/* <RouterProvider router={router} /> */}
    
    {/* <App /> */}
    {/* <App2/> */}
    {/* <App3/> */}
    

  </StrictMode>,

)
