import React from 'react'
import { FaHome, FaRegCalendarCheck } from 'react-icons/fa'
import { PiStudentFill } from 'react-icons/pi'
import Side from './Side'
import Logo from '../../assets/logo.svg'
import StudentImg from '../../assets/StudentImg.svg'
import { IoIosSettings } from 'react-icons/io'

const AOfficerDashboard = () => {
  return (
    <div className='flex min-h-screen' style={{height:"100vh",maxHeight:"100vh"}}>
      <div>
          <Side
              Name="Dinithi Madushika"
              Id="SC_2021_12405"
              ImgURL={Logo}
              BackgroundColor="#282c34"
              Logout={() => console.log("Click Logout Button")}
              ProPic={StudentImg}
              tabs={[
                { label: "Home", icon: FaHome, function: "/aOfficer-dashboard" },
                { label: "Settings", icon: IoIosSettings, function: "/" },
              ]}
            />; 
      </div> 
      <div className='w-full'>
        <header className='p-3 bg-amber-50 flex items-center w-full m-1.5 rounded bg-gray-800'>
          <img src={StudentImg} alt="Logo" className="rounded-circle me-2 w-36"></img>
          <span className='text-3xl'>Good Morning Miss:Dinithi!</span>
        </header>
      </div>
      <div className='bg-amber-200 h-screen'>
        
      </div>
    </div>
  )
}

export default AOfficerDashboard