import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const OnlineQuizProgress=()=>{
  const navigate= useNavigate();
  const sampleData = [
    { time: "5k", performance: 25 },
    { time: "10k", performance: 50 },
    { time: "15k", performance: 40 },
    { time: "20k", performance: 95 }, 
    { time: "25k", performance: 60 },
    { time: "30k", performance: 55 },
    { time: "35k", performance: 20 },
    { time: "40k", performance: 80 },
    { time: "45k", performance: 65 },
    { time: "50k", performance: 70 },
    { time: "55k", performance: 60 },
    { time: "60k", performance: 75 }
  ];
  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
    <div style={{display:"flex",marginBottom:"4vh",marginTop:"4vh"}}>
      <div style={{marginRight:"39vw"}}><h3 className='mb-10'>Online Quiz Progress</h3></div>
      <div><Button name={"More Details"} backgroundColor={"#78D9C6"} fontColor={"#ffffff"} cornerRadius={false} action={()=>{navigate("online-quiz")}}/>  </div>
    </div>
    <ResponsiveContainer width="100%" height={350}>
              <LineChart data={sampleData}>
                <XAxis dataKey="time"  />
                <YAxis />
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="performance" stroke="#13A68A" dot={{ stroke: "#13A68A", strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
  </div>;
}
export default OnlineQuizProgress;