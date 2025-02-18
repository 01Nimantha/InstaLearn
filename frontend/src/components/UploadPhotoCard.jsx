const UploadPhotoCard =({ImgURL})=>{
  return <div className="card" style={{margin:"2%",padding:"2%", minWidth:"74vw", maxWidth:"74vw",backgroundColor:"#ffffff"}}>
    <div style={{display:"flex"}}>
      <div>1</div>
      <div style={{}}>
        <img src={ImgURL} className="img-fluid rounded-start" alt="..." style={{minHeight:"100%",maxWidth:"60%"}}/>
      </div>
    </div>
  </div>;
}

export default UploadPhotoCard;