import { IoIosLogOut } from "react-icons/io";
const Sidebar = ()=>{
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary" style={{width: "280px", minHeight:"1080px",backgroundColor:"13A68A"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
      <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
      <span className="fs-4">InstaLearn</span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <a href="#" className="nav-link active" aria-current="page">
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
          Home
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-body-emphasis">
          <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
          Payment
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-body-emphasis">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
          Timetable
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-body-emphasis">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
          Setting
        </a>
      </li>
      <li>
        <a href="#" className="nav-link link-body-emphasis">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
          Payment History
        </a>
      </li>
    </ul>
    <hr/>
    <div className="dropdown">
      <a href="#" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="40" height="40" class="rounded-circle me-2"/>
        <div>
         <strong>Student name</strong>
         <div>index number</div>
        </div>
      </a>
      
      <ul className="dropdown-menu text-small shadow">
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
      <IoIosLogOut style={{display:"flex"}} />
    </div>
  </div>
  );
}
export default Sidebar;