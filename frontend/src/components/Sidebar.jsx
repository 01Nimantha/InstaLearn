import Logo from "../assets/Logo.svg"
import { LogOut} from 'lucide-react';
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";
const Sidebar = ({Tab1,Tab1Icon,Tab1functions,Tab2,Tab2Icon,Tab2functions,Tab3,Tab3Icon,Tab3functions,Tab4,Tab4Icon,Tab4functions,Tab5,Tab5Icon,Tab5functions,AddNewTab,Tab6,Tab6Icon,Tab6functions,BackgroundColor,Name,Id,ImgURL,Logout})=>{
  const [isDarkMode, setIsDarkMode] = useState(1);
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3" style={{width: "280px", height: "100vh",overflowY: "auto",position: "relative", backgroundColor:`${BackgroundColor}` }}>

    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
      <span className="fs-2" style={{color:"#ffffff",display:"flex"}}> <span style={{width:"100%",height:"100%"}}><img src={Logo}/></span><span style={{marginLeft:"2%",marginTop:"2%"}}>InstaLearn</span></span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to={Tab1functions} className="nav-link " aria-current="page" style={{backgroundColor: isDarkMode==1 ? "white" : `${BackgroundColor}`,}} onClick={()=>{setIsDarkMode(1)}}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          <span style={{display:"flex",
    color: isDarkMode==1 ? "black" :"white" }}> <Tab1Icon size={24}/><span style={{marginLeft:"5%"}} >{Tab1}</span></span>
        </Link>
      </li>
      <li>
        <Link to={Tab2functions} className="nav-link link-body-emphasis" style={{backgroundColor: isDarkMode==2 ? "white" : `${BackgroundColor}`,}} onClick={()=>{setIsDarkMode(2)}}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          <span style={{display:"flex",color: isDarkMode==2 ? "black" :"white"}}> <Tab2Icon size={24}/><span style={{marginLeft:"5%"}}>{Tab2}</span></span>
        </Link>
      </li>
      <li>
        <Link to={Tab3functions} className="nav-link link-body-emphasis" style={{backgroundColor: isDarkMode==3 ? "white" : `${BackgroundColor}`,}} onClick={()=>{setIsDarkMode(3)}}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
          <span style={{display:"flex",color: isDarkMode==3 ? "black" :"white" }}> <Tab3Icon size={24}/><span style={{marginLeft:"5%"}}>{Tab3}</span></span>    
        </Link>
      </li>
      <li>
        <Link to={Tab4functions} className="nav-link link-body-emphasis" style={{backgroundColor: isDarkMode==4 ? "white" : `${BackgroundColor}`,}} onClick={()=>{setIsDarkMode(4)}}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
          <span style={{display:"flex",color: isDarkMode==4 ? "black" :"white" }}> <Tab4Icon size={24}/><span style={{marginLeft:"5%"}}>{Tab4}</span></span>        
        </Link>
      </li>
      <li>
        <Link to={Tab5functions} className="nav-link link-body-emphasis" style={{backgroundColor: isDarkMode==5 ? "white" : `${BackgroundColor}`,}} onClick={()=>{setIsDarkMode(5)}}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
          <span style={{display:"flex",color: isDarkMode==5 ? "black" :"white" }}> <Tab5Icon size={24}/><span style={{marginLeft:"5%"}}>{Tab5}</span></span>        
        </Link>
        {AddNewTab ?<li>
        <Link to={Tab6functions} className="nav-link link-body-emphasis" style={{backgroundColor: isDarkMode==6 ? "white" : `${BackgroundColor}`,}} onClick={()=>{setIsDarkMode(6)}}>
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
          <span style={{display:"flex",color: isDarkMode==6 ? "black" :"white" }}> <Tab6Icon size={24}/><span style={{marginLeft:"5%"}}>{Tab6}</span></span>       
        </Link>
      </li>:null}
      </li>
      
    </ul>
    <hr style={{color:"#ffffff"}}/>
    <div className="dropdown" style={{display:"flex",backgroundColor:`${BackgroundColor}`}}>
      <div style={{marginLeft:"4%"}}>
        <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={ImgURL} alt="" width="60" height="60" className="rounded-circle me-2"/>
          <div style={{marginRight:"8%",marginTop:"4%"}}>
          <span style={{color:"#ffffff"}}><strong>{Name}</strong></span>
          <span style={{color:"#ffffff"}}><div style={{fontSize:"50%"}}>{Id}</div></span>         
         </div>
        </a>
      
        <ul className="dropdown-menu text-small shadow">
          <li><a className="dropdown-item" href="#">New project...</a></li>
          <li><a className="dropdown-item" href="#">Settings</a></li>
          <li><a className="dropdown-item" href="#">Profile</a></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="#">Sign out</a></li>
        </ul>
      </div>
      <div style={{marginTop:"6.5%",marginLeft:"14%",}} >
      <Link 
  className='mb-2' 
  to='/' 
  onClick={() => {
    localStorage.clear(); 
    window.scrollTo(0, 0);
  }} 
  title="Logout"
>
  <LogOut className="w-5 h-5 ml-auto text-white" />
</Link>



      </div>
      
    </div>
  </div>
  );
}
export default Sidebar;