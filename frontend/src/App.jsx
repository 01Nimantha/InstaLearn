import React from "react";
import Homepage from "./pages/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";
import AdminLayout from "./layouts/AdminLayout";


const App = () => {
  return (
    <div>
      <BrowserRouter>
      
        <Routes>
          <Route path="/"element={<Homepage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
          <Route path="/admin-dashboard" element={<AdminLayout/>} />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
};

export default App;                                                                
                                                                                        