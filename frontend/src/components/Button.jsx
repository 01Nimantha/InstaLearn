const Button = ({name,action})=>{
  return (<button type="button" className="btn btn-primary" onClick={action}>{name}</button>);
}
export default Button;