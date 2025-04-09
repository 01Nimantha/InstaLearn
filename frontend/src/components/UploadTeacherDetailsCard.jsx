import { MdEmail } from "react-icons/md";
import { BsFillTelephoneFill } from "react-icons/bs";
const UploadTeacherDetailsCard=()=>{
  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
      <div style={{display:"flex",padding:"1%"}}>
        <div>
          <div style={{marginBottom:"6.8%"}}>Index number :</div> 
          <div style={{marginBottom:"6.8%"}}>Your name :</div> 
          <div style={{marginBottom:"6.8%"}}>Email address :</div> 
          <div style={{marginBottom:"6.8%"}}>Your phone number :</div> 
          <div style={{marginBottom:"6.8%"}}>Address :</div> 
        </div>
        <div style={{width:"48vw",marginLeft:"8vw"}}>
          <div>
            <input type="text" name="Index number " style={{width:"48vw",border:"2px #A4D9CF solid",borderRadius:"5px",marginBottom:"1%",paddingLeft:"2%"}}/>
          </div>
          <div>
            <input type="text" name="Index number " style={{width:"48vw",border:"2px #A4D9CF solid",borderRadius:"5px",marginBottom:"1%",paddingLeft:"2%"}}/>
          </div>
          <div style={{display:"flex"}}>
            <MdEmail color="#13A68A" size={25} style={{marginTop:"0.5%",marginRight:"1%"}}/>
            <input type="email" name="Index number " style={{width:"46vw",border:"2px #A4D9CF solid",borderRadius:"5px",marginBottom:"1%",paddingLeft:"2%"}}/>
          </div>
          <div style={{display:"flex"}}>
            <BsFillTelephoneFill color="#13A68A" size={22} style={{marginTop:"0.5%",marginRight:"1%"}} />
            <input type="number" name="Index number " style={{width:"46vw",border:"2px #A4D9CF solid",borderRadius:"5px",marginBottom:"1%",paddingLeft:"2%"}}/>
          </div>
          <div>
            <input type="text" name="Index number " style={{width:"48vw",border:"2px #A4D9CF solid",borderRadius:"5px",marginBottom:"1%",paddingLeft:"2%"}}/>
          </div>
        </div>
      </div>
      
    </div>;
}

export default UploadTeacherDetailsCard;