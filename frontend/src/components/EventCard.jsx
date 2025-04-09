import { useSelector, useDispatch } from "react-redux";
import Button from "./Button";
import { FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import { fetchNotices } from "../store/noticeSlice";

const EventCard = ({BgColor,BgHColor})=>{
  const dispatch = useDispatch();
  const { notices, status } = useSelector((state) => state.notice);
  const [num, setNum] = useState(0);

  useEffect(() => {
    dispatch(fetchNotices());
  }, [dispatch]);

  const next = () => {
    if (notices.length > num + 1) {
      setNum((prevNum) => prevNum + 1); 
    }
  };

  const previous = () => {
    if (num > 0) {
      setNum((prevNum) => prevNum - 1); 
    }
  };

  if (status === 'loading') {
    return <div>Loading notices...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading notices</div>;
  }

  if (notices.length === 0) {
    return <div>No notices available</div>;
  }

  return <div className="card" style={{margin:"2% 2% 2% 0%",maxWidth:"70%", minWidth:"70%"}}>
    <div  style={{backgroundColor:BgHColor,borderRadius:"5px 5px 0px 0px",marginBottom:"1%",padding:"1%", display:"flex"}}>
      <div style={{marginLeft:"1%"}}>Notices <span className="badge bg-danger">{notices.length}</span></div>
      <div style={{marginLeft:"77%",display:"flex"}}>
        <FaBell size={25} color="red"/><span className="badge" style={{position:"absolute",right:"3.3%"}}>{num+1}</span>
      </div>
    </div>
    <div className="card" style={{maxWidth:"98%",margin:"0% 2% 2% 2%", backgroundColor:BgColor,minHeight:"80%"}}>
      <p style={{color:"#ffffff", marginLeft:"2%"}}>{notices[num].title}</p>
      <div className="card" style={{backgroundColor:BgColor,marginLeft:"2%",marginRight:"2%",maxHeight:"60%",maxWidth:"96%",minWidth:"96%",overflowY: "auto",textAlign:"center"}}> 
        {notices[num].body}
      </div>
      <div style={{margin:"1%",alignSelf:"end",display:"flex",marginRight:"3%"}}>
        <div style={{marginRight:"3%"}}>
          <Button name={"Previous"} action={previous} backgroundColor={"#ffffff"} fontColor={"#000000"}cornerRadius={true}/>
        </div>
        <div>
          <Button name={"Next"} action={next} backgroundColor={"#ffffff"} fontColor={"#000000"} cornerRadius={true}/>
        </div>
      </div>
    </div>
  </div>;
}

export default EventCard;