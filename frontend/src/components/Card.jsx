import Button from "./Button";

const Card = ({CardImg,CardTitle,CardBody,CardButtonName,CardButtonAction,CardButtonBackgroundColor,CardButtonFontColor,CardButtonCornerRadius})=>{
  return(<div className="card mb-3" style={{maxWidth: "540px", maxHeight:"164px",fontSize:"60%",margin: "2%"}}>
    <div className="row g-0">
      <div className="col-md-4">
        <img src={CardImg} className="img-fluid rounded-start" alt="..." style={{minHeight:"100%"}}/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title">{CardTitle}</h5>
          <p className="card-text">{CardBody}</p>
          <p className="card-text"><Button name={CardButtonName} action={CardButtonAction} backgroundColor={CardButtonBackgroundColor} fontColor={CardButtonFontColor} cornerRadius={CardButtonCornerRadius}/></p>
        </div>
      </div>
    </div>
  </div>);
}
export default Card;