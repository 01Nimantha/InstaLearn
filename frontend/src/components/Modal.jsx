import React from 'react'

const Modal = ({isVisible,onClose,children}) => {
    if(!isVisible) return null;

    const handleClose=(e)=>{
        if(e.target.id === 'wrapper') onClose();
    }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center'id='wrapper' onClick={handleClose}>Modal
    <div>
        <div className='bg-white p-5 rounded-lg'>
            <h1 className='text-2xl font-bold'>{children}</h1>
            <p>Modal Content</p>
            <button className='bg-blue-500 text-white px-3 py-1 rounded-lg'>Close</button>
        </div>
    </div>
    </div>
  )
}

export default Modal
