import Logo from "../assets/Logo.svg"
const PaperHearderCard =()=>{
  return <div className="card" style={{margin:"2%", minWidth:"96%", maxWidth:"96%",backgroundColor:"#13A68A"}}>
    <div style={{display:"flex"}}>
      <div style={{marginLeft:"12%",marginTop:"3%",color:"#ffffff"}}>
        <div>For Information and Communications Technology</div>
        <div>Advanced Level Exam Past Paper</div>
        <div>2025 - 03 - 25   English Medium</div>
        <div>Duration : 08.00am - 10.00am</div>
      </div>
      <div style={{width:"40%",height:"40%",marginLeft:"10%"}} >
       <img src={Logo} alt="..." style={{width:"50%",height:"50%"}} />
      </div>
    </div>
  </div>;
}

export default PaperHearderCard;