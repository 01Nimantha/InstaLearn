import Button from "./Button";
import { FaBell } from "react-icons/fa";
const EventCard = ()=>{
  return <div className="card" style={{margin:"2% 2% 2% 0%",maxWidth:"70%", minWidth:"70%"}}>
    <div  style={{backgroundColor:"#13A68A",borderRadius:"5px 5px 0px 0px",marginBottom:"1%",padding:"1%", display:"flex"}}>
      <div style={{marginLeft:"1%"}}>Upcoming events</div>
      <div style={{marginLeft:"77%"}}><FaBell size={24} color="red"/></div>
    </div>
    <div className="card" style={{maxWidth:"98%",margin:"0% 2% 2% 2%", backgroundColor:"#78D9C6",minHeight:"80%"}}>
      <p style={{color:"#ffffff", marginLeft:"2%"}}>Kabaddi event </p>
      <div className="card" style={{backgroundColor:"#78D9C6",marginLeft:"2%",marginRight:"2%",maxHeight:"60%",maxWidth:"96%",minWidth:"96%",overflowY: "auto",textAlign:"center"}}> 🔥 Get ready for an action-packed Kabaddi Tournament filled with strength, strategy, and spirit! Witness thrilling matches as top teams battle it out for victory! Witness thrilling matches as top teams battle itWitness thrilling matches as top teams battle it out for victory! Witness thrilling matches as top teams battle it out for victory! out for victory! Witness thrilling matches as top teams battle it out for victory!Witness thrilling matches as top teams battle it out for victory! Witness thrilling matches as top teams battle it out for victory!
      </div>
      <div style={{margin:"1%",alignSelf:"end",display:"flex",marginRight:"3%"}}>
        <div style={{marginRight:"3%"}}>
          <Button name={"Previous"} action={()=>{console.log("Previous Button Click")}} backgroundColor={"#ffffff"} fontColor={"#000000"}cornerRadius={true}/>
        </div>
        <div>
          <Button name={"Next"} action={()=>{console.log("Next Button Click")}} backgroundColor={"#ffffff"} fontColor={"#000000"} cornerRadius={true}/></div>
      </div>
    </div>
  </div>;
}

export default EventCard;