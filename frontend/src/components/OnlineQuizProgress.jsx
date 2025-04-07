import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const OnlineQuizProgress=({data,BgColor})=>{
  const navigate= useNavigate();
  const sampleData = data;
  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
    <div style={{display:"flex",marginBottom:"4vh",marginTop:"4vh"}}>
      <div style={{marginRight:"39vw"}}><h3 className='mb-10'>Online Quiz Progress</h3></div>
      <div><Button name={"More Details"} backgroundColor={BgColor} fontColor={"#ffffff"} cornerRadius={false} action={()=>{navigate("online-quiz")}}/>  </div>
    </div>
    <div style={{marginTop:"10px",marginBottom:"20px"}}>
    <ResponsiveContainer width="100%" height={350}>
              <LineChart data={sampleData}>
                <XAxis dataKey="time" label={{ value: "Date", position: "insideBottom", offset: -6 }}  />
                <YAxis label={{ value: "Marks", angle: -90, position: "insideLeft" }}/>
                <Tooltip />
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="performance" stroke="#13A68A" dot={{ stroke: "#13A68A", strokeWidth: 2 }} />
              </LineChart>
    </ResponsiveContainer>
    </div>
  </div>;
}
export default OnlineQuizProgress;