import React from 'react'
import { FaGraduationCap, FaMoneyBill, FaRegUserCircle, FaSignOutAlt, FaUser, FaUserCheck } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className='min-h-screen bg-slate-100'>
      {/* Header with deep blue background */}
      <header className="bg-indigo-800 text-white py-6">
        <div className="px-4 max-w-[98%] mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-lg mt-1">Manage Users and Access Admin Functions</p>
          </div>
          <button 
            className="bg-red-600 hover:bg-red-700 rounded px-6 py-3 text-white font-bold flex items-center gap-2 transition-colors"
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
          >
            <FaSignOutAlt className='w-5 h-5'/>
            <span>Log out</span>
          </button>
        </div>
      </header>

      {/* Main content area */}
      <div className='px-4 max-w-[98%] mx-auto py-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          {/* Teacher Card */}
          <Link to='/admin-dashboard/teachers-view' className='text-decoration-none'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:translate-y-1'>
              <div className='h-1.5 bg-indigo-500'></div>
              <div className='p-5 flex flex-col items-center'>
                <div className='text-indigo-500 text-5xl mb-4'>
                  <FaRegUserCircle />
                </div>
                <h2 className='text-2xl font-semibold text-gray-800'>Teacher</h2>
              </div>
            </div>
          </Link>

          {/* Student Card */}
          <Link to='/admin-dashboard/students-view' className='text-decoration-none'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:translate-y-1'>
              <div className='h-1.5 bg-blue-500'></div>
              <div className='p-5 flex flex-col items-center'>
                <div className='text-blue-500 text-5xl mb-4'>
                  <FaGraduationCap />
                </div>
                <h2 className='text-2xl font-semibold text-gray-800'>Student</h2>
              </div>
            </div>
          </Link>

          {/* Parent Card */}
          <Link to='/admin-dashboard/parents-view' className='text-decoration-none'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:translate-y-1'>
              <div className='h-1.5 bg-purple-500'></div>
              <div className='p-5 flex flex-col items-center'>
                <div className='text-purple-500 text-5xl mb-4'>
                  <FaUser />
                </div>
                <h2 className='text-2xl font-semibold text-gray-800'>Parent</h2>
              </div>
            </div>
          </Link>

          {/* Admin Card */}
          <Link to='/admin-dashboard/admins-view' className='text-decoration-none'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:translate-y-1'>
              <div className='h-1.5 bg-teal-500'></div>
              <div className='p-5 flex flex-col items-center'>
                <div className='text-teal-500 text-5xl mb-4'>
                  <FaUser />
                </div>
                <h2 className='text-2xl font-semibold text-gray-800'>Admin</h2>
              </div>
            </div>
          </Link>

          {/* Attendance Officer Card */}
          <Link to='/admin-dashboard/aOfficers-view' className='text-decoration-none'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:translate-y-1'>
              <div className='h-1.5 bg-violet-500'></div>
              <div className='p-5 flex flex-col items-center'>
                <div className='text-violet-500 text-5xl mb-4'>
                  <FaUserCheck />
                </div>
                <h2 className='text-2xl font-semibold text-gray-800'>Attendance Officer</h2>
              </div>
            </div>
          </Link>

          {/* Class Fees Card */}
          <Link to='/admin-dashboard/class-fees' className='text-decoration-none'>
            <div className='bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:translate-y-1'>
              <div className='h-1.5 bg-green-500'></div>
              <div className='p-5 flex flex-col items-center'>
                <div className='text-green-500 text-5xl mb-4'>
                  <FaMoneyBill />
                </div>
                <h2 className='text-2xl font-semibold text-gray-800'>Class Fees</h2>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard