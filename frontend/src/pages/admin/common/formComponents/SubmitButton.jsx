import React from 'react'
import AddButton from '../AddButton'

const SubmitButton = ({btnname,onClose}) => {
  return (
    <div className='px-1 flex justify-between py-1'>
            <AddButton onClick={()=>onClose()} btnname={'Close'} className={'bg-red-600 hover:bg-red-700 w-30 h-12'}/>
            <button className='  bg-gray-950 w-48 h-12 hover:bg-gray-800 rounded flex justify-center items-center shadow text-decoration-none'>
            <span className='text-white text-xl'>{btnname}</span>
            </button>

    </div>
  )
}

export default SubmitButton