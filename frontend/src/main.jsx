import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App2 from './App2'
// import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App5 from './App5.jsx'
import App from './App.jsx'
import App3 from './App3.jsx'
import UserHomePage from './pages/student/UserHomePage.jsx'
import UserPaymentPage from './pages/student/UserPaymentPage.jsx';
import UserTimetablePage from './pages/student/UserTimetablePage.jsx';
import UserSettingPage from './pages/student/UserSettingPage.jsx';

const router =createBrowserRouter([{path:"/",element:<App2/>,
                          children:[{path:"/",element:<UserHomePage/>},
                                    {path:"/payment",element:<UserPaymentPage/>},
                                    {path:"/timetable",element:<UserTimetablePage/>},
                                    {path:"/setting",element:<UserSettingPage/>},
                                    {path:"/payment-history",element:<UserPaymentPage/>},
                                    {path:"/new-tab",element:<UserPaymentPage/>},
                                          ]}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    
    {/* <App /> */}
    {/* <App2/> */}
    {/* <App3/> */}
  </StrictMode>,

)
