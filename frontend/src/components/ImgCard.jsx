
const ImgCard =({ImgCardImg,ImgCardName,ImgCardID,BgColor})=>{
  return <div className="card" style={{maxWidth:"25%",margin:"2% 2% 2% 2%"}}>
  <div style={{alignItems: 'center',marginTop:"4%"}}>
    <img src={ImgCardImg} className="img-fluid rounded-start" alt="..." style={{minHeight:"100%"}}/>
  </div>
  <div style={{textAlign:"center",backgroundColor:BgColor,color:"#ffffff"}}>{ImgCardName}</div>
  <div style={{textAlign:"center",backgroundColor:BgColor,color:"#ffffff",borderRadius:"0px 0px 5px 5px"}}>{ImgCardID}</div>
  </div>;
}

export default ImgCard;