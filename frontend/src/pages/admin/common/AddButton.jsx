import React from 'react'

const AddButton = (props) => {
  return (
    <div className='mt-10'>
        <button className="bg-gray-950 hover:bg-[#]] rounded w-48 h-12 flex justify-center items-center shadow">
          <span className='text-white text-xl '>{props.btnname}</span>
        </button>
    </div>
  )
}

export default AddButton