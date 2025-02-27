import { Home, LogOut, Settings } from 'lucide-react'
import React from 'react'
import logo from '../../assets/Logo.svg'
import { Link } from 'react-router-dom'

const Side = ({isSidebarOpen,navigationItems,officer_name,AO_ID}) => {
  return (
    <div className={`mr-2
      fixed lg:static inset-y-0 left-0 z-40 w-64 bg-green-500 text-white flex flex-col
      transform transition-transform duration-300 ease-in-out
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 flex justify-center items-center">
        <img src={logo} className='w-14 h-14'></img>
        <h1 className="text-2xl font-bold flex items-center">
          <span className="text-white">Insta</span>
          <span className="text-gray-950">Learn</span>
        </h1>
      </div>
      
      <nav className="flex-1 mt-3">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center px-6 py-3 text-white hover:!bg-white hover:!text-black hover:rounded-lg transition duration-300 text-decoration-none mx-2 rounded"
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.name}</span>
          </Link>
        ))}
    </nav>

      <div className="p-4 border-t border-green-600">
        <div className="flex items-center">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
            alt="Teacher"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium">{officer_name}</p>
            <p className="text-xs text-green-200">{AO_ID}</p>
          </div>
          <LogOut className="w-5 h-5 ml-auto" />
        </div>
      </div>
    </div>
  )
}

export default Side