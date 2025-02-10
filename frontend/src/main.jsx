import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App2 from './App2'
// import App from './App.jsx'

import './index.css'
import App5 from './App5.jsx'
import App from './App.jsx'
import App3 from './App3.jsx'

const router =createBrowserRouter([{path:"/",element:<App2/>}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* <App2/> */}
    {/* <App3/> */}
  </StrictMode>,

)
