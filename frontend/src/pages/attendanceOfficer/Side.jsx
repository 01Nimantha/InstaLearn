import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";

const Side = ({
  tabs = [],
  BackgroundColor = "#282c34",
  Name,
  Id,
  ImgURL,
  Logout,
  ProPic
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div
      className="flex flex-column flex-shrink-0 p-3 h-screen"
      style={{ width: "280px", minHeight: "100vh",maxHeight:"100vh", backgroundColor: BackgroundColor }}
    >
      {/* Logo and Branding */}
      <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
        <span className="fs-2" style={{ color: "#ffffff", display: "flex" }}>
          <img src={ImgURL} alt="Logo" style={{ width: "50px", height: "50px" }} />
          <span style={{ marginLeft: "10px", marginTop: "5px" }}>InstaLearn</span>
        </span>
      </Link>
      
      <hr />
      
      {/* Sidebar Tabs */}
      <ul className="nav nav-pills flex-column mb-auto">
        {tabs.map((tab, index) => (
          <li key={index} className="nav-item">
            <Link
              to={tab.function}
              className="nav-link"
              onClick={() => setActiveTab(index)}
              style={{
                backgroundColor: activeTab === index ? "white" : BackgroundColor,
                color: activeTab === index ? "black" : "white",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              {React.createElement(tab.icon, { size: 24 })}
              <span style={{ marginLeft: "10px" }}>{tab.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      
      <hr style={{ color: "#ffffff" }} />
      
      {/* Profile Section */}
      <div className="dropdown" style={{ display: "flex", backgroundColor: BackgroundColor }}>
        <div style={{ marginLeft: "4%" }}>
          <a href="#" className="d-flex align-items-center text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={ProPic} alt="" width="50" height="50" className="rounded-circle me-2" />
            <div style={{ marginRight: "8%", marginTop: "4%" }}>
              <span style={{ color: "#ffffff" }}><strong>{Name}</strong></span>
              <div style={{ color: "#ffffff", fontSize: "12px" }}>{Id}</div>
            </div>
          </a>
          <ul className="dropdown-menu text-small shadow">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
        <div style={{ marginTop: "6.5%", marginLeft: "14%" }} onClick={Logout}>
          <IoIosLogOut size={22} color="#ffffff" />
        </div>
      </div>
    </div>
  );
};

export default Side;