import React from 'react'
import { Link } from 'react-router-dom'

const AddButton = ({onClick,path,btnname,className,btntype}) => {

  return (
    <div className=''>
        <Link to={path} className={`hover:bg-gray-800 rounded flex justify-center items-center shadow text-decoration-none ${className}`} onClick={onClick}>
          <span className='text-white text-xl '>{btnname}</span>
        </Link>
    </div>
  )
}

export default AddButton