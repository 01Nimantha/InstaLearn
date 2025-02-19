import { useSelector } from "react-redux";
import Button from "./Button";
import { FaBell } from "react-icons/fa";
import { useState } from "react";
const EventCard = ()=>{
  const event = useSelector((store)=>store.eventreducer);
  const [num,setNum] = useState(0);
  const next = () => {
    if (event.eventarr.length > num + 1) {
      setNum((prevNum) => prevNum + 1); 
    }
  };

  const previous = () => {
    if (num > 0) {
      setNum((prevNum) => prevNum - 1); 
    }
  };

  return <div className="card" style={{margin:"2% 2% 2% 0%",maxWidth:"70%", minWidth:"70%"}}>
    <div  style={{backgroundColor:"#13A68A",borderRadius:"5px 5px 0px 0px",marginBottom:"1%",padding:"1%", display:"flex"}}>
      <div style={{marginLeft:"1%"}}>New Events <span class="badge bg-danger">{event.eventarr.length}</span></div>
      <div style={{marginLeft:"77%",display:"flex"}}>
      <FaBell size={25} color="red"/><span className="badge" style={{position:"absolute",right:"3.3%"}}>{num+1}</span></div>
      
    </div>
    <div className="card" style={{maxWidth:"98%",margin:"0% 2% 2% 2%", backgroundColor:"#78D9C6",minHeight:"80%"}}>
      <p style={{color:"#ffffff", marginLeft:"2%"}}>{event.eventarr[num].eventName}</p>
      <div className="card" style={{backgroundColor:"#78D9C6",marginLeft:"2%",marginRight:"2%",maxHeight:"60%",maxWidth:"96%",minWidth:"96%",overflowY: "auto",textAlign:"center"}}> {event.eventarr[num].eventBody}
      </div>
      <div style={{margin:"1%",alignSelf:"end",display:"flex",marginRight:"3%"}}>
        <div style={{marginRight:"3%"}}>
          <Button name={"Previous"} action={previous} backgroundColor={"#ffffff"} fontColor={"#000000"}cornerRadius={true}/>
        </div>
        <div>
          <Button name={"Next"} action={next} backgroundColor={"#ffffff"} fontColor={"#000000"} cornerRadius={true}/></div>
      </div>
    </div>
  </div>;
}

export default EventCard;