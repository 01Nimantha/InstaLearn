import Logo from "../assets/Logo.svg"
import { LogOut} from 'lucide-react';
import { IoIosLogOut } from "react-icons/io";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  Tab1, Tab1Icon, Tab1functions,
  Tab2, Tab2Icon, Tab2functions,
  Tab3, Tab3Icon, Tab3functions,
  Tab4, Tab4Icon, Tab4functions,
  Tab5, Tab5Icon, Tab5functions,
  AddNewTab, Tab6, Tab6Icon, Tab6functions,
  BackgroundColor, Name, Id, ImgURL, Logout
}) => {
  const [isDarkMode, setIsDarkMode] = useState(1);

  const tabStyle = (mode) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    color: isDarkMode === mode ? "black" : "white",
    backgroundColor: isDarkMode === mode ? "white" : BackgroundColor,
    textDecoration: "none",
    borderRadius: "8px",
    marginBottom: "8px",
    transition: "all 0.3s ease"
  });

  return (
    <div style={{
      width: "280px",
      height: "100vh",
      backgroundColor: BackgroundColor,
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      left: 0,
      top: 0
    }}>
      {/* Logo Section */}
      <div style={{ marginBottom: "24px" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img src={Logo} alt="Logo" style={{ width: "48px", height: "48px" }} />
            <span style={{ 
              color: "white", 
              fontSize: "32px", 
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span>Insta</span>
              <span style={{ color: "black" }}>Learn</span>
            </span>
          </div>
        </Link>
      </div>

      <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "0 0 16px 0" }} />

      {/* Navigation Tabs */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Link to={Tab1functions} style={tabStyle(1)} onClick={() => setIsDarkMode(1)}>
          <Tab1Icon size={20} />
          <span>{Tab1}</span>
        </Link>

        <Link to={Tab2functions} style={tabStyle(2)} onClick={() => setIsDarkMode(2)}>
          <Tab2Icon size={20} />
          <span>{Tab2}</span>
        </Link>

        <Link to={Tab3functions} style={tabStyle(3)} onClick={() => setIsDarkMode(3)}>
          <Tab3Icon size={20} />
          <span>{Tab3}</span>
        </Link>

        <Link to={Tab4functions} style={tabStyle(4)} onClick={() => setIsDarkMode(4)}>
          <Tab4Icon size={20} />
          <span>{Tab4}</span>
        </Link>

        <Link to={Tab5functions} style={tabStyle(5)} onClick={() => setIsDarkMode(5)}>
          <Tab5Icon size={20} />
          <span>{Tab5}</span>
        </Link>

        {AddNewTab && (
          <Link to={Tab6functions} style={tabStyle(6)} onClick={() => setIsDarkMode(6)}>
            <Tab6Icon size={20} />
            <span>{Tab6}</span>
          </Link>
        )}
      </div>

      <hr style={{ borderColor: "rgba(255,255,255,0.2)", margin: "16px 0" }} />

      {/* Profile Section */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 0"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <div style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            overflow: "hidden",
            border: "2px solid white"
          }}>
            <img 
              src={ImgURL} 
              alt="Profile" 
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
          </div>
          <div>
            <div style={{ color: "white", fontWeight: "bold" }}>{Name}</div>
            <div style={{ color: "white", fontSize: "0.8rem", opacity: 0.8 }}>{Id}</div>
          </div>
        </div>
        <Link 
          to="/" 
          onClick={() => {
            localStorage.clear();
            window.scrollTo(0, 0);
          }}
          style={{ color: "white" }}
        >
          <LogOut size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;