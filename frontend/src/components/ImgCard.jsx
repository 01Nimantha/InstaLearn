
const ImgCard =({ImgCardImg,ImgCardName,ImgCardID})=>{
  return <div className="card" style={{maxWidth:"25%",margin:"2% 2% 2% 2%"}}>
  <div style={{alignItems: 'center',marginTop:"4%"}}>
    <img src={ImgCardImg} className="img-fluid rounded-start" alt="..." style={{minHeight:"100%"}}/>
  </div>
  <div style={{textAlign:"center"}}>{ImgCardName}</div>
  <div style={{textAlign:"center"}}>{ImgCardID}</div>
  </div>;
}

export default ImgCard;