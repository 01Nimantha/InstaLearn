import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import  { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App2 from './App2'
// import App from './App.jsx'

const router =createBrowserRouter([{path:"/",element:<App2/>}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* <App2/> */}
  </StrictMode>,
)
