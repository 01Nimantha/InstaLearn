import { useEffect, useRef, useState } from "react";
import { RiFolderUploadFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { parentimageAction } from "../store/parentimageSlice";
const ParentUploadPhotoCard =()=>{
  
    const ImgURL = useSelector((store) => store.parentimagereducer.imagePath);
    const dispatch= useDispatch();
    const fileInputRef = useRef(null);
  
    const handleButtonClick = () => {
      fileInputRef.current.click(); // Trigger hidden input
    };
    
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        dispatch(parentimageAction.addImage(URL.createObjectURL(file)));
      }
    };
    useEffect(()=>{
      console.log("Nimantha",ImgURL);
    },[]);
  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
    <div style={{display:"flex"}}>
      <div style={{marginTop:"5vw",color:"#7B78D9"}}>
        <div style={{display:"flex"}}>
          <div>Upload your photo</div>
          <div style={{marginLeft:"8vw"}}><RiFolderUploadFill onClick={handleButtonClick} color="#7B78D9" size={30}/>
          <input type="file" ref={fileInputRef} style={{ display: "none" }} accept="image/*" onChange={handleFileChange}/>
          </div>
        </div>
        <div>{ImgURL}</div>
        <div>Try to upload a photo with out background
        not a compulsory</div>
      </div>
      <div style={{marginLeft:"8vw",width:"30vw",height:"40vh"}}>
        <img src={ImgURL} className="img-fluid rounded-start" alt="..." style={{minHeight:"40vh",maxHeight:"40vh",maxWidth:"50vw"}}/>
      </div>
    </div>
  </div>;
}

export default ParentUploadPhotoCard;