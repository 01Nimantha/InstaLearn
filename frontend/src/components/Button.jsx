const Button = ({name,action,backgroundColor,fontColor,cornerRadius})=>{
  return (<button type="button" className="btn" style={{backgroundColor: `${backgroundColor}`,color:`${fontColor}`,borderRadius: `${ cornerRadius && "119.7px"}`,padding:"5px 25px"}} onClick={action}>{name}</button>);
}
export default Button;