import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from "./components/Sidebar"
import Button from "./components/Button"

const App2 = () => {
  return (
    <div>
      <Button name={"Nimantha"} action={()=>{console.log("Nimantha Click")}}/>
      <Sidebar/>
     
    </div>
  );
};

export default App2;
