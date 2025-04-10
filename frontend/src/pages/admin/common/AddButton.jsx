import React from 'react'
import { Link } from 'react-router-dom'

const AddButton = ({onClick,btnname,className,type,disabled}) => {

  return (
    <div className=''>
        <button className={`hover:bg-indigo-600 rounded flex justify-center items-center shadow text-decoration-none ${className}`} 
          onClick={onClick} 
          type={type}
          disabled={disabled}>
          <span className='text-white text-xl '>{btnname}</span>
        </button>
    </div>
  )
}

export default AddButton