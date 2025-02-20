import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const OnlineQuizProgress=()=>{
  const navigate= useNavigate();
  const sampleData = [
    { time: "2025-03-24", performance: 25 },
    { time: "2025-03-25", performance: 50 },
    { time: "2025-03-26", performance: 40 },
    { time: "2025-03-27", performance: 95 }, 
    { time: "2025-03-28", performance: 60 },
    { time: "2025-03-29", performance: 55 },
    { time: "2025-03-30", performance: 20 },
    { time: "2025-03-31", performance: 80 },
    { time: "2025-04-01", performance: 65 },
    { time: "2025-04-02", performance: 70 },
    { time: "2025-04-03", performance: 60 },
    { time: "2025-04-04", performance: 75 }
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