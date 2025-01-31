import React from "react";
import Homepage from "./pages/Homepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "./pages/AboutPage";
import Header from "./components/Header";
import LoginForm from "./pages/LoginForm";



const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/"element={<Homepage/>}></Route>
          <Route path="/about" element={<AboutPage/>}></Route>
          <Route path="/login" element={<LoginForm/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;                                                                
                                                                                        