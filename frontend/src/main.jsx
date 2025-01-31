import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App5 from './App5.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
import App2 from './App2'
// import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <App2/>
  </StrictMode>,
)
