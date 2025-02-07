import React from 'react'
import { FaGraduationCap, FaRegUserCircle, FaSignOutAlt, FaUser } from 'react-icons/fa'
import {Link} from 'react-router-dom'


const AdminDashboard = () => {
  return (
    <div className=' min-h-screen bg-[#D9D9D9]'>
      <header className="flex items-center justify-between bg-black text-white h-[150px]">
        <div className='pl-10'>
          <h1 className="text-2xl font-bold leading-8 pt-8">Admin Dashboard</h1>
          <p className="text-sm text-gray-300 leading-7">Manage Users and Access Admin Functions</p>
        </div>
        <div className='pr-10'>
        <button className="bg-red-600 hover:bg-red-700 rounded w-48 h-10 flex justify-center items-center gap-[10px] mr-[50px]">
          <FaSignOutAlt className='w-5 h-5'/>
          <span className='text-white font-bold font-Nunito text-xl '>Log out</span>
        </button>
        </div>
      </header>

      <div className='grid grid-cols-2 gap-5 p-10 text-4xl'>
        <div className='shadow'>
          <Link to={'/teachers-view'} className='w-full h-32 bg-white rounded  flex items-center justify-center gap-10 text-decoration-none text-black'>
            <FaRegUserCircle/>
          <span>Teacher</span>
          </Link>
        </div>
        <div className='shadow'>
        <Link to={'/students-view'} className='w-full h-32 bg-white rounded flex items-center justify-center gap-10 text-decoration-none text-black'>
          <FaGraduationCap/>
          <span>Student</span>
        </Link>
        </div>
        <div className='shadow'>
        <Link to={'/parents-view'} className='w-full h-32 bg-white rounded flex items-center justify-center gap-10 text-decoration-none text-black'>
          <FaUser/>
          <span>Parent</span>
        </Link>
        </div>
        <div className='shadow'>
        <Link to={'/admins-view'} className='w-full h-32 bg-white rounded flex items-center justify-center gap-10 text-decoration-none text-black'>
          <FaUser/>
          <span>Admin</span>
        </Link>
        </div>
        <div className='col-span-2 shadow'>
         <Link to={'/aOfficers-view'} className='w-full h-32 bg-white rounded flex items-center justify-center gap-10 text-decoration-none text-black'>
          <FaUser/>
          <span>Attendance Officer</span>
        </Link> 
        </div>
        
        </div>
        
      </div>

    
  )
}

export default AdminDashboard